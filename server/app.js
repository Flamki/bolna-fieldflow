import "dotenv/config";
import express from "express";
import cors from "cors";
import { addCase, findCaseByExecution, readCases, updateCase } from "./store.js";
import { startBolnaCall, startDemoCall, hasBolnaConfig } from "./bolna.js";
import { buildWorkOrder, extractBolnaExecution, makeDemoExecution } from "./triage.js";

export function createApp() {
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(cors());
  app.use(express.json({ limit: "2mb" }));

  app.get("/api/health", (req, res) => {
    res.json({
      ok: true,
      bolnaConfigured: hasBolnaConfig(),
      webhookUrl: `${process.env.PUBLIC_BASE_URL || `http://localhost:${port}`}/api/bolna/webhook`
    });
  });

  app.get("/api/cases", async (req, res, next) => {
    try {
      res.json(await readCases());
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/cases", async (req, res, next) => {
    try {
      const created = await addCase(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/cases/:id/call", async (req, res, next) => {
    try {
      const cases = await readCases();
      const serviceCase = cases.find((item) => item.id === req.params.id);
      if (!serviceCase) return res.status(404).json({ message: "Case not found" });
      if (!serviceCase.phone) return res.status(400).json({ message: "A phone number is required to start voice triage" });

      const forceDemo = req.query.demo === "1" || req.body?.demo === true;
      const call = forceDemo ? startDemoCall() : await startBolnaCall(serviceCase);
      const executionId = call.execution_id || call.executionId;
      const now = new Date().toISOString();
      const updated = await updateCase(serviceCase.id, (current) => ({
        status: "calling",
        executionId,
        callProvider: call.provider,
        lastCallStatus: call.status || "queued",
        timeline: [
          {
            at: now,
            label: call.provider === "bolna" ? "Bolna call queued" : "Demo call queued",
            detail: call.message || `Execution ${executionId} is ${call.status || "queued"}.`
          },
          ...current.timeline
        ]
      }));

      res.json({ case: updated, call });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/bolna/webhook", async (req, res, next) => {
    try {
      const execution = extractBolnaExecution(req.body);
      let serviceCase = execution.caseId ? (await readCases()).find((item) => item.id === execution.caseId) : null;
      if (!serviceCase && execution.executionId) serviceCase = await findCaseByExecution(execution.executionId);
      if (!serviceCase) return res.status(202).json({ message: "Webhook accepted, but no matching case was found" });

      const isComplete = /completed|ended|success|failed|busy|no-answer/i.test(execution.status);
      const workOrder = isComplete ? buildWorkOrder(serviceCase, execution) : serviceCase.workOrder;
      const now = new Date().toISOString();

      const updated = await updateCase(serviceCase.id, (current) => ({
        status: isComplete ? "work_order_ready" : "calling",
        priority: workOrder?.priority || current.priority,
        lastCallStatus: execution.status,
        transcript: execution.transcript || current.transcript,
        recordingUrl: execution.recordingUrl || current.recordingUrl,
        extractedData: execution.extracted || current.extractedData,
        workOrder,
        timeline: [
          {
            at: now,
            label: isComplete ? "Webhook processed and work order generated" : "Webhook status update received",
            detail: isComplete ? `${workOrder.priority} with SLA: ${workOrder.sla}.` : `Call status is ${execution.status}.`
          },
          ...current.timeline
        ]
      }));

      res.json({ ok: true, case: updated });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/demo/webhook/:id", async (req, res, next) => {
    try {
      const cases = await readCases();
      const serviceCase = cases.find((item) => item.id === req.params.id);
      if (!serviceCase) return res.status(404).json({ message: "Case not found" });

      const execution = makeDemoExecution(serviceCase);
      const workOrder = buildWorkOrder(serviceCase, execution);
      const now = new Date().toISOString();
      const updated = await updateCase(serviceCase.id, (current) => ({
        status: "work_order_ready",
        priority: workOrder.priority,
        executionId: execution.executionId,
        lastCallStatus: "completed",
        transcript: execution.transcript,
        recordingUrl: execution.recordingUrl,
        extractedData: execution.extracted,
        workOrder,
        timeline: [
          {
            at: now,
            label: "Demo Bolna webhook processed",
            detail: `${workOrder.priority} work order created from structured call output.`
          },
          ...current.timeline
        ]
      }));

      res.json({ case: updated, execution });
    } catch (error) {
      next(error);
    }
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong",
      details: error.details
    });
  });

  return app;
}

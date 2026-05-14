const urgentSignals = [
  "down",
  "stopped",
  "not working",
  "no cooling",
  "leak",
  "burning",
  "smoke",
  "temperature",
  "sla",
  "production",
  "inventory",
  "safety",
  "blocked",
  "urgent"
];

const moderateSignals = ["noise", "intermittent", "slow", "warning", "degraded", "fluctuating"];

export function extractBolnaExecution(payload) {
  const data = payload?.data || payload?.execution || payload || {};
  const userData =
    data.user_data ||
    data.userData ||
    data.context_details ||
    payload?.user_data ||
    payload?.context_details ||
    {};
  const extracted =
    data.extracted_data ||
    data.extraction_data ||
    data.extractions ||
    data.variables ||
    payload?.extracted_data ||
    {};

  return {
    executionId: data.execution_id || data.call_id || data.id || payload?.execution_id || payload?.call_id,
    caseId: userData.case_id || extracted.case_id || payload?.case_id,
    status: data.status || data.call_status || payload?.status || "completed",
    transcript: data.transcript || data.conversation || payload?.transcript || "",
    recordingUrl:
      data.recording_url ||
      data.telephony_data?.recording_url ||
      data.transfer_call_data?.recording_url ||
      payload?.recording_url ||
      "",
    extracted
  };
}

export function buildWorkOrder(serviceCase, execution) {
  const extracted = execution.extracted || {};
  const combined = [
    serviceCase.issue,
    execution.transcript,
    extracted.issue_summary,
    extracted.impact,
    extracted.urgency_reason
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let score = 35;
  score += urgentSignals.filter((signal) => combined.includes(signal)).length * 9;
  score += moderateSignals.filter((signal) => combined.includes(signal)).length * 5;

  if (/today|asap|immediately|now|6 hours|same day/i.test(serviceCase.preferredWindow)) score += 14;
  if (/cold|compressor|freezer|chiller|server|medical/i.test(serviceCase.assetType)) score += 12;
  if (/safety|smoke|burning|fire|electric/i.test(combined)) score += 20;

  score = Math.min(100, score);

  const priority = score >= 78 ? "P1 Critical" : score >= 58 ? "P2 High" : "P3 Standard";
  const sla = priority === "P1 Critical" ? "Dispatch within 30 minutes" : priority === "P2 High" ? "Dispatch within 4 hours" : "Schedule within 1 business day";

  return {
    id: `wo-${crypto.randomUUID().slice(0, 8)}`,
    priority,
    score,
    sla,
    technicianSkill: extracted.technician_skill || inferSkill(serviceCase.assetType, combined),
    customerAvailability: extracted.customer_availability || serviceCase.preferredWindow,
    summary:
      extracted.issue_summary ||
      `Voice triage captured a ${priority.toLowerCase()} issue for ${serviceCase.assetType}.`,
    nextAction:
      extracted.next_action ||
      (priority === "P1 Critical"
        ? "Alert duty manager and assign nearest certified technician."
        : "Route to dispatcher queue with the recommended SLA."),
    partsLikelyNeeded: extracted.parts_likely_needed || inferParts(serviceCase.assetType, combined),
    createdAt: new Date().toISOString()
  };
}

function inferSkill(assetType, text) {
  if (/cold|compressor|chiller|freezer|temperature/.test(`${assetType} ${text}`.toLowerCase())) {
    return "Refrigeration technician";
  }
  if (/electric|power|panel|burning/.test(text)) return "Electrical technician";
  return "Field service technician";
}

function inferParts(assetType, text) {
  if (/compressor|cold|temperature/.test(`${assetType} ${text}`.toLowerCase())) {
    return "Temperature probe, refrigerant gauge, compressor relay";
  }
  if (/leak/.test(text)) return "Seal kit, pressure test kit";
  return "Standard diagnostic kit";
}

export function makeDemoExecution(serviceCase) {
  return {
    executionId: serviceCase.executionId || `demo-${crypto.randomUUID()}`,
    caseId: serviceCase.id,
    status: "completed",
    recordingUrl: "https://example.com/demo-call-recording.mp3",
    transcript:
      `Agent confirmed with ${serviceCase.contactName} that ${serviceCase.assetType} is affecting operations. ` +
      "The customer reported temperature fluctuation, inventory risk, and requested same-day dispatch. " +
      "They are available today before 6 PM and approved technician access at security gate.",
    extracted: {
      issue_summary: `${serviceCase.assetType} needs same-day inspection because the issue may breach the enterprise SLA.`,
      impact: "Potential inventory loss and customer SLA breach.",
      customer_availability: serviceCase.preferredWindow,
      technician_skill: "Refrigeration technician",
      next_action: "Create urgent work order, notify dispatcher, and send ETA confirmation to the customer.",
      parts_likely_needed: "Temperature probe, refrigerant gauge, compressor relay"
    }
  };
}

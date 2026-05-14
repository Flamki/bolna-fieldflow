import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.VERCEL ? path.join(os.tmpdir(), "fieldflow") : path.join(__dirname, "data");
const dataFile = path.join(dataDir, "cases.json");

const seedCases = [
  {
    id: "case-1001",
    customerName: "Apex Warehousing",
    contactName: "Rohit Mehra",
    phone: "+919876543210",
    address: "Plot 18, Bhiwandi Logistics Park",
    assetType: "Cold room compressor",
    issue: "Temperature rising above SLA. Inventory risk in next 6 hours.",
    preferredWindow: "Today before 6 PM",
    status: "new",
    priority: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    timeline: [
      {
        at: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
        label: "Service request captured",
        detail: "Dispatcher created the triage case."
      }
    ]
  }
];

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(seedCases, null, 2));
  }
}

export async function readCases() {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw);
}

export async function writeCases(cases) {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(cases, null, 2));
}

export async function addCase(input) {
  const now = new Date().toISOString();
  const cases = await readCases();
  const created = {
    id: `case-${crypto.randomUUID().slice(0, 8)}`,
    customerName: input.customerName?.trim() || "Unnamed account",
    contactName: input.contactName?.trim() || "Primary contact",
    phone: input.phone?.trim() || "",
    address: input.address?.trim() || "",
    assetType: input.assetType?.trim() || "Unknown asset",
    issue: input.issue?.trim() || "",
    preferredWindow: input.preferredWindow?.trim() || "As soon as possible",
    status: "new",
    priority: "pending",
    createdAt: now,
    updatedAt: now,
    timeline: [
      {
        at: now,
        label: "Service request captured",
        detail: "Dispatcher created the triage case."
      }
    ]
  };
  cases.unshift(created);
  await writeCases(cases);
  return created;
}

export async function updateCase(id, updater) {
  const cases = await readCases();
  const index = cases.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const next = {
    ...cases[index],
    ...updater(cases[index]),
    updatedAt: new Date().toISOString()
  };

  cases[index] = next;
  await writeCases(cases);
  return next;
}

export async function findCaseByExecution(executionId) {
  const cases = await readCases();
  return cases.find((item) => item.executionId === executionId);
}

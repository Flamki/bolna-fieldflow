import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Ayush";
pptx.company = "FieldFlow";
pptx.subject = "Bolna Full Stack Assignment";
pptx.title = "FieldFlow Voice Triage";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US"
};

const W = 13.333;
const H = 7.5;
const colors = {
  ink: "13241D",
  muted: "68756C",
  paper: "F6F8F2",
  white: "FFFFFF",
  green: "105F4C",
  mint: "DFF4EA",
  amber: "F6C85F",
  orange: "E8793E",
  line: "DDE5D8",
  dark: "203229"
};

function addFooter(slide, index) {
  slide.addText("FieldFlow Voice Triage | Bolna FSE Assignment", {
    x: 0.55,
    y: 7.05,
    w: 7.8,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 7.5,
    color: colors.muted,
    margin: 0
  });
  slide.addText(String(index).padStart(2, "0"), {
    x: 12.25,
    y: 6.96,
    w: 0.55,
    h: 0.28,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    align: "right",
    color: colors.green,
    margin: 0
  });
}

function title(slide, text, y = 0.48) {
  slide.addText(text, {
    x: 0.55,
    y,
    w: 7.6,
    h: 0.62,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: colors.ink,
    margin: 0,
    breakLine: false,
    fit: "shrink"
  });
}

function label(slide, text, x, y, w = 2.4) {
  slide.addText(text.toUpperCase(), {
    x,
    y,
    w,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 7.4,
    bold: true,
    color: colors.muted,
    charSpace: 0.6,
    margin: 0,
    breakLine: false,
    fit: "shrink"
  });
}

function pill(slide, text, x, y, w, fill = colors.mint, color = colors.green) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.35,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: fill }
  });
  slide.addText(text, {
    x: x + 0.12,
    y: y + 0.09,
    w: w - 0.24,
    h: 0.12,
    fontFace: "Aptos",
    fontSize: 8.5,
    bold: true,
    color,
    margin: 0,
    align: "center",
    breakLine: false,
    fit: "shrink"
  });
}

function bullet(slide, text, x, y, w, color = colors.ink) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x,
    y: y + 0.08,
    w: 0.08,
    h: 0.08,
    fill: { color: colors.green },
    line: { color: colors.green }
  });
  slide.addText(text, {
    x: x + 0.18,
    y,
    w,
    h: 0.32,
    fontFace: "Aptos",
    fontSize: 12.5,
    color,
    margin: 0,
    fit: "shrink"
  });
}

function addStage(slide, n, titleText, body, x, y, fill) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 2.15,
    h: 1.08,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: fill }
  });
  slide.addText(`0${n}`, {
    x: x + 0.14,
    y: y + 0.12,
    w: 0.34,
    h: 0.18,
    fontSize: 7.5,
    bold: true,
    color: n === 4 ? colors.white : colors.green,
    margin: 0
  });
  slide.addText(titleText, {
    x: x + 0.14,
    y: y + 0.34,
    w: 1.75,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: n === 4 ? colors.white : colors.ink,
    margin: 0,
    breakLine: false,
    fit: "shrink"
  });
  slide.addText(body, {
    x: x + 0.14,
    y: y + 0.66,
    w: 1.78,
    h: 0.28,
    fontSize: 8.5,
    color: n === 4 ? "DDEDE6" : colors.muted,
    margin: 0,
    fit: "shrink"
  });
}

function slideBase(bg = colors.paper) {
  const slide = pptx.addSlide();
  slide.background = { color: bg };
  return slide;
}

{
  const slide = slideBase(colors.dark);
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: colors.dark }, line: { color: colors.dark } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 5.85, w: W, h: 1.65, fill: { color: colors.green }, line: { color: colors.green }, transparency: 18 });
  slide.addText("FieldFlow", {
    x: 0.64,
    y: 0.52,
    w: 2.6,
    h: 0.34,
    fontSize: 15,
    bold: true,
    color: colors.mint,
    margin: 0
  });
  slide.addText("Voice Triage", {
    x: 0.58,
    y: 1.45,
    w: 8.4,
    h: 0.9,
    fontFace: "Aptos Display",
    fontSize: 50,
    bold: true,
    color: colors.white,
    margin: 0,
    breakLine: false,
    fit: "shrink"
  });
  slide.addText("AI voice-assisted enterprise service qualification using Bolna", {
    x: 0.64,
    y: 2.55,
    w: 6.6,
    h: 0.45,
    fontSize: 18,
    color: "CFE3D8",
    margin: 0,
    fit: "shrink"
  });
  slide.addShape(pptx.ShapeType.arc, { x: 8.2, y: 1.0, w: 3.7, h: 3.7, line: { color: colors.mint, transparency: 40, width: 3 }, adjustPoint: 0.55 });
  slide.addText("User -> Web app -> Bolna agent -> Backend -> Work order", {
    x: 0.64,
    y: 6.35,
    w: 8.6,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: colors.white,
    margin: 0,
    breakLine: false,
    fit: "shrink"
  });
  slide.addText("Full Stack Assignment", {
    x: 10.2,
    y: 6.34,
    w: 2.45,
    h: 0.24,
    fontSize: 10,
    bold: true,
    align: "right",
    color: colors.mint,
    margin: 0
  });
}

{
  const slide = slideBase();
  title(slide, "The enterprise problem");
  slide.addText("Incomplete service requests create slow dispatch, SLA risk, and wrong technician assignment.", {
    x: 0.58,
    y: 1.22,
    w: 7.2,
    h: 0.55,
    fontSize: 17,
    bold: true,
    color: colors.dark,
    margin: 0,
    fit: "shrink"
  });
  const pain = [
    ["45 min", "manual qualification baseline"],
    ["3 handoffs", "dispatcher, customer, technician"],
    ["High risk", "missing parts or wrong skill"]
  ];
  pain.forEach(([big, small], i) => {
    const x = 0.62 + i * 4.05;
    slide.addText(big, { x, y: 2.42, w: 2.8, h: 0.5, fontSize: 28, bold: true, color: i === 2 ? colors.orange : colors.green, margin: 0 });
    slide.addShape(pptx.ShapeType.line, { x, y: 3.1, w: 2.8, h: 0, line: { color: colors.line, width: 1.2 } });
    slide.addText(small, { x, y: 3.32, w: 2.9, h: 0.38, fontSize: 12, color: colors.muted, margin: 0, fit: "shrink" });
  });
  bullet(slide, "Customers report symptoms without operational context.", 0.72, 4.65, 5.6);
  bullet(slide, "Dispatchers repeat calls before a work order can be trusted.", 0.72, 5.15, 6.2);
  bullet(slide, "Operations managers lack a quick signal for SLA breach risk.", 0.72, 5.65, 6.4);
  addFooter(slide, 2);
}

{
  const slide = slideBase();
  title(slide, "FieldFlow workflow");
  slide.addText("A dispatcher creates a case, Bolna collects missing details by voice, and backend logic turns the call into a technician-ready work order.", {
    x: 0.58,
    y: 1.18,
    w: 8.6,
    h: 0.45,
    fontSize: 15.5,
    color: colors.muted,
    margin: 0,
    fit: "shrink"
  });
  const stages = [
    ["Intake", "Raw service request"],
    ["Call", "Bolna voice triage"],
    ["Webhook", "Transcript + extraction"],
    ["Output", "Priority, SLA, skill, parts"]
  ];
  stages.forEach(([name, body], i) => addStage(slide, i + 1, name, body, 0.7 + i * 3.05, 2.65, i === 3 ? colors.green : colors.white));
  for (let i = 0; i < 3; i += 1) {
    slide.addShape(pptx.ShapeType.chevron, { x: 2.92 + i * 3.05, y: 2.98, w: 0.35, h: 0.36, fill: { color: colors.amber }, line: { color: colors.amber } });
  }
  slide.addText("Outcome: qualified work order in under 10 minutes", {
    x: 2.15,
    y: 5.15,
    w: 8.8,
    h: 0.46,
    fontSize: 21,
    bold: true,
    color: colors.green,
    align: "center",
    margin: 0,
    fit: "shrink"
  });
  addFooter(slide, 3);
}

{
  const slide = slideBase();
  title(slide, "Bolna agent design");
  label(slide, "Dynamic context", 0.72, 1.4);
  bullet(slide, "case_id, customer_name, contact_name", 0.72, 1.85, 4.5);
  bullet(slide, "asset_type, issue, address, preferred_window", 0.72, 2.35, 5.4);
  label(slide, "Conversation goals", 0.72, 3.34);
  bullet(slide, "Confirm issue, start time, full outage vs degraded state.", 0.72, 3.78, 6.2);
  bullet(slide, "Capture business impact, site access, availability, safety risk.", 0.72, 4.28, 6.8);
  label(slide, "Structured extraction", 7.4, 1.4);
  ["issue_summary", "impact", "urgency_reason", "customer_availability", "site_access", "technician_skill", "parts_likely_needed", "next_action"].forEach((field, i) => {
    pill(slide, field, 7.4 + (i % 2) * 2.3, 1.86 + Math.floor(i / 2) * 0.74, 2.0, i > 4 ? "FFF0C2" : colors.mint, i > 4 ? "7D5600" : colors.green);
  });
  slide.addText("Prompt principle: collect operational truth, avoid diagnosis, and escalate safety risk.", {
    x: 7.4,
    y: 5.5,
    w: 4.55,
    h: 0.45,
    fontSize: 13,
    bold: true,
    color: colors.dark,
    margin: 0,
    fit: "shrink"
  });
  addFooter(slide, 4);
}

{
  const slide = slideBase();
  title(slide, "Web app experience");
  slide.addText("The first screen is the operator workspace: intake, queue, case detail, call launch, webhook status, and work order output.", {
    x: 0.58,
    y: 1.18,
    w: 9.2,
    h: 0.45,
    fontSize: 15.5,
    color: colors.muted,
    margin: 0,
    fit: "shrink"
  });
  const cols = [
    ["1. New request", "Capture enterprise, contact, phone, asset, issue, and preferred window."],
    ["2. Triage queue", "Track new, calling, and work-order-ready states."],
    ["3. Detail + action", "Start Bolna call or demo-safe webhook flow."],
    ["4. Output", "Show priority, SLA, technician skill, likely parts, decision, and timeline."]
  ];
  cols.forEach(([head, body], i) => {
    const x = 0.68 + (i % 2) * 6.05;
    const y = 2.2 + Math.floor(i / 2) * 1.75;
    slide.addText(head, { x, y, w: 3.5, h: 0.25, fontSize: 15, bold: true, color: colors.green, margin: 0, fit: "shrink" });
    slide.addText(body, { x, y: y + 0.43, w: 4.75, h: 0.42, fontSize: 12.5, color: colors.dark, margin: 0, fit: "shrink" });
  });
  pill(slide, "React + Vite", 0.72, 6.0, 1.45);
  pill(slide, "Node + Express", 2.35, 6.0, 1.65);
  pill(slide, "Bolna /call API", 4.18, 6.0, 1.75);
  pill(slide, "Webhook backend", 6.1, 6.0, 1.85);
  addFooter(slide, 5);
}

{
  const slide = slideBase();
  title(slide, "Backend logic");
  slide.addText("The webhook turns call execution data into a prioritized work order.", {
    x: 0.58,
    y: 1.18,
    w: 7.2,
    h: 0.4,
    fontSize: 16,
    color: colors.muted,
    margin: 0
  });
  const routes = [
    ["POST /api/cases", "Create service case"],
    ["POST /api/cases/:id/call", "Start Bolna call"],
    ["POST /api/bolna/webhook", "Process execution data"],
    ["POST /api/demo/webhook/:id", "Demo fallback"]
  ];
  routes.forEach(([route, body], i) => {
    slide.addText(route, { x: 0.78, y: 2.0 + i * 0.72, w: 3.2, h: 0.24, fontSize: 11, bold: true, color: colors.green, margin: 0, breakLine: false, fit: "shrink" });
    slide.addText(body, { x: 4.15, y: 2.0 + i * 0.72, w: 3.0, h: 0.24, fontSize: 11, color: colors.ink, margin: 0, breakLine: false, fit: "shrink" });
  });
  slide.addShape(pptx.ShapeType.line, { x: 7.65, y: 1.8, w: 0, h: 3.5, line: { color: colors.line, width: 1.2 } });
  label(slide, "Scoring inputs", 8.05, 1.92);
  ["issue text", "transcript", "extracted impact", "preferred window", "asset type", "safety signals"].forEach((text, i) => {
    pill(slide, text, 8.05 + (i % 2) * 1.82, 2.35 + Math.floor(i / 2) * 0.62, 1.52, i === 5 ? "FFE7DC" : colors.white, i === 5 ? "963B16" : colors.ink);
  });
  slide.addText("Output: P1 / P2 / P3, SLA, technician skill, likely parts, next backend action.", {
    x: 8.05,
    y: 5.15,
    w: 4.15,
    h: 0.5,
    fontSize: 13,
    bold: true,
    color: colors.dark,
    margin: 0,
    fit: "shrink"
  });
  addFooter(slide, 6);
}

{
  const slide = slideBase();
  title(slide, "Outcome metric");
  slide.addText("Primary metric: time from raw service request to qualified work order.", {
    x: 0.58,
    y: 1.17,
    w: 7.2,
    h: 0.4,
    fontSize: 16,
    color: colors.muted,
    margin: 0
  });
  slide.addText("45 min", { x: 1.0, y: 2.45, w: 2.4, h: 0.6, fontSize: 34, bold: true, color: colors.orange, margin: 0 });
  slide.addText("manual baseline", { x: 1.0, y: 3.1, w: 2.4, h: 0.24, fontSize: 12, color: colors.muted, margin: 0 });
  slide.addShape(pptx.ShapeType.chevron, { x: 4.65, y: 2.66, w: 0.65, h: 0.55, fill: { color: colors.amber }, line: { color: colors.amber } });
  slide.addText("< 10 min", { x: 6.35, y: 2.45, w: 2.7, h: 0.6, fontSize: 34, bold: true, color: colors.green, margin: 0 });
  slide.addText("target with FieldFlow", { x: 6.35, y: 3.1, w: 2.8, h: 0.24, fontSize: 12, color: colors.muted, margin: 0 });
  slide.addText("Expected business lift", { x: 0.72, y: 4.65, w: 2.5, h: 0.25, fontSize: 14, bold: true, color: colors.dark, margin: 0 });
  bullet(slide, "Faster dispatch and better SLA protection.", 0.72, 5.16, 5.2);
  bullet(slide, "More complete triage data attached to each ticket.", 0.72, 5.62, 5.8);
  bullet(slide, "Higher first-time-right technician assignment.", 6.7, 5.16, 5.2);
  addFooter(slide, 7);
}

{
  const slide = slideBase();
  title(slide, "Demo flow and links");
  addStage(slide, 1, "Create case", "Dispatcher enters request", 0.72, 1.85, colors.white);
  addStage(slide, 2, "Start call", "Bolna receives context", 3.77, 1.85, colors.white);
  addStage(slide, 3, "Webhook", "Call data posts back", 6.82, 1.85, colors.white);
  addStage(slide, 4, "Work order", "Backend output appears", 9.87, 1.85, colors.green);
  slide.addText("Deployed app", { x: 0.72, y: 4.18, w: 2.2, h: 0.24, fontSize: 12, bold: true, color: colors.green, margin: 0 });
  slide.addText("https://bolna-one.vercel.app", { x: 2.55, y: 4.18, w: 4.7, h: 0.24, fontSize: 12, color: colors.ink, margin: 0, breakLine: false, fit: "shrink" });
  slide.addText("Webhook", { x: 0.72, y: 4.72, w: 2.2, h: 0.24, fontSize: 12, bold: true, color: colors.green, margin: 0 });
  slide.addText("https://bolna-one.vercel.app/api/bolna/webhook", { x: 2.55, y: 4.72, w: 5.7, h: 0.24, fontSize: 12, color: colors.ink, margin: 0, breakLine: false, fit: "shrink" });
  slide.addText("Local demo", { x: 0.72, y: 5.26, w: 2.2, h: 0.24, fontSize: 12, bold: true, color: colors.green, margin: 0 });
  slide.addText("http://localhost:5173?demo=1", { x: 2.55, y: 5.26, w: 4.4, h: 0.24, fontSize: 12, color: colors.ink, margin: 0, breakLine: false, fit: "shrink" });
  slide.addText("Submission evidence: GitHub repo, deployed link, deck, screen recording, and call/demo recording.", {
    x: 0.72,
    y: 6.08,
    w: 9.7,
    h: 0.36,
    fontSize: 13,
    bold: true,
    color: colors.dark,
    margin: 0,
    fit: "shrink"
  });
  addFooter(slide, 8);
}

await pptx.writeFile({ fileName: "docs/FieldFlow-Voice-Triage-Ayush.pptx" });
console.log("Wrote docs/FieldFlow-Voice-Triage-Ayush.pptx");

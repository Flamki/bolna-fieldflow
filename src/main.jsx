import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ClipboardCheck,
  Headphones,
  Loader2,
  PhoneCall,
  Plus,
  Radio,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import "./styles.css";

const emptyForm = {
  customerName: "",
  contactName: "",
  phone: "",
  address: "",
  assetType: "",
  issue: "",
  preferredWindow: ""
};

function App() {
  const [cases, setCases] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [health, setHealth] = useState(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  const selected = useMemo(
    () => cases.find((item) => item.id === selectedId) || cases[0],
    [cases, selectedId]
  );
  const allowDemoWebhook = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return !health?.bolnaConfigured || params.get("demo") === "1";
  }, [health?.bolnaConfigured]);
  const forceDemoMode = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("demo") === "1";
  }, []);

  const metrics = useMemo(() => {
    const ready = cases.filter((item) => item.status === "work_order_ready").length;
    const critical = cases.filter((item) => item.priority?.startsWith("P1")).length;
    const calling = cases.filter((item) => item.status === "calling").length;
    return { ready, critical, calling };
  }, [cases]);

  async function load() {
    setError("");
    const [casesResponse, healthResponse] = await Promise.all([fetch("/api/cases"), fetch("/api/health")]);
    const nextCases = await casesResponse.json();
    setCases(nextCases);
    setHealth(await healthResponse.json());
    if (!selectedId && nextCases[0]) setSelectedId(nextCases[0].id);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  async function createCase(event) {
    event.preventDefault();
    setBusy("create");
    setError("");
    try {
      const response = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error((await response.json()).message);
      const created = await response.json();
      setForm(emptyForm);
      setCases((current) => [created, ...current]);
      setSelectedId(created.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  }

  async function startCall(id) {
    setBusy(`call-${id}`);
    setError("");
    try {
      const response = await fetch(`/api/cases/${id}/call${forceDemoMode ? "?demo=1" : ""}`, { method: "POST" });
      if (!response.ok) throw new Error((await response.json()).message);
      const body = await response.json();
      setCases((current) => current.map((item) => (item.id === body.case.id ? body.case : item)));
      setSelectedId(body.case.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  }

  async function simulateWebhook(id) {
    setBusy(`webhook-${id}`);
    setError("");
    try {
      const response = await fetch(`/api/demo/webhook/${id}`, { method: "POST" });
      if (!response.ok) throw new Error((await response.json()).message);
      const body = await response.json();
      setCases((current) => current.map((item) => (item.id === body.case.id ? body.case : item)));
      setSelectedId(body.case.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  }

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Bolna Voice AI workflow</p>
          <h1>FieldFlow service triage</h1>
        </div>
        <div className={`config-pill ${health?.bolnaConfigured ? "live" : ""}`}>
          <Radio size={16} />
          {health?.bolnaConfigured ? "Bolna live mode" : "Demo mode"}
        </div>
      </section>

      {error && <div className="error-banner">{error}</div>}

      <section className="metric-grid" aria-label="Workflow metrics">
        <Metric icon={ClipboardCheck} label="Work orders ready" value={metrics.ready} />
        <Metric icon={ShieldCheck} label="Critical cases" value={metrics.critical} />
        <Metric icon={Headphones} label="Calls in progress" value={metrics.calling} />
        <Metric icon={Route} label="Outcome metric" value="35 min" helper="Target time saved per ticket" />
      </section>

      <section className="workspace">
        <aside className="panel intake-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Step 1</p>
              <h2>New service request</h2>
            </div>
            <Plus size={20} />
          </div>

          <form onSubmit={createCase} className="case-form">
            <Field label="Enterprise account" value={form.customerName} onChange={(value) => setForm({ ...form, customerName: value })} placeholder="Apex Warehousing" />
            <Field label="Contact name" value={form.contactName} onChange={(value) => setForm({ ...form, contactName: value })} placeholder="Rohit Mehra" />
            <Field label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder="+919876543210" />
            <Field label="Site address" value={form.address} onChange={(value) => setForm({ ...form, address: value })} placeholder="Facility or branch address" />
            <Field label="Asset type" value={form.assetType} onChange={(value) => setForm({ ...form, assetType: value })} placeholder="Cold room compressor" />
            <label className="field">
              Issue
              <textarea
                value={form.issue}
                onChange={(event) => setForm({ ...form, issue: event.target.value })}
                placeholder="What is failing, business impact, and current symptoms?"
                rows={4}
              />
            </label>
            <Field label="Preferred window" value={form.preferredWindow} onChange={(value) => setForm({ ...form, preferredWindow: value })} placeholder="Today before 6 PM" />
            <button className="primary-action" type="submit" disabled={busy === "create"}>
              {busy === "create" ? <Loader2 className="spin" size={18} /> : <Plus size={18} />}
              Create case
            </button>
          </form>
        </aside>

        <section className="panel queue-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Step 2</p>
              <h2>Triage queue</h2>
            </div>
            <button className="icon-button" onClick={() => load()} title="Refresh queue" aria-label="Refresh queue">
              <RefreshCcw size={18} />
            </button>
          </div>

          <div className="case-list">
            {cases.map((item) => (
              <button
                key={item.id}
                className={`case-row ${selected?.id === item.id ? "active" : ""}`}
                onClick={() => setSelectedId(item.id)}
              >
                <span>
                  <strong>{item.customerName}</strong>
                  <small>{item.assetType}</small>
                </span>
                <StatusBadge status={item.priority !== "pending" ? item.priority : item.status} />
              </button>
            ))}
          </div>
        </section>

        <section className="panel detail-panel">
          {selected ? (
            <>
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Step 3</p>
                  <h2>{selected.customerName}</h2>
                </div>
                <StatusBadge status={selected.priority !== "pending" ? selected.priority : selected.status} />
              </div>

              <div className="detail-grid">
                <Info label="Contact" value={selected.contactName} />
                <Info label="Phone" value={selected.phone} />
                <Info label="Asset" value={selected.assetType} />
                <Info label="Preferred" value={selected.preferredWindow} />
              </div>

              <div className="issue-box">{selected.issue}</div>

              <div className="action-row">
                <button className="primary-action" onClick={() => startCall(selected.id)} disabled={busy === `call-${selected.id}`}>
                  {busy === `call-${selected.id}` ? <Loader2 className="spin" size={18} /> : <PhoneCall size={18} />}
                  Start Bolna call
                </button>
                {allowDemoWebhook && (
                  <button className="secondary-action" onClick={() => simulateWebhook(selected.id)} disabled={busy === `webhook-${selected.id}`}>
                    {busy === `webhook-${selected.id}` ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
                    Simulate webhook
                  </button>
                )}
              </div>

              {selected.workOrder && <WorkOrder order={selected.workOrder} recordingUrl={selected.recordingUrl} />}

              <div className="timeline">
                <h3>Workflow timeline</h3>
                {selected.timeline?.map((event) => (
                  <div className="timeline-event" key={`${event.at}-${event.label}`}>
                    <span />
                    <div>
                      <strong>{event.label}</strong>
                      <p>{event.detail}</p>
                      <small>{new Date(event.at).toLocaleString()}</small>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">Create a case to start the voice triage flow.</div>
          )}
        </section>
      </section>

      <section className="webhook-strip">
        <Activity size={18} />
        <span>Webhook endpoint for Bolna Analytics:</span>
        <code>{health?.webhookUrl || "/api/bolna/webhook"}</code>
      </section>
    </main>
  );
}

function Metric({ icon: Icon, label, value, helper }) {
  return (
    <article className="metric">
      <Icon size={20} />
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
        {helper && <small>{helper}</small>}
      </div>
    </article>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="field">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function Info({ label, value }) {
  return (
    <div className="info">
      <span>{label}</span>
      <strong>{value || "Not captured"}</strong>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = String(status || "new").toLowerCase().replaceAll(" ", "-");
  return <span className={`status ${normalized}`}>{status}</span>;
}

function WorkOrder({ order, recordingUrl }) {
  return (
    <section className="work-order">
      <div className="work-order-header">
        <div>
          <p className="eyebrow">Step 4 output</p>
          <h3>{order.id}</h3>
        </div>
        <StatusBadge status={order.priority} />
      </div>
      <p>{order.summary}</p>
      <div className="detail-grid">
        <Info label="Urgency score" value={`${order.score}/100`} />
        <Info label="SLA" value={order.sla} />
        <Info label="Skill" value={order.technicianSkill} />
        <Info label="Parts" value={order.partsLikelyNeeded} />
      </div>
      <div className="next-action">
        <strong>Backend decision</strong>
        <span>{order.nextAction}</span>
      </div>
      {recordingUrl && !recordingUrl.includes("example.com") && (
        <a className="recording-link" href={recordingUrl} target="_blank" rel="noreferrer">
          Open call recording
        </a>
      )}
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);

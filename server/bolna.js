const BOLNA_CALL_URL = "https://api.bolna.ai/call";
const BOLNA_EXECUTION_URL = "https://api.bolna.ai/executions";

export function hasBolnaConfig() {
  return Boolean(process.env.BOLNA_API_KEY && process.env.BOLNA_AGENT_ID);
}

export function startDemoCall() {
  return {
    provider: "demo",
    status: "queued",
    execution_id: `demo-${crypto.randomUUID()}`,
    message: "Demo call queued locally. Add Bolna credentials to place a real outbound call."
  };
}

export async function startBolnaCall(serviceCase) {
  if (!hasBolnaConfig()) {
    return startDemoCall();
  }

  const payload = {
    agent_id: process.env.BOLNA_AGENT_ID,
    recipient_phone_number: serviceCase.phone,
    user_data: {
      case_id: serviceCase.id,
      customer_name: serviceCase.customerName,
      contact_name: serviceCase.contactName,
      asset_type: serviceCase.assetType,
      issue: serviceCase.issue,
      address: serviceCase.address,
      preferred_window: serviceCase.preferredWindow
    }
  };

  if (process.env.BOLNA_FROM_PHONE_NUMBER) {
    payload.from_phone_number = process.env.BOLNA_FROM_PHONE_NUMBER;
  }

  const response = await fetch(BOLNA_CALL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.BOLNA_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(body?.message || "Bolna call request failed");
    error.status = response.status;
    error.details = body;
    throw error;
  }

  return { provider: "bolna", ...body };
}

export async function getBolnaExecution(executionId) {
  if (!hasBolnaConfig()) {
    const error = new Error("Bolna credentials are not configured");
    error.status = 400;
    throw error;
  }

  const response = await fetch(`${BOLNA_EXECUTION_URL}/${executionId}`, {
    headers: {
      Authorization: `Bearer ${process.env.BOLNA_API_KEY}`
    }
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(body?.message || "Bolna execution lookup failed");
    error.status = response.status;
    error.details = body;
    throw error;
  }

  return body;
}

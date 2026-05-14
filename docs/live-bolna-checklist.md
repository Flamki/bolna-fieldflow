# Live Bolna Demo Checklist

Use this when recording a real outbound call.

## Before Recording

- Confirm the deployed app is live: `https://bolna-one.vercel.app`.
- Confirm the backend health route returns `bolnaConfigured: true`:

```text
https://bolna-one.vercel.app/api/health
```

- In Bolna, confirm the FieldFlow agent uses the prompt from `docs/bolna-agent-prompt.md`.
- In Bolna, set the post-call analytics/webhook URL to:

```text
https://bolna-one.vercel.app/api/bolna/webhook
```

- Use a Bolna-verified recipient number in the app's Phone field.
- Keep the phone nearby and answer the outbound call.

## Recording Flow

1. Open `https://bolna-one.vercel.app`.
2. Create a service request with an urgent equipment issue.
3. Click **Start Bolna call**.
4. Answer the call and complete the triage conversation.
5. Return to the app and refresh if needed.
6. Show the generated work order:
   - Priority and SLA.
   - Technician skill.
   - Likely parts.
   - Backend decision.
   - Call intelligence evidence.
   - Transcript or recording link if Bolna returned one.
   - Timeline.

## If Live Calling Fails

Confirm the recipient number is verified in Bolna, the agent ID is correct, and the webhook URL is set to the deployed endpoint above. Then retry the call from a fresh service case.

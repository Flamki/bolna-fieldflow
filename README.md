# FieldFlow Voice Triage

FieldFlow is a full-stack Bolna voice workflow built for enterprise field-service triage. A dispatcher creates a service request, the web app starts a Bolna call, Bolna sends the call result to a backend webhook, and the backend generates a prioritized technician-ready work order.

## Live Demo

Deployed app:

```text
https://bolna-one.vercel.app
```

Bolna webhook URL:

```text
https://bolna-one.vercel.app/api/bolna/webhook
```

## Product Highlights

| Area | Implementation |
| --- | --- |
| Real enterprise use case | Enterprise field-service request triage for equipment issues |
| Problem, workflow, metric | Defined in `docs/use-case.md` |
| Bolna voice agent | Agent prompt and extraction design in `docs/bolna-agent-prompt.md` |
| Webhook/API usage | Backend starts Bolna calls and receives post-call webhooks |
| Web app around agent | React dashboard for intake, call launch, queue, and work order output |
| SaaS/product layer | Operations brief, urgency/completion metrics, call intelligence, routing guidance |
| Full workflow | User -> Web app -> Bolna agent -> Backend logic -> Work order |

## Enterprise Use Case

Enterprise facilities teams often receive service requests with incomplete details. Dispatchers must call customers manually, collect missing information, judge urgency, and create work orders. This delays dispatch and increases the chance of SLA breaches or wrong technician assignment.

FieldFlow solves this by using a Bolna voice agent to qualify the request and a backend workflow to generate a structured work order.

The product is positioned as a lightweight enterprise SaaS operations console: dispatchers can see queue health, SLA exposure, call evidence, technician routing, and the generated work order in one place.

Primary outcome metric:

```text
Reduce time from raw service request to qualified work order from about 45 minutes to under 10 minutes.
```

## Product Flow

1. Dispatcher creates a service request in the FieldFlow web app.
2. Web app calls `POST /api/cases/:id/call`.
3. Backend starts an outbound Bolna call using the configured agent ID.
4. Bolna agent confirms issue, impact, urgency, availability, and site access.
5. Bolna sends call execution data to `POST /api/bolna/webhook`.
6. Backend scores urgency and creates a work order with:
   - Priority
   - SLA
   - Technician skill
   - Likely parts
   - Next backend action
   - Call transcript/recording when available
7. Dashboard displays the work order, call evidence, routing guidance, and timeline.

## Tech Stack

- React 19
- Vite
- Node.js
- Express
- Bolna outbound call API
- Bolna webhook/post-call analytics
- Vercel deployment

## API Routes

| Route | Purpose |
| --- | --- |
| `GET /api/health` | Checks app health and Bolna configuration |
| `GET /api/cases` | Lists service cases |
| `POST /api/cases` | Creates a new service case |
| `POST /api/cases/:id/call` | Starts a Bolna outbound call |
| `POST /api/bolna/webhook` | Receives Bolna call execution data |

## Bolna Agent Setup

Create a Bolna agent using the prompt in:

```text
docs/bolna-agent-prompt.md
```

Set the webhook/post-call task URL in Bolna to:

```text
https://bolna-one.vercel.app/api/bolna/webhook
```

Recommended extraction fields:

```text
case_id
issue_summary
impact
urgency_reason
customer_availability
site_access
technician_skill
parts_likely_needed
next_action
```

## Run Locally

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.example`:

```bash
BOLNA_API_KEY=your_bolna_api_key
BOLNA_AGENT_ID=your_bolna_agent_id
BOLNA_FROM_PHONE_NUMBER=optional_bolna_number
PUBLIC_BASE_URL=http://localhost:8080
PORT=8080
```

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Production Deployment

The production app is deployed on Vercel:

```text
https://bolna-one.vercel.app
```

Required Vercel environment variables:

```bash
BOLNA_API_KEY
BOLNA_AGENT_ID
BOLNA_FROM_PHONE_NUMBER
PUBLIC_BASE_URL=https://bolna-one.vercel.app
```

Deploy:

```bash
vercel --prod
```

## Demo Instructions

1. Open `https://bolna-one.vercel.app`.
2. Create a new service case.
3. Use a Bolna-verified phone number.
4. Click **Start Bolna call**.
5. Answer the call and complete the triage conversation.
6. After Bolna posts to the webhook, review the generated work order in the dashboard.

## Project Docs

- `docs/use-case.md` - problem, workflow, and outcome metric
- `docs/bolna-agent-prompt.md` - Bolna prompt and extraction fields
- `docs/assignment-deck.md` - slide content for submission deck
- `docs/demo-script.md` - screen recording script
- `docs/video-pitch.md` - concise narration for the screen recording
- `docs/live-bolna-checklist.md` - real outbound call verification steps
- `docs/submission-checklist.md` - final upload checklist

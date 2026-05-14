# FieldFlow Voice Triage Deck

## Slide 1: Title

FieldFlow Voice Triage

Bolna-powered enterprise service qualification.

## Slide 2: Problem

Enterprise field-service teams receive incomplete service requests. Dispatchers spend time calling customers, collecting missing details, assessing urgency, and manually creating work orders.

Business pain:

- Slow dispatch.
- SLA misses.
- Wrong technician assignment.
- Missing parts and repeated visits.

## Slide 3: Workflow

User creates case in FieldFlow.

FieldFlow starts Bolna call.

Bolna agent asks structured triage questions.

Bolna sends call execution webhook.

Backend generates priority, SLA, skill, parts, and work order.

## Slide 4: Bolna Agent Design

Agent receives dynamic variables:

- Customer and contact.
- Asset type.
- Raw issue.
- Address.
- Preferred service window.

Agent extracts:

- Issue summary.
- Impact.
- Urgency reason.
- Customer availability.
- Site access.
- Skill and parts recommendation.

## Slide 5: Web App

The app is an operator dashboard with:

- Service request intake.
- Triage queue.
- Bolna call action.
- Webhook endpoint visibility.
- Work order output.
- Operations metrics.
- Call intelligence evidence.
- Technician routing guidance.
- Timeline audit trail.

## Slide 6: Backend Logic

Backend handles:

- `POST /api/cases`
- `POST /api/cases/:id/call`
- `POST /api/bolna/webhook`

Urgency score combines issue text, transcript, extracted impact, preferred window, and asset type.

## Slide 7: Outcome Metric

Primary metric: request-to-qualified-work-order time.

Baseline: about 45 minutes.

Target: under 10 minutes.

Expected impact:

- Faster dispatch.
- Better SLA protection.
- More complete triage data.
- Improved first-time-right technician assignment.

## Slide 8: Standout SaaS Layer

FieldFlow goes beyond call initiation. It behaves like a small operations console:

- Queue health and completion rate.
- Urgency scoring visibility.
- Call transcript and extracted evidence.
- Routing recommendation for technician skill and SLA.
- Timeline audit trail for dispatcher trust.

## Slide 9: Demo

Demo path:

Create service request -> Start Bolna call -> Receive webhook -> Generate work order -> Review output.

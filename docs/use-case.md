# Enterprise Use Case

## Problem

Enterprise facilities and equipment service teams receive urgent requests from large customers, but the first ticket often lacks the details needed to dispatch the right technician. Dispatchers must call the customer, ask repetitive questions, judge severity, and manually create a work order.

This creates three business problems:

- Slow qualification before dispatch.
- Wrong technician or missing parts sent to site.
- Poor visibility into SLA risk for operations managers.

## Workflow

1. Dispatcher enters the raw customer request in FieldFlow.
2. FieldFlow sends the customer and issue context to a Bolna Voice AI agent.
3. The agent calls the customer and captures:
   - Confirmed issue and symptoms.
   - Business impact.
   - Site access instructions.
   - Customer availability.
   - Safety or inventory risk.
   - Likely technician skill.
4. Bolna sends the call execution payload to the FieldFlow webhook.
5. Backend logic scores urgency and creates a work order with SLA, skill, likely parts, and next action.
6. Dispatcher reviews the generated work order and assigns a technician.

## Outcome Metric

Primary metric: time from service request creation to qualified work order.

Baseline: approximately 45 minutes when the dispatcher must manually call, take notes, decide priority, and create the ticket.

Target with FieldFlow: under 10 minutes, with voice call recording and structured extraction attached to the ticket.

Secondary metrics:

- First-time-right dispatch rate.
- Percentage of calls with complete triage fields.
- P1 SLA breach rate.
- Dispatcher tickets processed per hour.


# Video Pitch

## 20-second opener

FieldFlow is an AI-powered field-service dispatch workflow built around Bolna. Enterprise service requests usually arrive incomplete, so dispatchers waste time calling customers before they can create a reliable work order. FieldFlow uses a Bolna voice agent to collect the missing operational context, then the backend converts the call result into priority, SLA, technician skill, likely parts, and routing guidance.

## 60-second demo narration

This is the dispatcher workspace. I start with a raw service request for an enterprise equipment issue. The app sends the case context to the backend, and the backend starts a Bolna outbound call using the configured agent ID, recipient number, and dynamic user data.

The Bolna agent asks focused triage questions: what changed, business impact, safety risk, site access, and customer availability. After the call, Bolna posts the execution data to my webhook.

The backend processes the transcript and extracted fields, computes an urgency score, assigns a P1/P2/P3 priority, chooses the SLA, recommends the technician skill, predicts likely parts, and creates the final work order.

The dashboard then shows the result as an enterprise operations console: queue health, completion rate, urgency, call evidence, routing guidance, transcript, and a timeline. The key outcome metric is reducing request-to-qualified-work-order time from about 45 minutes to under 10 minutes.

## Close

The full flow is: user to web app, web app to Bolna, Bolna to backend webhook, backend logic to technician-ready work order.

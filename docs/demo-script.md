# Screen Recording Script

## 1. Introduce the Problem

Show the dashboard and say:

"This workflow solves enterprise field-service triage. The dispatcher receives incomplete equipment service requests and needs to quickly convert them into technician-ready work orders."

## 2. Create a Case

Enter:

- Enterprise account: Apex Warehousing
- Contact name: Rohit Mehra
- Phone: your Bolna-verified test number
- Site address: Plot 18, Bhiwandi Logistics Park
- Asset type: Cold room compressor
- Issue: Temperature is rising above SLA and inventory may be at risk within 6 hours.
- Preferred window: Today before 6 PM

Click **Create case**.

## 3. Start the Bolna Call

Click **Start Bolna call**.

Say:

"This endpoint sends the call request to Bolna using the agent ID, phone number, and dynamic user data. The customer answers the call, the agent collects missing triage details, and Bolna posts the execution result back to the webhook."

## 4. Show Backend/Webhook Logic

Click **Simulate webhook**.

Say:

"This simulates the Bolna execution webhook. The backend reads transcript and extracted fields, computes urgency, assigns SLA, recommends technician skill, and creates the work order."

## 5. Show Output

Point to:

- Priority badge.
- SLA.
- Technician skill.
- Parts likely needed.
- Backend decision.
- Operations brief metrics.
- Call intelligence evidence.
- Transcript and site access notes.
- Timeline.
- Webhook endpoint.

## 6. Close

Say:

"The full flow is user to web app, web app to Bolna agent, Bolna webhook to backend logic, and backend output back to the dashboard."

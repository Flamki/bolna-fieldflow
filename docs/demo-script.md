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

## 3. Start the Voice AI Call

Click **Start Bolna call**.

Say:

"In live mode, this endpoint sends the call request to Bolna using the agent ID, phone number, and dynamic user data. Without credentials, the app runs in demo mode so the full workflow can still be reviewed."

For a no-risk recording path, open:

```text
http://localhost:5173?demo=1
```

This keeps the same UI flow but queues a local demo call instead of placing a real outbound call.

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
- Timeline.
- Webhook endpoint.

## 6. Close

Say:

"The full flow is user to web app, web app to Bolna agent, Bolna webhook to backend logic, and backend output back to the dashboard."

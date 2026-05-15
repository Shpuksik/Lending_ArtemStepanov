# n8n Callback Form

The site callback form sends a same-origin `POST /api/callback` request.

Cloudflare Worker handles `/api/callback`, validates the payload, checks the honeypot field `company`, and forwards the request to the n8n production webhook.

The real n8n webhook URL must not be stored in frontend code, Worker code, docs, or git history. Store it only as a Cloudflare secret.

Secret name:

```text
N8N_CALLBACK_WEBHOOK_URL
```

Use the production webhook URL from n8n, not the test webhook URL.

Where to add the secret:

1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages`.
3. Open the site project.
4. Open `Settings`.
5. Open `Variables and Secrets`.
6. Click `Add secret`.
7. Set the name to `N8N_CALLBACK_WEBHOOK_URL`.
8. Paste the production n8n webhook URL as the value.
9. Save the secret.
10. Redeploy the project.

After the secret is added and the project is redeployed, the form will send callback requests through the Worker to n8n. The frontend does not contain the webhook URL.
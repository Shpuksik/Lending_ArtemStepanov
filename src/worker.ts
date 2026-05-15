interface Env {
  ASSETS: Fetcher;
  N8N_CALLBACK_WEBHOOK_URL?: string;
}

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function readString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: jsonHeaders,
      });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/callback') {
      if (request.method !== 'POST') {
        return jsonResponse({ ok: false, error: 'Method not allowed' }, 405);
      }

      const contentType = request.headers.get('content-type') || '';
      if (!contentType.toLowerCase().includes('application/json')) {
        return jsonResponse({ ok: false, error: 'Invalid content type' }, 415);
      }

      let data: Record<string, unknown>;
      try {
        data = await request.json<Record<string, unknown>>();
      } catch {
        return jsonResponse({ ok: false, error: 'Invalid JSON' }, 400);
      }

      const company = readString(data.company, 120);
      if (company) {
        return jsonResponse({ ok: true });
      }

      const name = readString(data.name, 80);
      const phone = readString(data.phone, 40);
      const message = readString(data.message, 1000);
      const page = readString(data.page, 300);
      const source = readString(data.source, 100);

      if (!phone) {
        return jsonResponse({ ok: false, error: 'Phone is required' }, 400);
      }

      if (!env.N8N_CALLBACK_WEBHOOK_URL) {
        return jsonResponse({ ok: false, error: 'Webhook is not configured' }, 500);
      }

      const payload = {
        name,
        phone,
        message,
        source,
        page,
        createdAt: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || '',
        ip: request.headers.get('cf-connecting-ip') || '',
      };

      let webhookResponse: Response;
      try {
        webhookResponse = await fetch(env.N8N_CALLBACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        return jsonResponse({ ok: false, error: 'Webhook delivery failed' }, 502);
      }

      if (!webhookResponse.ok) {
        return jsonResponse({ ok: false, error: 'Webhook delivery failed' }, 502);
      }

      return jsonResponse({ ok: true });
    }

    return env.ASSETS.fetch(request);
  },
};

import { createHmac } from 'node:crypto';

/**
 * Fires the Astro rebuild webhook. Signed with HMAC SHA-256 so the receiver
 * can authenticate the request. The receiver (apps/web/scripts/webhook-receiver.mjs)
 * coalesces bursts into a single build, so calling this from every collection
 * mutation is safe.
 */
export const triggerBuild: any = async ({
  req,
  collection,
  global,
}: {
  req: any;
  collection?: any;
  global?: any;
}) => {
  // Skip during seeding / programmatic ops where req.context flags it off.
  if (req?.context?.skipBuildHook) return;

  const url = process.env.BUILD_WEBHOOK_URL;
  const secret = process.env.BUILD_WEBHOOK_SECRET;
  if (!url || !secret) {
    req?.payload?.logger?.warn('[triggerBuild] BUILD_WEBHOOK_URL / SECRET missing — skipped');
    return;
  }

  const slug = collection?.slug || global?.slug || 'unknown';
  const type = collection ? 'collection' : (global ? 'global' : 'unknown');

  const body = JSON.stringify({
    source: 'payload',
    type,
    slug,
    collection: collection?.slug || null,
    global: global?.slug || null,
    at: new Date().toISOString(),
  });
  const signature = createHmac('sha256', secret).update(body).digest('hex');

  // Fire-and-forget — never block the admin save on the build.
  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-payload-signature': `sha256=${signature}`,
    },
    body,
  }).catch((err) => {
    req?.payload?.logger?.error({ err }, '[triggerBuild] webhook POST failed');
  });
};


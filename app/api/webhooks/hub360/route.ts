import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { hub360Config } from "@/lib/hub360/config";

/**
 * Receptor de webhooks Hub → web (solo eventos con origin_source MULTIALQUILERES_WEBSITE).
 * Verifica X-Hub360-Signature = sha256=<hmac>.
 */
export async function POST(request: Request) {
  const { webhookSecret } = hub360Config();
  if (!webhookSecret) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const raw = await request.text();
  const signatureHeader = request.headers.get("x-hub360-signature") || "";
  const expected = `sha256=${createHmac("sha256", webhookSecret).update(raw).digest("hex")}`;

  const provided = Buffer.from(signatureHeader);
  const wanted = Buffer.from(expected);
  if (provided.length !== wanted.length || !timingSafeEqual(provided, wanted)) {
    return NextResponse.json({ ok: false, code: "invalid_signature" }, { status: 401 });
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }

  const eventId = String(payload.event_id || request.headers.get("x-hub360-delivery") || "");
  const eventType = String(payload.event_type || request.headers.get("x-hub360-event") || "");
  const originSource = String(payload.origin_source || "");

  // Ack inmediato; el filtrado de origen ya lo hace Hub, aquí solo registramos.
  console.info(
    JSON.stringify({
      scope: "hub360_webhook",
      event_id: eventId,
      event_type: eventType,
      origin_source: originSource,
      received_at: new Date().toISOString(),
    }),
  );

  return NextResponse.json({
    ok: true,
    received: true,
    event_id: eventId,
    event_type: eventType,
  });
}

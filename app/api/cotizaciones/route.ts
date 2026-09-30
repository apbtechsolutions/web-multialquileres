import { NextResponse } from "next/server";
import { bookingPayloadFromWeb } from "@/lib/hub360/booking";
import { channelPath, hub360Fetch } from "@/lib/hub360/client";
import { hub360Config } from "@/lib/hub360/config";

/**
 * Crea cotización oficial en APBHUB360 (WhatsApp puede seguir en paralelo).
 * Body: { trip, vehiculo, conductor }
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  if (!hub360Config().configured) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const payload = body as {
    trip?: Record<string, string>;
    vehiculo?: { slug?: string; id?: number | string; name?: string };
    conductor?: Record<string, string>;
    idempotency_key?: string;
  };

  const correlationId = globalThis.crypto?.randomUUID?.() || `cot-${Date.now()}`;
  const idempotencyKey =
    payload.idempotency_key ||
    request.headers.get("idempotency-key") ||
    `cotizacion-${correlationId}`;

  const mapped = bookingPayloadFromWeb({
    trip: payload.trip || {},
    vehiculo: payload.vehiculo,
    conductor: payload.conductor,
    correlationId,
    externalReference: `WEB-QUOTE-${correlationId.slice(0, 8)}`,
  });

  if (!mapped.customer?.document_number && !mapped.customer?.email) {
    return NextResponse.json(
      { ok: false, code: "missing_identity", detail: "Documento o correo del conductor requerido." },
      { status: 400 },
    );
  }

  const result = await hub360Fetch<Record<string, unknown>>(channelPath("/quotes/"), {
    method: "POST",
    body: mapped,
    idempotencyKey,
    correlationId,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        code: result.code,
        detail: result.detail,
        correlation_id: result.correlationId,
      },
      { status: result.status },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      quote: result.data,
      correlation_id: result.correlationId,
    },
    { status: 201 },
  );
}

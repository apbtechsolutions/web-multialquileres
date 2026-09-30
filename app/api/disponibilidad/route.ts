import { NextResponse } from "next/server";
import { bookingPayloadFromWeb } from "@/lib/hub360/booking";
import { channelPath, hub360Fetch } from "@/lib/hub360/client";
import { hub360Config } from "@/lib/hub360/config";

/**
 * Disponibilidad + precio oficial vía APBHUB360.
 * Body: { trip, vehiculo?: { slug, id } }
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  if (!hub360Config().configured) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const trip = (body as { trip?: Record<string, string> }).trip || {};
  const vehiculo = (body as { vehiculo?: { slug?: string; id?: number | string } }).vehiculo;
  const mapped = bookingPayloadFromWeb({ trip, vehiculo });

  if (!mapped.start_datetime || !mapped.end_datetime) {
    return NextResponse.json(
      { ok: false, code: "missing_dates", detail: "Faltan fechas de entrega o devolución." },
      { status: 400 },
    );
  }
  if (!mapped.slug && mapped.legacy_catalog_id == null) {
    return NextResponse.json(
      { ok: false, code: "missing_vehicle", detail: "Falta el vehículo." },
      { status: 400 },
    );
  }

  const result = await hub360Fetch<{
    available: boolean;
    vehicle_id: string;
    pricing: Record<string, unknown> | null;
    correlation_id?: string;
  }>(channelPath("/availability/search/"), {
    method: "POST",
    body: {
      pickup_branch_code: mapped.pickup_branch_code,
      return_branch_code: mapped.return_branch_code,
      start_datetime: mapped.start_datetime,
      end_datetime: mapped.end_datetime,
      slug: mapped.slug,
      legacy_catalog_id: mapped.legacy_catalog_id,
      extra_codes: [],
    },
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

  return NextResponse.json({
    ok: true,
    available: result.data.available,
    vehicle_id: result.data.vehicle_id,
    pricing: result.data.pricing,
    correlation_id: result.correlationId,
  });
}

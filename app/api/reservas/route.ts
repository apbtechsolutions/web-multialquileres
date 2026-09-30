import { NextResponse } from "next/server";

/**
 * Recibe la reserva del sitio. No llama a APBHUB360 hasta que existan
 * APBHUB360_API_URL, APBHUB360_API_TOKEN y el contrato del endpoint.
 * No confirma disponibilidad ni cobra.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  const base = process.env.APBHUB360_API_URL;
  const token = process.env.APBHUB360_API_TOKEN;
  const path = process.env.APBHUB360_BOOKING_PATH;

  if (!base || !token || !path) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  return NextResponse.json({ ok: false, code: "contract_missing" }, { status: 501 });
}

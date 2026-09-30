import { branchCodeFromSlug } from "@/lib/hub360/config";

/** Panama wall-clock → ISO-8601 con offset fijo -05:00 (sin DST). */
export function panamaDateTimeIso(date: string, time: string) {
  const day = (date || "").trim();
  const clock = (time || "09:00").trim() || "09:00";
  if (!day) return "";
  const normalizedClock = clock.length === 5 ? `${clock}:00` : clock;
  return `${day}T${normalizedClock}-05:00`;
}

export function mapDocumentType(label: string) {
  const value = (label || "").trim().toLowerCase();
  if (value.includes("pasaporte") || value === "passport") return "PASSPORT";
  if (value.includes("ruc")) return "RUC";
  return "CC";
}

export type WebTrip = {
  entrega?: string;
  devolucion?: string;
  desde?: string;
  hasta?: string;
  horaDesde?: string;
  horaHasta?: string;
  vehiculo?: string;
};

export type WebConductor = {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  documentoTipo?: string;
  documento?: string;
  licencia?: string;
  licenciaEmision?: string;
  licenciaVencimiento?: string;
};

export function bookingPayloadFromWeb(input: {
  trip: WebTrip;
  vehiculo?: { slug?: string; name?: string; id?: number | string } | null;
  conductor?: WebConductor | null;
  externalReference?: string;
  correlationId?: string;
}) {
  const trip = input.trip || {};
  const conductor = input.conductor || {};
  const vehicle = input.vehiculo || {};
  const slug = String(vehicle.slug || trip.vehiculo || "").trim();
  const legacy =
    vehicle.id != null && String(vehicle.id).trim() !== "" ? Number(vehicle.id) : undefined;

  return {
    pickup_branch_code: branchCodeFromSlug(String(trip.entrega || "")),
    return_branch_code: branchCodeFromSlug(String(trip.devolucion || trip.entrega || "")),
    start_datetime: panamaDateTimeIso(String(trip.desde || ""), String(trip.horaDesde || "09:00")),
    end_datetime: panamaDateTimeIso(String(trip.hasta || ""), String(trip.horaHasta || "09:00")),
    slug: slug || undefined,
    legacy_catalog_id: Number.isFinite(legacy) ? legacy : undefined,
    origin_channel: "WEB",
    origin_source: "MULTIALQUILERES_WEBSITE",
    external_reference: input.externalReference || undefined,
    correlation_id: input.correlationId || undefined,
    customer: {
      first_name: String(conductor.nombre || "").trim(),
      last_name: String(conductor.apellido || "").trim(),
      email: String(conductor.email || "").trim().toLowerCase(),
      phone: String(conductor.telefono || "").trim(),
      document_type: mapDocumentType(String(conductor.documentoTipo || "")),
      document_number: String(conductor.documento || "").trim(),
      license_number: String(conductor.licencia || "").trim(),
    },
  };
}

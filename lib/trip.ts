export type TripQuery = {
  entrega: string;
  devolucion: string;
  desde: string;
  hasta: string;
  horaDesde: string;
  horaHasta: string;
  vehiculo: string;
};

export function readTrip(source: Record<string, string | string[] | undefined>): TripQuery {
  const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] || "" : value || "");
  const entrega = one(source.entrega);
  return {
    entrega,
    devolucion: one(source.devolucion) || entrega,
    desde: one(source.desde),
    hasta: one(source.hasta),
    horaDesde: one(source.horaDesde) || "09:00",
    horaHasta: one(source.horaHasta) || "09:00",
    vehiculo: one(source.vehiculo),
  };
}

export function tripSearchParams(trip: TripQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(trip)) {
    if (value) params.set(key, value);
  }
  return params;
}

/** Días de alquiler entre dos fechas de calendario. El mismo día cuenta como 1. */
export function rentalDays(desde: string, hasta: string) {
  if (!desde || !hasta) return null;
  const start = new Date(`${desde}T00:00:00`);
  const end = new Date(`${hasta}T00:00:00`);
  const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  if (Number.isNaN(diff) || diff < 0) return null;
  return Math.max(diff, 1);
}

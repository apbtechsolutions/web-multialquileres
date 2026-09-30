"use client";

import { useEffect, useMemo, useState } from "react";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { branches } from "@/data/branches";
import { tripSearchParams, type TripQuery } from "@/lib/trip";
import type { Vehicle } from "@/types/content";

type AvailState = "unknown" | "checking" | "available" | "unavailable" | "offline";

async function mapPool<T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()));
  return results;
}

export function SearchResults({ trip, vehicles }: { trip: TripQuery; vehicles: Vehicle[] }) {
  const [category, setCategory] = useState("todas");
  const [passengers, setPassengers] = useState("0");
  const [sort, setSort] = useState("precio");
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [availability, setAvailability] = useState<Record<string, AvailState>>({});
  const [hubStatus, setHubStatus] = useState<"idle" | "checking" | "ready" | "offline">("idle");

  const categories = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.category))].sort(),
    [vehicles],
  );

  const canCheckHub = Boolean(trip.entrega && trip.desde && trip.hasta);

  useEffect(() => {
    if (!canCheckHub) {
      setAvailability({});
      setHubStatus("idle");
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setHubStatus("checking");
      setAvailability((current) => {
        const next: Record<string, AvailState> = {};
        for (const vehicle of vehicles) next[vehicle.slug] = "checking";
        return { ...current, ...next };
      });
      try {
        const outcomes = await mapPool(vehicles, 4, async (vehicle) => {
          try {
            const response = await fetch("/api/disponibilidad/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                trip,
                vehiculo: { slug: vehicle.slug, id: vehicle.id, name: vehicle.name },
              }),
            });
            const data = await response.json().catch(() => null);
            if (response.status === 503) return { slug: vehicle.slug, state: "offline" as const };
            if (!response.ok || !data?.ok) return { slug: vehicle.slug, state: "unavailable" as const };
            return {
              slug: vehicle.slug,
              state: (data.available ? "available" : "unavailable") as AvailState,
            };
          } catch {
            return { slug: vehicle.slug, state: "offline" as const };
          }
        });
        if (cancelled) return;
        const map: Record<string, AvailState> = {};
        let anyOffline = false;
        for (const item of outcomes) {
          map[item.slug] = item.state;
          if (item.state === "offline") anyOffline = true;
        }
        setAvailability(map);
        setHubStatus(anyOffline ? "offline" : "ready");
      } catch {
        if (!cancelled) setHubStatus("offline");
      }
    }, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [canCheckHub, trip, vehicles]);

  const visible = useMemo(() => {
    const minPassengers = Number(passengers);
    const list = vehicles.filter((vehicle) => {
      if (category !== "todas" && vehicle.category !== category) return false;
      if (minPassengers && (vehicle.passengers ?? 0) < minPassengers) return false;
      if (onlyAvailable && canCheckHub && hubStatus === "ready") {
        const state = availability[vehicle.slug];
        if (state === "unavailable") return false;
      }
      return true;
    });
    return list.sort((a, b) => {
      if (sort === "nombre") return a.name.localeCompare(b.name, "es");
      return (a.fromPrice ?? Number.MAX_VALUE) - (b.fromPrice ?? Number.MAX_VALUE);
    });
  }, [vehicles, category, passengers, sort, onlyAvailable, canCheckHub, hubStatus, availability]);

  const pickup = branches.find((branch) => branch.slug === trip.entrega);
  const dropoff = branches.find((branch) => branch.slug === trip.devolucion);
  const params = tripSearchParams({ ...trip, vehiculo: "" }).toString();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="rounded-2xl bg-surface px-4 py-3 text-sm">
        <span className="block">
          <span className="font-semibold">Entrega: </span>
          {pickup ? pickup.name : "Elige el lugar de entrega"}
          {trip.desde ? ` · ${trip.desde} ${trip.horaDesde}` : " · elige la fecha y la hora"}
        </span>
        <span className="mt-1 block">
          <span className="font-semibold">Devolución: </span>
          {dropoff ? dropoff.name : "Elige el lugar de devolución"}
          {trip.hasta ? ` · ${trip.hasta} ${trip.horaHasta}` : " · elige la fecha y la hora"}
        </span>
        <span className="mt-2 block text-muted">
          {hubStatus === "ready"
            ? "Disponibilidad consultada en APBHUB360 para estas fechas. La tarifa de ficha sigue siendo referencia de catálogo."
            : hubStatus === "checking"
              ? "Consultando disponibilidad en APBHUB360…"
              : hubStatus === "offline"
                ? "No pudimos consultar disponibilidad en vivo; se muestra el catálogo publicado."
                : "La tarifa de cada ficha es la diaria de referencia del catálogo. El total depende de las fechas, los lugares y los servicios de la reserva."}
        </span>
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <label className="grid gap-1 text-sm font-medium">
          Categoría
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-line px-3 py-2">
            <option value="todas">Todas</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Pasajeros
          <select value={passengers} onChange={(event) => setPassengers(event.target.value)} className="rounded-lg border border-line px-3 py-2">
            <option value="0">Cualquiera</option>
            <option value="5">5 o más</option>
            <option value="7">7 o más</option>
            <option value="11">11 o más</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Ordenar
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-line px-3 py-2">
            <option value="precio">Tarifa de referencia</option>
            <option value="nombre">Nombre</option>
          </select>
        </label>
        <label className="flex items-end gap-2 pb-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(event) => setOnlyAvailable(event.target.checked)}
            disabled={!canCheckHub || hubStatus === "offline"}
          />
          Solo disponibles
        </label>
      </div>
      <p className="mt-6 text-sm font-medium">
        {visible.length} modelos
        {hubStatus === "ready" && onlyAvailable ? " disponibles" : " del catálogo publicado"}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((vehicle) => {
          const state = availability[vehicle.slug] || "unknown";
          return (
            <div key={vehicle.slug} className="relative">
              {canCheckHub && hubStatus !== "idle" ? (
                <p
                  className={`absolute right-3 top-3 z-10 rounded-full px-2 py-1 text-xs font-semibold ${
                    state === "available"
                      ? "bg-emerald-100 text-emerald-800"
                      : state === "unavailable"
                        ? "bg-red-100 text-red-800"
                        : "bg-surface text-muted"
                  }`}
                >
                  {state === "available"
                    ? "Disponible"
                    : state === "unavailable"
                      ? "No disponible"
                      : state === "checking"
                        ? "Consultando…"
                        : state === "offline"
                          ? "Sin consulta"
                          : ""}
                </p>
              ) : null}
              <VehicleCard
                vehicle={vehicle}
                quoteHref={`/es/cotizar/?${params ? `${params}&` : ""}vehiculo=${vehicle.slug}`}
                reserveHref={`/es/reservar/?${params ? `${params}&` : ""}vehiculo=${vehicle.slug}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

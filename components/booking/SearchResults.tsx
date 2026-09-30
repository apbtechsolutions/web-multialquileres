"use client";

import { useMemo, useState } from "react";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { branches } from "@/data/branches";
import { tripSearchParams, type TripQuery } from "@/lib/trip";
import type { Vehicle } from "@/types/content";

export function SearchResults({ trip, vehicles }: { trip: TripQuery; vehicles: Vehicle[] }) {
  const [category, setCategory] = useState("todas");
  const [passengers, setPassengers] = useState("0");
  const [sort, setSort] = useState("precio");

  const categories = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.category))].sort(),
    [vehicles],
  );

  const visible = useMemo(() => {
    const minPassengers = Number(passengers);
    const list = vehicles.filter((vehicle) => {
      if (category !== "todas" && vehicle.category !== category) return false;
      if (minPassengers && (vehicle.passengers ?? 0) < minPassengers) return false;
      return true;
    });
    return list.sort((a, b) => {
      if (sort === "nombre") return a.name.localeCompare(b.name, "es");
      return (a.fromPrice ?? Number.MAX_VALUE) - (b.fromPrice ?? Number.MAX_VALUE);
    });
  }, [vehicles, category, passengers, sort]);

  const pickup = branches.find((branch) => branch.slug === trip.entrega);
  const dropoff = branches.find((branch) => branch.slug === trip.devolucion);
  const params = tripSearchParams({ ...trip, vehiculo: "" }).toString();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="rounded-2xl bg-surface px-4 py-3 text-sm text-muted">
        {pickup ? pickup.name : "Lugar de entrega no indicado"}
        {trip.desde ? ` · ${trip.desde} ${trip.horaDesde}` : ""}
        {" → "}
        {dropoff ? dropoff.name : "Mismo lugar"}
        {trip.hasta ? ` · ${trip.hasta} ${trip.horaHasta}` : ""}
        . La tarifa que ves es la diaria de referencia del catálogo publicado. La tarifa del periodo, los cargos de lugar, los extras y el ITBMS los calcula APBHUB360 y todavía no están conectados.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
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
      </div>
      <p className="mt-6 text-sm font-medium">{visible.length} modelos del catálogo publicado</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((vehicle) => (
          <VehicleCard
            key={vehicle.slug}
            vehicle={vehicle}
            quoteHref={`/es/cotizar/?${params ? `${params}&` : ""}vehiculo=${vehicle.slug}`}
            reserveHref={`/es/reservar/?${params ? `${params}&` : ""}vehiculo=${vehicle.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

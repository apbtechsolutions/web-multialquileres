"use client";

import { useMemo, useState } from "react";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { fleet } from "@/lib/fleet";

export function FleetExplorer() {
  const [category, setCategory] = useState("todas");
  const [transmission, setTransmission] = useState("todas");
  const [fuel, setFuel] = useState("todos");
  const [passengers, setPassengers] = useState("0");

  const vehicles = useMemo(() => {
    return fleet
      .flatMap((item) => item.vehicles)
      .filter((vehicle) => (category === "todas" ? true : vehicle.categorySlug === category))
      .filter((vehicle) => {
        if (transmission === "todas") return true;
        if (transmission === "sin-dato") return !vehicle.transmission;
        return vehicle.transmission === transmission;
      })
      .filter((vehicle) => (fuel === "todos" ? true : vehicle.fuel === fuel))
      .filter((vehicle) => (vehicle.passengers ?? 0) >= Number(passengers));
  }, [category, transmission, fuel, passengers]);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <form className="grid gap-4 rounded-2xl border border-line bg-white p-4 h-fit" aria-label="Filtrar vehículos">
        <label className="grid gap-1 text-sm font-medium">
          Categoría
          <select className="rounded-lg border border-line px-3 py-2" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="todas">Todas</option>
            {fleet.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Transmisión
          <select className="rounded-lg border border-line px-3 py-2" value={transmission} onChange={(event) => setTransmission(event.target.value)}>
            <option value="todas">Todas</option>
            <option value="Automática">Automática</option>
            <option value="Manual">Manual</option>
            <option value="Automática 4x4">Automática 4x4</option>
            <option value="sin-dato">No indicada</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Combustible
          <select className="rounded-lg border border-line px-3 py-2" value={fuel} onChange={(event) => setFuel(event.target.value)}>
            <option value="todos">Todos</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diésel">Diésel</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Pasajeros mínimos
          <select className="rounded-lg border border-line px-3 py-2" value={passengers} onChange={(event) => setPassengers(event.target.value)}>
            <option value="0">Cualquiera</option>
            <option value="5">5 o más</option>
            <option value="7">7 o más</option>
          </select>
        </label>
        <p className="text-sm text-muted">{vehicles.length} modelos en el catálogo publicado</p>
      </form>
      <div className="grid gap-4 sm:grid-cols-2">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}

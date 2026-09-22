"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { branches } from "@/data/branches";

export function SearchWidget() {
  const router = useRouter();
  const [differentReturn, setDifferentReturn] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      if (typeof value === "string" && value) params.set(key, value);
    }
    router.push(`/es/cotizar/?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl bg-white p-4 text-ink shadow-xl sm:p-5">
      <p className="text-sm font-semibold text-brand-dark">Cotiza sin crear una reserva todavía</p>
      <label className="grid gap-1 text-sm font-medium">
        Lugar de entrega
        <select name="entrega" required className="rounded-lg border border-line px-3 py-2" defaultValue="oficina-via-veneto">
          {branches.map((branch) => (
            <option key={branch.slug} value={branch.slug}>
              {branch.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="otroLugar"
          checked={differentReturn}
          onChange={(event) => setDifferentReturn(event.target.checked)}
        />
        Devolver en otro lugar
      </label>
      {differentReturn ? (
        <label className="grid gap-1 text-sm font-medium">
          Lugar de devolución
          <select name="devolucion" required className="rounded-lg border border-line px-3 py-2" defaultValue="aeropuerto-tocumen">
            {branches.map((branch) => (
              <option key={branch.slug} value={branch.slug}>
                {branch.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          Fecha de entrega
          <input name="desde" type="date" required className="rounded-lg border border-line px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Hora de entrega
          <input name="horaDesde" type="time" required defaultValue="09:00" className="rounded-lg border border-line px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Fecha de devolución
          <input name="hasta" type="date" required className="rounded-lg border border-line px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Hora de devolución
          <input name="horaHasta" type="time" required defaultValue="09:00" className="rounded-lg border border-line px-3 py-2" />
        </label>
      </div>
      <button type="submit" className="rounded-full bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark">
        Cotizar
      </button>
    </form>
  );
}

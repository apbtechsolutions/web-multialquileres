"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { branches } from "@/data/branches";

export function SearchWidget() {
  const router = useRouter();
  const [differentReturn, setDifferentReturn] = useState(false);

  function navigate(form: HTMLFormElement, action: "cotizar" | "reservar") {
    const data = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      if (typeof value === "string" && value) params.set(key, value);
    }
    const path = action === "reservar" ? "/es/buscar/" : "/es/cotizar/";
    router.push(`${path}?${params.toString()}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(event.currentTarget, "reservar");
  }

  return (
    <form action="/es/buscar/" method="get" onSubmit={onSubmit} className="grid gap-3 rounded-2xl bg-white p-4 text-ink shadow-xl sm:p-5">
      <p className="text-sm font-semibold text-brand-dark">Indica lugar y fechas</p>
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
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          className="rounded-full border border-brand px-4 py-3 font-semibold text-brand hover:bg-surface"
          onClick={(event) => {
            const form = event.currentTarget.form;
            if (form) navigate(form, "cotizar");
          }}
        >
          Cotizar
        </button>
        <button
          type="submit"
          className="rounded-full bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark"
          onClick={(event) => {
            event.preventDefault();
            const form = event.currentTarget.form;
            if (form) navigate(form, "reservar");
          }}
        >
          Reservar ahora
        </button>
      </div>
    </form>
  );
}

"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { branches } from "@/data/branches";
import { formatUsd, site } from "@/lib/site";
import { rentalDays, tripSearchParams, type TripQuery } from "@/lib/trip";
import type { Vehicle } from "@/types/content";

const documents = ["Cédula", "Pasaporte"];

export function CheckoutForm({ trip, vehicle }: { trip: TripQuery; vehicle: Vehicle | null }) {
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "blocked" | "sent">("idle");
  const [reserva, setReserva] = useState(trip);
  const days = rentalDays(reserva.desde, reserva.hasta);
  const pickup = branches.find((branch) => branch.slug === reserva.entrega);
  const dropoff = branches.find((branch) => branch.slug === reserva.devolucion);
  const reference = vehicle?.fromPrice != null && days ? vehicle.fromPrice * days : null;
  const back = `/es/buscar/?${tripSearchParams({ ...reserva, vehiculo: "" }).toString()}`;

  function setField(key: keyof TripQuery, value: string) {
    setReserva((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: TripQuery = {
      entrega: String(data.get("entrega") || ""),
      devolucion: String(data.get("devolucion") || ""),
      desde: String(data.get("desde") || ""),
      hasta: String(data.get("hasta") || ""),
      horaDesde: String(data.get("horaDesde") || ""),
      horaHasta: String(data.get("horaHasta") || ""),
      vehiculo: trip.vehiculo,
    };
    if (!next.entrega || !next.devolucion || !next.desde || !next.hasta || !next.horaDesde || !next.horaHasta) {
      setError("La reserva necesita lugar de entrega, lugar de devolución y las fechas con su hora.");
      return;
    }
    if (data.get("terminos") !== "on") {
      setError("Para reservar hay que aceptar los términos y la política de privacidad.");
      return;
    }
    if (next.hasta < next.desde) {
      setError("La fecha de devolución no puede ser anterior a la de entrega.");
      return;
    }
    setReserva(next);
    setError("");
    setStatus("pending");
    const response = await fetch("/api/reservas/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trip: next,
        vehiculo: vehicle ? { slug: vehicle.slug, name: vehicle.name } : null,
        conductor: {
          nombre: String(data.get("nombre") || ""),
          apellido: String(data.get("apellido") || ""),
          email: String(data.get("email") || ""),
          telefono: String(data.get("telefono") || ""),
          documentoTipo: String(data.get("documentoTipo") || ""),
          documento: String(data.get("documento") || ""),
          licencia: String(data.get("licencia") || ""),
          licenciaEmision: String(data.get("licenciaEmision") || ""),
          licenciaVencimiento: String(data.get("licenciaVencimiento") || ""),
          registrarme: data.get("registrarme") === "on",
        },
      }),
    });
    setStatus(response.ok ? "sent" : "blocked");
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-white p-5">
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <Link href={back} className="text-brand hover:underline">
            Elegir otro auto
          </Link>
          <Link href={`/es/cotizar/?${tripSearchParams(trip)}`} className="text-brand hover:underline">
            Enviar esta selección a cotizar
          </Link>
        </div>
        <h2 className="text-xl font-semibold text-brand-dark">Entrega y devolución</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <PlaceField label="Lugar de entrega" name="entrega" value={reserva.entrega} onChange={(value) => setField("entrega", value)} />
          <PlaceField label="Lugar de devolución" name="devolucion" value={reserva.devolucion} onChange={(value) => setField("devolucion", value)} />
          <Field label="Fecha de entrega" name="desde" type="date" required value={reserva.desde} onChange={(value) => setField("desde", value)} />
          <Field label="Hora de entrega" name="horaDesde" type="time" required value={reserva.horaDesde || "09:00"} onChange={(value) => setField("horaDesde", value)} />
          <Field label="Fecha de devolución" name="hasta" type="date" required value={reserva.hasta} onChange={(value) => setField("hasta", value)} />
          <Field label="Hora de devolución" name="horaHasta" type="time" required value={reserva.horaHasta || "09:00"} onChange={(value) => setField("horaHasta", value)} />
        </div>
        <h2 className="text-xl font-semibold text-brand-dark">Datos del conductor</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre" name="nombre" required autoComplete="given-name" />
          <Field label="Apellido" name="apellido" required autoComplete="family-name" />
          <Field label="Correo" name="email" type="email" required autoComplete="email" />
          <Field label="Teléfono" name="telefono" type="tel" required autoComplete="tel" />
          <label className="grid gap-1 text-sm font-medium">
            Tipo de documento
            <select name="documentoTipo" required className="rounded-lg border border-line px-3 py-2" defaultValue="Cédula">
              {documents.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <Field label="Número de documento" name="documento" required />
          <Field label="Número de licencia" name="licencia" />
          <Field label="Emisión de la licencia" name="licenciaEmision" type="date" />
          <Field label="Vencimiento de la licencia" name="licenciaVencimiento" type="date" />
        </div>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="registrarme" className="mt-1" />
          Registrarme para consultar mis reservas.
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="terminos" required className="mt-1" />
          <span>
            Leí y acepto los{" "}
            <Link href="/es/terminos-y-condiciones/" className="text-brand hover:underline">
              términos y condiciones
            </Link>{" "}
            y la{" "}
            <Link href="/es/politica-de-privacidad/" className="text-brand hover:underline">
              política de privacidad
            </Link>
            .
          </span>
        </label>
        {error ? (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        {status === "sent" ? (
          <p role="status" className="rounded-xl bg-surface p-3 text-sm">
            Recibimos tu reserva. Te confirmaremos el número por correo o por WhatsApp.
          </p>
        ) : null}
        {status === "blocked" ? (
          <p role="status" className="rounded-xl bg-surface p-3 text-sm">
            No pudimos registrar la reserva en este momento. No se realizó ningún cobro. Escríbenos por WhatsApp y te confirmamos la disponibilidad.
          </p>
        ) : null}
        <button type="submit" className="rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark" disabled={status === "pending"}>
          {status === "pending" ? "Enviando…" : "Reservar ahora"}
        </button>
        <p className="text-xs text-muted">Si necesitas ayuda con esta reserva, escríbenos por WhatsApp al {site.phone}.</p>
      </form>
      <aside className="h-fit rounded-2xl border border-line bg-white p-5">
        <h2 className="text-lg font-semibold text-brand-dark">Tu reserva</h2>
        <p className="mt-2 font-medium">{vehicle ? vehicle.name : "Modelo por elegir"}</p>
        {vehicle ? <p className="text-sm text-muted">{vehicle.category}</p> : null}
        <dl className="mt-4 grid gap-3 text-sm">
          <div>
            <dt className="font-semibold">Entrega</dt>
            <dd>{pickup ? pickup.name : "Elige el lugar de entrega"}</dd>
            <dd className="text-muted">{reserva.desde ? `${reserva.desde} ${reserva.horaDesde}` : "Elige la fecha y la hora"}</dd>
          </div>
          <div>
            <dt className="font-semibold">Devolución</dt>
            <dd>{dropoff ? dropoff.name : "Elige el lugar de devolución"}</dd>
            <dd className="text-muted">{reserva.hasta ? `${reserva.hasta} ${reserva.horaHasta}` : "Elige la fecha y la hora"}</dd>
          </div>
        </dl>
        {days ? <p className="mt-3 text-sm">{days} {days === 1 ? "día" : "días"}</p> : null}
        <p className="mt-4 text-sm">
          {reference != null ? (
            <>
              Referencia de catálogo: <span className="font-semibold">{formatUsd(reference)}</span>
              {vehicle?.fromPrice != null ? ` (${formatUsd(vehicle.fromPrice)} × ${days} ${days === 1 ? "día" : "días"})` : ""}.
            </>
          ) : (
            "Sin tarifa de referencia para este modelo."
          )}
        </p>
        {vehicle?.deposit != null ? (
          <p className="mt-1 text-sm text-muted">Depósito de referencia: {formatUsd(vehicle.deposit)}</p>
        ) : (
          <p className="mt-1 text-sm text-muted">Depósito: [REQUIERE INFORMACIÓN DEL CLIENTE]</p>
        )}
        <p className="mt-3 text-xs text-muted">{site.priceDisclaimer}</p>
      </aside>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        {...(onChange
          ? { value: value ?? "", onChange: (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value) }
          : {})}
        className="rounded-lg border border-line px-3 py-2"
      />
    </label>
  );
}

function PlaceField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <select name={name} required value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-line px-3 py-2">
        <option value="">Selecciona un lugar</option>
        {branches.map((branch) => (
          <option key={branch.slug} value={branch.slug}>
            {branch.name}
          </option>
        ))}
      </select>
    </label>
  );
}

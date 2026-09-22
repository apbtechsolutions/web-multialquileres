"use client";

import { FormEvent, useMemo, useState } from "react";
import { branches } from "@/data/branches";
import { getAllVehicles } from "@/lib/fleet";
import { site, whatsappHref } from "@/lib/site";

type RequestFormProps = {
  intent: "cotizacion" | "contacto" | "corporativo";
  defaultVehicle?: string;
  defaults?: Record<string, string>;
};

const consent =
  "Acepto que Grupo Cáceres procese mi información de contacto para responder esta solicitud. Puedo pedir acceso o eliminación de mis datos.";

export function RequestForm({ intent, defaultVehicle = "", defaults = {} }: RequestFormProps) {
  const vehicles = useMemo(() => getAllVehicles(), []);
  const [error, setError] = useState("");
  const [readyLink, setReadyLink] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const email = String(data.get("email") || "").trim();
    const telefono = String(data.get("telefono") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();
    const accepted = data.get("consentimiento") === "on";
    const desde = String(data.get("desde") || "");
    const hasta = String(data.get("hasta") || "");

    if (!accepted) {
      setError("Necesitamos tu autorización para usar los datos de esta solicitud.");
      setReadyLink("");
      return;
    }
    if (desde && hasta && hasta < desde) {
      setError("La fecha de devolución no puede ser anterior a la de entrega.");
      setReadyLink("");
      return;
    }

    const entrega = branches.find((branch) => branch.slug === String(data.get("entrega") || ""));
    const devolucion = branches.find((branch) => branch.slug === String(data.get("devolucion") || ""));
    const vehicle = vehicles.find((item) => item.slug === String(data.get("vehiculo") || ""));
    const empresa = String(data.get("empresa") || "").trim();
    const lines = [
      intent === "corporativo"
        ? "Solicitud de renta corporativa — Multialquileres Panamá"
        : intent === "contacto"
          ? "Mensaje de contacto — Multialquileres Panamá"
          : "Solicitud de cotización — Multialquileres Panamá",
      `Nombre: ${nombre}`,
      empresa ? `Empresa: ${empresa}` : "",
      `Correo: ${email}`,
      `Teléfono: ${telefono}`,
      vehicle ? `Vehículo de interés: ${vehicle.name}` : "",
      entrega ? `Entrega: ${entrega.name}` : "",
      devolucion ? `Devolución: ${devolucion.name}` : "",
      desde ? `Desde: ${desde} ${String(data.get("horaDesde") || "")}` : "",
      hasta ? `Hasta: ${hasta} ${String(data.get("horaHasta") || "")}` : "",
      mensaje ? `Mensaje: ${mensaje}` : "",
      "Esta solicitud no confirma disponibilidad ni cobra ningún monto.",
    ].filter(Boolean);

    setError("");
    setReadyLink(whatsappHref(lines.join("\n")));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-white p-5" noValidate={false}>
      {intent === "corporativo" ? (
        <Field label="Empresa" name="empresa" required />
      ) : null}
      <Field label="Nombre" name="nombre" required autoComplete="name" />
      <Field label="Correo" name="email" type="email" required autoComplete="email" />
      <Field label="Teléfono" name="telefono" type="tel" required autoComplete="tel" />
      {intent !== "contacto" ? (
        <label className="grid gap-1 text-sm font-medium">
          Vehículo
          <select name="vehiculo" defaultValue={defaultVehicle} className="rounded-lg border border-line px-3 py-2">
            <option value="">Sin modelo definido</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.slug} value={vehicle.slug}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {intent === "cotizacion" ? (
        <>
          <PlaceSelect label="Lugar de entrega" name="entrega" defaultValue={defaults.entrega || "oficina-via-veneto"} />
          <PlaceSelect label="Lugar de devolución" name="devolucion" defaultValue={defaults.devolucion || defaults.entrega || "oficina-via-veneto"} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Fecha de entrega" name="desde" type="date" required defaultValue={defaults.desde} />
            <Field label="Hora de entrega" name="horaDesde" type="time" required defaultValue={defaults.horaDesde || "09:00"} />
            <Field label="Fecha de devolución" name="hasta" type="date" required defaultValue={defaults.hasta} />
            <Field label="Hora de devolución" name="horaHasta" type="time" required defaultValue={defaults.horaHasta || "09:00"} />
          </div>
        </>
      ) : null}
      <label className="grid gap-1 text-sm font-medium">
        Mensaje
        <textarea name="mensaje" rows={4} className="rounded-lg border border-line px-3 py-2" />
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input name="consentimiento" type="checkbox" required className="mt-1" />
        <span>{consent}</span>
      </label>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
      <button type="submit" className="rounded-full bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark">
        Preparar mensaje de WhatsApp
      </button>
      <p className="text-xs text-muted">
        El formulario no envía los datos a un servidor. Arma un mensaje para el WhatsApp publicado ({site.phone}). La empresa confirma disponibilidad y tarifa.
      </p>
      {readyLink ? (
        <a href={readyLink} className="rounded-full bg-[#128C7E] px-4 py-3 text-center font-semibold text-white" target="_blank" rel="noopener noreferrer">
          Abrir WhatsApp con la solicitud
        </a>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="rounded-lg border border-line px-3 py-2"
      />
    </label>
  );
}

function PlaceSelect({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <select name={name} defaultValue={defaultValue} className="rounded-lg border border-line px-3 py-2">
        {branches.map((branch) => (
          <option key={branch.slug} value={branch.slug}>
            {branch.name}
          </option>
        ))}
      </select>
    </label>
  );
}

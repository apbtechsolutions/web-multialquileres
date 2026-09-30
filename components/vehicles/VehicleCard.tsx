import Link from "next/link";
import { formatUsd, site } from "@/lib/site";
import { vehiclePath } from "@/lib/fleet";
import type { Vehicle } from "@/types/content";

function countLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function VehicleCard({
  vehicle,
  quoteHref = `/es/cotizar/?vehiculo=${vehicle.slug}`,
  reserveHref = `/es/reservar/?vehiculo=${vehicle.slug}`,
}: {
  vehicle: Vehicle;
  quoteHref?: string;
  reserveHref?: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <Link href={vehiclePath(vehicle)} className="block bg-surface" aria-label={`Ver ${vehicle.name}`}>
        <div className="relative aspect-[4/3]">
          {vehicle.image ? (
            // Remote catalog photos are already compressed on the client's CDN.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vehicle.image}
              alt={`${vehicle.name}, ${vehicle.category} del catálogo de Multialquileres Panamá`}
              width={800}
              height={600}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted">
              Foto no publicada para {vehicle.name}
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-brand uppercase">{vehicle.category}</p>
          <h3 className="text-lg font-semibold text-brand-dark">
            <Link href={vehiclePath(vehicle)} className="hover:underline">
              {vehicle.name}
            </Link>
          </h3>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm text-muted">
          <li>{vehicle.passengers ? countLabel(vehicle.passengers, "pasajero", "pasajeros") : "Pasajeros no indicados"}</li>
          <li>{vehicle.transmission ?? "Transmisión no indicada"}</li>
          <li>{vehicle.fuel ?? "Combustible no indicado"}</li>
          <li>{vehicle.airConditioner ? "Aire acondicionado" : "Aire no indicado"}</li>
          <li>{vehicle.bigLuggage != null ? countLabel(vehicle.bigLuggage, "maleta grande", "maletas grandes") : "Maletas no indicadas"}</li>
          <li>{vehicle.smallLuggage != null ? countLabel(vehicle.smallLuggage, "maleta pequeña", "maletas pequeñas") : ""}</li>
        </ul>
        <p className="text-sm">
          {vehicle.fromPrice != null ? (
            <>
              <span className="font-semibold text-ink">Desde {formatUsd(vehicle.fromPrice)}</span> por día
            </>
          ) : (
            "Tarifa no publicada"
          )}
        </p>
        {vehicle.deposit != null ? (
          <p className="text-sm text-muted">Depósito de referencia: {formatUsd(vehicle.deposit)}</p>
        ) : (
          <p className="text-sm text-muted">Depósito: [REQUIERE INFORMACIÓN DEL CLIENTE]</p>
        )}
        <p className="text-xs text-muted">{site.priceDisclaimer}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Link href={vehiclePath(vehicle)} className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-surface">
            Ver ficha
          </Link>
          <Link href={quoteHref} className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-surface">
            Cotizar
          </Link>
          <Link href={reserveHref} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
            Reservar ahora
          </Link>
        </div>
      </div>
    </article>
  );
}

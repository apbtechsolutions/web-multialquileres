import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { fleet, getRelated, getVehicle, vehiclePath } from "@/lib/fleet";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { absoluteUrl, formatUsd, site } from "@/lib/site";
import type { Vehicle } from "@/types/content";

type Params = { categoria: string; slug: string };

export function generateStaticParams() {
  return fleet.flatMap((category) =>
    category.vehicles.map((vehicle) => ({ categoria: category.slug, slug: vehicle.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { categoria, slug } = await params;
  const vehicle = getVehicle(categoria, slug);
  if (!vehicle) return {};
  const price = vehicle.fromPrice != null ? ` Tarifa de referencia desde ${formatUsd(vehicle.fromPrice)} por día.` : "";
  return pageMetadata({
    title: `Alquiler de ${vehicle.name} en Panamá | Multialquileres`,
    description: `${vehicle.name} está en la categoría ${vehicle.category} del catálogo de Multialquileres Panamá.${price}`,
    path: vehiclePath(vehicle),
    ogImage: vehicle.image || site.ogImage,
  });
}

function carJsonLd(vehicle: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: vehicle.name,
    brand: { "@type": "Brand", name: vehicle.brand },
    model: vehicle.model,
    vehicleConfiguration: vehicle.category,
    ...(vehicle.passengers ? { vehicleSeatingCapacity: vehicle.passengers } : {}),
    ...(vehicle.fuel ? { fuelType: vehicle.fuel } : {}),
    ...(vehicle.image ? { image: vehicle.image } : {}),
    url: absoluteUrl(vehiclePath(vehicle)),
    ...(vehicle.fromPrice != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: vehicle.fromPrice,
            url: absoluteUrl(`/es/cotizar/?vehiculo=${vehicle.slug}`),
            description: site.priceDisclaimer,
            seller: { "@id": `${site.url}/#organization` },
          },
        }
      : {}),
  };
}

export default async function VehiclePage({ params }: { params: Promise<Params> }) {
  const { categoria, slug } = await params;
  const vehicle = getVehicle(categoria, slug);
  if (!vehicle) notFound();
  const related = getRelated(vehicle);
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Vehículos", path: "/es/vehiculos/" },
    { name: vehicle.category, path: `/es/vehiculos/${vehicle.categorySlug}/` },
    { name: vehicle.name, path: vehiclePath(vehicle) },
  ];
  const facts = [
    ["Categoría", vehicle.category],
    ["Pasajeros", vehicle.passengers ? String(vehicle.passengers) : "No indicado"],
    ["Puertas", vehicle.doors ? String(vehicle.doors) : "No indicado"],
    ["Transmisión", vehicle.transmission ?? "No indicada"],
    ["Combustible", vehicle.fuel ?? "No indicado"],
    ["Aire acondicionado", vehicle.airConditioner ? "Sí" : "No indicado"],
    ["Maletas grandes", vehicle.bigLuggage != null ? String(vehicle.bigLuggage) : "No indicado"],
    ["Maletas pequeñas", vehicle.smallLuggage != null ? String(vehicle.smallLuggage) : "No indicado"],
    ["Tarifa diaria de referencia", vehicle.fromPrice != null ? `Desde ${formatUsd(vehicle.fromPrice)}` : "No publicada"],
    ["Depósito de referencia", vehicle.deposit != null ? formatUsd(vehicle.deposit) : "[REQUIERE INFORMACIÓN DEL CLIENTE]"],
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={carJsonLd(vehicle)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow={vehicle.category}
        title={`Alquiler de ${vehicle.name}`}
        intro={`${vehicle.name} forma parte de la categoría ${vehicle.category} publicada por Multialquileres Panamá. ${vehicle.passengers ? `El catálogo indica ${vehicle.passengers} pasajeros.` : ""} ${vehicle.fromPrice != null ? `La tarifa diaria de referencia parte de ${formatUsd(vehicle.fromPrice)}.` : ""} ${site.priceDisclaimer}`}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl bg-surface">
          {vehicle.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vehicle.image}
              alt={`${vehicle.name} publicado en el catálogo de Multialquileres Panamá`}
              width={960}
              height={640}
              className="h-auto w-full object-contain"
            />
          ) : (
            <p className="p-10 text-center text-muted">Este modelo no tiene foto utilizable en el catálogo publicado.</p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-brand-dark">Datos publicados</h2>
          <dl className="mt-4 divide-y divide-line">
            {facts.map(([label, value]) => (
              <div key={label} className="grid grid-cols-2 gap-3 py-3 text-sm">
                <dt className="font-medium">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={`/es/cotizar/?vehiculo=${vehicle.slug}`}
            className="mt-4 inline-flex rounded-full bg-brand px-5 py-3 font-semibold text-white"
          >
            Solicitar cotización de este modelo
          </Link>
        </div>
      </div>
      {related.length ? (
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <h2 className="text-2xl font-semibold text-brand-dark">Otros {vehicle.category} del catálogo</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <VehicleCard key={item.slug} vehicle={item} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

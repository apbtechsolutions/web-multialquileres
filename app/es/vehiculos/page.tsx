import { FleetExplorer } from "@/components/vehicles/FleetExplorer";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllVehicles } from "@/lib/fleet";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { formatUsd } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Catálogo de autos en alquiler en Panamá | Multialquileres",
  description:
    "Consulta los modelos publicados por Multialquileres Panamá: SUV, hatchback, sedán, pickup y busito, con tarifa diaria de referencia.",
  path: "/es/vehiculos/",
});

export default function VehiclesPage() {
  const vehicles = getAllVehicles();
  const prices = vehicles.map((item) => item.fromPrice).filter((price): price is number => price != null);
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Vehículos", path: "/es/vehiculos/" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Flota"
        title="Autos publicados para alquilar en Panamá"
        intro={`El catálogo reúne ${vehicles.length} modelos en cinco categorías. Las tarifas de referencia van de ${formatUsd(Math.min(...prices))} a ${formatUsd(Math.max(...prices))} por día. Filtra por categoría, transmisión, combustible o pasajeros y pide la cotización del modelo que te interese.`}
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <FleetExplorer />
      </div>
    </>
  );
}

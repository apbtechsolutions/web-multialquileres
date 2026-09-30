import { SearchResults } from "@/components/booking/SearchResults";
import { SearchWidget } from "@/components/home/SearchWidget";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllVehicles } from "@/lib/fleet";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { readTrip } from "@/lib/trip";

export const metadata = pageMetadata({
  title: "Autos disponibles para reservar | Multialquileres",
  description:
    "Elige un auto de Multialquileres Panamá con lugar de entrega, lugar de devolución y fechas de la reserva.",
  path: "/es/buscar/",
});

type Search = Record<string, string | string[] | undefined>;

export default async function SearchPage({ searchParams }: { searchParams: Promise<Search> }) {
  const trip = readTrip(await searchParams);
  const ready = Boolean(trip.entrega && trip.devolucion && trip.desde && trip.hasta);
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Buscar", path: "/es/buscar/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Reserva"
        title="Elige el auto para estas fechas"
        intro="Indica el lugar de entrega, el lugar de devolución y las fechas. Con esos datos eliges el auto de la reserva."
      />
      {ready ? <SearchResults trip={trip} vehicles={getAllVehicles()} /> : (
        <div className="mx-auto max-w-xl px-4 py-10">
          <SearchWidget defaults={trip} />
        </div>
      )}
    </>
  );
}

import { SearchResults } from "@/components/booking/SearchResults";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllVehicles } from "@/lib/fleet";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { readTrip } from "@/lib/trip";

export const metadata = pageMetadata({
  title: "Autos disponibles para reservar | Multialquileres",
  description:
    "Elige un modelo del catálogo publicado de Multialquileres Panamá para continuar la reserva. La tarifa del periodo la confirma APBHUB360.",
  path: "/es/buscar/",
});

type Search = Record<string, string | string[] | undefined>;

export default async function SearchPage({ searchParams }: { searchParams: Promise<Search> }) {
  const trip = readTrip(await searchParams);
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
        intro="Estos son los modelos del catálogo publicado. Reservar ahora abre el checkout con el lugar y las fechas que indicaste. La disponibilidad y la tarifa del periodo salen de APBHUB360 cuando esa conexión esté activa."
      />
      <SearchResults trip={trip} vehicles={getAllVehicles()} />
    </>
  );
}

import { CheckoutForm } from "@/components/booking/CheckoutForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllVehicles } from "@/lib/fleet";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { readTrip } from "@/lib/trip";

export const metadata = pageMetadata({
  title: "Detalle de la reserva | Multialquileres",
  description:
    "Completa los datos del conductor para reservar un auto en Multialquileres Panamá. La reserva se registra en APBHUB360 cuando el motor está conectado.",
  path: "/es/reservar/",
});

type Search = Record<string, string | string[] | undefined>;

export default async function ReservePage({ searchParams }: { searchParams: Promise<Search> }) {
  const trip = readTrip(await searchParams);
  const vehicle = getAllVehicles().find((item) => item.slug === trip.vehiculo) ?? null;
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Buscar", path: "/es/buscar/" },
    { name: "Reservar", path: "/es/reservar/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Checkout"
        title="Detalle de tu reserva"
        intro="Revisa el modelo, el lugar y las fechas. Al reservar, el sitio intenta registrar la solicitud en APBHUB360. Si el motor no está conectado, no se crea la reserva ni se cobra."
      />
      <CheckoutForm trip={trip} vehicle={vehicle} />
    </>
  );
}

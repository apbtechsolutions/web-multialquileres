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
    "Completa la entrega, la devolución, las fechas y los datos del conductor para reservar un auto en Multialquileres Panamá.",
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
        intro="Confirma el lugar de entrega, el lugar de devolución y las fechas de la reserva. Después completa los datos del conductor."
      />
      <CheckoutForm trip={trip} vehicle={vehicle} />
    </>
  );
}

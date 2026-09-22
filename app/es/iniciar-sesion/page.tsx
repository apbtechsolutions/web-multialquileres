import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { site, whatsappHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Acceso a reservas | Multialquileres Panamá",
  description:
    "El inicio de sesión del sitio anterior dependía del motor Rently. Aquí puedes cotizar o escribir por WhatsApp mientras esa conexión no exista.",
  path: "/es/iniciar-sesion/",
});

export default function LoginPage() {
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Iniciar sesión", path: "/es/iniciar-sesion/" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageIntro
        crumbs={crumbs}
        eyebrow="Cuenta"
        title="El acceso a reservas no está conectado"
        intro="El sitio anterior ofrecía iniciar sesión para ver reservas dentro del motor Rently. Esta reconstrucción no tiene usuarios, contraseñas ni un historial de reservas, porque no hay credenciales de ese sistema."
      />
      <div className="mx-auto grid max-w-3xl gap-4 px-4 py-10">
        <p className="text-sm leading-7">
          Para consultar una reserva ya hecha, escribe al WhatsApp {site.phone} o al correo {site.email} con el código de reserva. No ingreses contraseñas en esta página: no hay formulario de acceso.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappHref("Hola, quiero consultar una reserva ya existente.")} className="rounded-full bg-[#128C7E] px-4 py-3 font-semibold text-white">
            Escribir por WhatsApp
          </a>
          <Link href="/es/cotizar/" className="rounded-full bg-brand px-4 py-3 font-semibold text-white">
            Solicitar una cotización nueva
          </Link>
        </div>
        <p className="text-sm text-muted">[REQUIERE INFORMACIÓN DEL CLIENTE] API o acceso de Rently si se quiere recuperar el inicio de sesión real.</p>
      </div>
    </>
  );
}

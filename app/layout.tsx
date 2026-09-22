import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { CookieBanner } from "@/components/conversion/CookieBanner";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Alquiler de autos en Ciudad de Panamá | Multialquileres",
    template: "%s",
  },
  description:
    "Multialquileres Panamá, de Grupo Cáceres, S.A., publica alquiler de autos en Ciudad de Panamá, Tocumen, Panamá Pacífico y David.",
  icons: { icon: [{ url: site.favicon }] },
  applicationName: site.name,
  // QA en web.multialquileres.com.pa: no indexar. El sitio indexable es www.multialquileres.com.pa.
  robots: "noindex, nofollow, noarchive",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PA" className={roboto.variable}>
      <body className="font-sans antialiased">
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}

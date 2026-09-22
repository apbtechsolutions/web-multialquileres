import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-white/80">{site.legalName}</p>
          <p className="mt-3 text-sm text-white/80">{site.address.street}</p>
          <p className="text-sm text-white/80">
            {site.address.locality}, {site.address.region}
          </p>
        </div>
        <FooterColumn title="Alquilar" links={footerNav.alquiler} />
        <FooterColumn title="Empresa" links={footerNav.empresa} />
        <div>
          <FooterColumn title="Legal" links={footerNav.legal} />
          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide">Contacto</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="hover:underline" href={`tel:${site.phoneTel}`}>
                {site.phone}
              </a>
            </li>
            <li>
              <a className="hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            {site.social.map((item) => (
              <li key={item.href}>
                <a className="hover:underline" href={item.href} rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-white/75">
          © {new Date().getFullYear()} {site.legalName} Panamá.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-white/85 hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

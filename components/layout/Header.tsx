"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNav } from "@/data/navigation";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/es/" className="flex items-center gap-3" aria-label={`${site.name}, inicio`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.logo} alt="" width={148} height={49} className="h-12 w-auto" />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-5 lg:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ink hover:text-brand">
              {item.label}
            </Link>
          ))}
          <Link
            href="/es/iniciar-sesion/"
            className="text-sm font-semibold text-brand-dark hover:text-brand"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/es/cotizar/"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Solicitar cotización
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-md border border-line px-3 py-2 text-sm font-semibold lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>
      {open ? (
        <nav id="menu-movil" aria-label="Móvil" className="border-t border-line bg-white px-4 py-3 lg:hidden">
          <ul className="grid gap-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded-md px-2 py-2 hover:bg-surface" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/es/iniciar-sesion/" className="block rounded-md px-2 py-2 hover:bg-surface" onClick={() => setOpen(false)}>
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link href="/es/cotizar/" className="mt-1 block rounded-full bg-brand px-4 py-3 text-center font-semibold text-white" onClick={() => setOpen(false)}>
                Solicitar cotización
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

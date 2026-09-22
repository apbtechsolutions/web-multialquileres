"use client";

import { useEffect, useState } from "react";

const storageKey = "multialquileres-cookies";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    setVisible(!stored);
    if (stored === "accepted") loadAnalytics();
  }, []);

  function choose(value: "accepted" | "rejected") {
    window.localStorage.setItem(storageKey, value);
    setVisible(false);
    if (value === "accepted") loadAnalytics();
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 shadow-2xl" role="dialog" aria-labelledby="cookie-title">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="cookie-title" className="font-semibold text-brand-dark">
            Esta página web usa cookies
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-muted">
            Las cookies de este sitio se usan para personalizar el contenido y los anuncios, ofrecer funciones de redes sociales y analizar el tráfico. Puedes aceptar o rechazar las cookies de analítica. El detalle está en la política de cookies.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="rounded-full border border-line px-4 py-2 text-sm font-semibold" onClick={() => choose("rejected")}>
            Rechazar
          </button>
          <button type="button" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={() => choose("accepted")}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

function loadAnalytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gtmId && !gaId) return;
  if (document.getElementById("ma-analytics")) return;
  const script = document.createElement("script");
  script.id = "ma-analytics";
  script.async = true;
  if (gtmId) {
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  } else if (gaId) {
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    script.onload = () => {
      const w = window as Window & { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push(["js", new Date()]);
      w.dataLayer.push(["config", gaId]);
    };
  }
  document.head.appendChild(script);
}

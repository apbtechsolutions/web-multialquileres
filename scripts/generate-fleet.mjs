import fs from "fs";
import path from "path";

const root = "C:/ProyectosWeb/web-multialquileres";
const categories = JSON.parse(fs.readFileSync(path.join(root, "_audit/categories.json"), "utf8"));

const categoryCopy = {
  SUV: {
    slug: "suv",
    title: "Alquiler de SUV en Panamá",
    summary:
      "Los SUV del catálogo publicado de Multialquileres Panamá cubren viajes urbanos, familiares y traslados con más espacio. La tarifa que se muestra es una referencia diaria del catálogo; la tarifa confirmada depende de las fechas, el lugar de entrega y la disponibilidad.",
  },
  HATCHBACK: {
    slug: "hatchback",
    title: "Alquiler de hatchback en Panamá",
    summary:
      "Los hatchback publicados son modelos compactos del catálogo, pensados para moverse en Ciudad de Panamá. La tarifa diaria es de referencia y no confirma disponibilidad.",
  },
  PICKUP: {
    slug: "pickup",
    title: "Alquiler de pickup en Panamá",
    summary:
      "Las pickup del catálogo publicado incluyen modelos de trabajo y doble cabina. La tarifa diaria es de referencia y el depósito, cuando está informado, también proviene del catálogo.",
  },
  SEDAN: {
    slug: "sedan",
    title: "Alquiler de sedán en Panamá",
    summary:
      "Los sedán publicados van de modelos compactos a opciones de mayor tarifa dentro del mismo catálogo. Cada ficha muestra pasajeros, maletas, combustible y transmisión cuando el catálogo los informa.",
  },
  BUS: {
    slug: "bus",
    title: "Alquiler de busito en Panamá",
    summary:
      "En el catálogo publicado, la categoría bus corresponde al Chevrolet Busito, un vehículo de más plazas que un sedán o un hatchback. La tarifa diaria es de referencia.",
  },
};

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function fuel(code) {
  if (code === 0) return "Gasolina";
  if (code === 1) return "Diésel";
  return null;
}

function transmission(value) {
  const raw = (value || "").trim();
  const key = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  if (!key || key === ".") return null;
  if (key.includes("4X4")) return "Automática 4x4";
  if (key.startsWith("MAN")) return "Manual";
  if (key.startsWith("AUTO")) return "Automática";
  return raw;
}

function cleanImage(src) {
  if (!src || typeof src !== "string") return null;
  if (src.includes("HttpPostedFile") || src.includes("System.Web")) return null;
  if (!src.startsWith("http")) return null;
  return src;
}

function money(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n * 100) / 100;
}

const used = new Map();
const outCategories = [];

for (const category of categories) {
  const meta = categoryCopy[category.name];
  if (!meta) continue;
  const vehicles = category.models.map((model) => {
    const brand = model.brand?.name || "";
    let slug = slugify(`${brand} ${model.name}`);
    const count = used.get(slug) || 0;
    used.set(slug, count + 1);
    if (count > 0) {
      const price = money(model.lowerPrice ?? model.dailyPrice);
      slug = `${slug}-${String(price ?? model.id).replace(".", "")}`;
    }
    const ac = (model.airConditioner || "").toLowerCase();
    return {
      id: model.id,
      slug,
      brand,
      model: model.name,
      name: `${brand} ${model.name}`.trim(),
      category: category.name,
      categorySlug: meta.slug,
      passengers: model.passengers || null,
      doors: model.doors || null,
      bigLuggage: model.bigLuggage ?? null,
      smallLuggage: model.smallLuggage ?? null,
      transmission: transmission(model.gearbox),
      fuel: fuel(model.fuelType),
      airConditioner: ac.startsWith("si") || ac.startsWith("sí"),
      dailyPrice: money(model.dailyPrice),
      fromPrice: money(model.lowerPrice ?? model.dailyPrice),
      deposit: money(model.franchise),
      image: cleanImage(model.imagePath),
    };
  });
  const prices = vehicles.map((v) => v.fromPrice).filter((n) => n != null);
  outCategories.push({
    ...meta,
    name: category.name,
    count: vehicles.length,
    minPrice: prices.length ? Math.min(...prices) : null,
    maxPrice: prices.length ? Math.max(...prices) : null,
    vehicles,
  });
}

fs.mkdirSync(path.join(root, "data"), { recursive: true });
fs.writeFileSync(path.join(root, "data/fleet.json"), JSON.stringify(outCategories, null, 2));
console.log(
  "vehicles",
  outCategories.reduce((n, c) => n + c.vehicles.length, 0),
  "categories",
  outCategories.length,
);

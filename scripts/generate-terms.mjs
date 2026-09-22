import fs from "fs";

const raw = fs.readFileSync(
  "C:/ProyectosWeb/web-multialquileres/_audit/pages/_es_condiciones.content.txt",
  "utf8",
);
const body = raw.split("PATH:")[1]?.split("\n").slice(1).join("\n") ?? raw;
const parts = body
  .split(/\n---\n/)
  .map((part) =>
    part
      .replace(/\s+/g, " ")
      .replace(/Grupo Cáceres S\.A ,/g, "Grupo Cáceres S.A.,")
      .trim(),
  )
  .filter((part) => part.length > 40)
  .filter((part) => !/lorem ipsum/i.test(part))
  .filter((part) => !part.includes("box-shadow"))
  .filter((part) => !/^[0-9a-f-]{20,}$/i.test(part));

const unique = [];
for (const part of parts) {
  if (unique[unique.length - 1] === part) continue;
  if (part.startsWith("26.2 Al contratar una Oferta Sorpresa") && unique.some((item) => item.startsWith("26.2 "))) {
    continue;
  }
  unique.push(part);
}

fs.writeFileSync(
  "C:/ProyectosWeb/web-multialquileres/data/terms.json",
  JSON.stringify(unique, null, 2),
);
console.log("paragraphs", unique.length);

import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

export function PageIntro({
  crumbs,
  eyebrow,
  title,
  intro,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="bg-surface">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10">
        <Breadcrumbs items={crumbs} />
        {eyebrow ? <p className="text-sm font-semibold tracking-wide text-brand uppercase">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">{title}</h1>
        <p className="max-w-3xl text-base leading-7 text-muted">{intro}</p>
      </div>
    </header>
  );
}

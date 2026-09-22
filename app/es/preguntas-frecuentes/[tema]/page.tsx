import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/content/FaqList";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqTopics, getFaqTopic } from "@/data/faqs";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

type Params = { tema: string };

export function generateStaticParams() {
  return faqTopics.map((topic) => ({ tema: topic.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tema } = await params;
  const topic = getFaqTopic(tema);
  if (!topic) return {};
  return pageMetadata({
    title: `${topic.title} | Multialquileres Panamá`,
    description: topic.description,
    path: `/es/preguntas-frecuentes/${topic.slug}/`,
  });
}

export default async function FaqTopicPage({ params }: { params: Promise<Params> }) {
  const { tema } = await params;
  const topic = getFaqTopic(tema);
  if (!topic) notFound();
  const crumbs = [
    { name: "Inicio", path: "/es/" },
    { name: "Preguntas frecuentes", path: "/es/preguntas-frecuentes/" },
    { name: topic.title, path: `/es/preguntas-frecuentes/${topic.slug}/` },
  ];
  const others = faqTopics.filter((item) => item.slug !== topic.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(topic.items)} />
      <PageIntro crumbs={crumbs} eyebrow="Preguntas frecuentes" title={topic.h1} intro={topic.intro} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_280px]">
        <FaqList items={topic.items} />
        <aside>
          <h2 className="text-lg font-semibold text-brand-dark">Otros temas</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/es/preguntas-frecuentes/${item.slug}/`} className="text-brand hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}

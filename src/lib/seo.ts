import type { Metadata } from "next";
import { absoluteUrl, site } from "@/data/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: title }, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website", locale: "pt_BR", siteName: site.name,
      title, description, url: absoluteUrl(path),
      images: [{ url: absoluteUrl("/clinic/dr-sergio-profissional-barba.webp"), alt: "Dr. Sergio Grava, pneumologista em Maringá" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/clinic/dr-sergio-profissional-barba.webp")] },
  };
}

export function detailSchema(title: string, description: string, path: string, collection: "cuidados" | "programas") {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage", "@id": `${absoluteUrl(path)}#page`,
        url: absoluteUrl(path), name: title, description, inLanguage: "pt-BR",
        reviewedBy: { "@id": absoluteUrl("/#medico") },
        isPartOf: { "@id": absoluteUrl("/#website") },
        breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList", "@id": `${absoluteUrl(path)}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: collection === "programas" ? "Programas de Acompanhamento e Tratamento" : "Cuidados", item: absoluteUrl(`/#${collection}`) },
          { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(path) },
        ],
      },
    ],
  };
}

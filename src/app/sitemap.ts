import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/data/site";
import { services } from "@/data/services";
import { programs } from "@/data/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    ...services.map(({ slug }) => ({ url: absoluteUrl(`/cuidados/${slug}`) })),
    ...programs.map(({ slug }) => ({ url: absoluteUrl(`/programas/${slug}`) })),
  ];
}

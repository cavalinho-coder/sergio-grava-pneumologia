export const site = {
  name: "Dr. Sergio Grava",
  registration: "CRM-PR 17925 · RQE 13548 (Pneumologia) · RQE 158 (Endoscopia Respiratória)",
  clinic: "Centro Médico do Pulmão",
  whatsapp: "https://wa.me/5544991721222",
  telephone: "tel:+554430311222",
  hours: "Funcionamento da clínica: segunda a sexta, das 8h às 18h.",
  insurance: "Também atendemos: Unimed, Copel, Sanepar, Cassi, Prever, Fácil Consulta, Santa Casa e Paraná Saúde.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Carlos Gomes, 242, Zona 05",
    addressLocality: "Maringá",
    addressRegion: "PR",
    postalCode: "87015-200",
    addressCountry: "BR",
  },
} as const;

// Switch only when the custom domain serves this deployment.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sergio-grava-pneumologia.vercel.app").origin;
export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();
export const medicalExperience = () => Number(new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "America/Sao_Paulo" }).format(new Date())) - 2000;

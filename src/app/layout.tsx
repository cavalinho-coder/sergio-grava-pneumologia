import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { absoluteUrl, site, siteUrl } from "@/data/site";
import { StructuredData } from "@/components/structured-data";
import { Analytics } from "@/components/analytics";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Dr. Sergio Grava | Pneumologista em Maringá", template: "%s | Dr. Sergio Grava" },
  description: "Pneumologia e Endoscopia Respiratória em Maringá. Consultas particulares, exames e acompanhamento respiratório individualizado.",
  robots: { index: true, follow: true },
  authors: [{ name: site.name }],
  category: "Saúde",
};

const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite", "@id": absoluteUrl("/#website"),
      url: absoluteUrl(), name: site.name, inLanguage: "pt-BR",
      publisher: { "@id": absoluteUrl("/#medico") },
    },
    {
      "@type": "Physician", "@id": absoluteUrl("/#medico"),
      name: site.name, url: absoluteUrl(), description: site.registration,
      image: absoluteUrl("/clinic/dr-sergio-profissional-barba.webp"),
      medicalSpecialty: "https://schema.org/Pulmonary",
      telephone: "+55-44-3031-1222", email: "sergiogravapneumo@gmail.com",
      address: site.address,
      availableService: [
        { "@type": "MedicalProcedure", name: "Prova de Função Pulmonar", url: absoluteUrl("/cuidados/espirometria") },
        { "@type": "MedicalTest", name: "Testes Cutâneos para Aeroalérgenos (Prick Test)", url: absoluteUrl("/cuidados/prick-test") },
      ],
      sameAs: ["https://www.instagram.com/drsergiograva.pneumo/", "https://www.linkedin.com/in/sergio-grava-3162102a", "https://facebook.com/sergio.grava.1/"],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00", closes: "18:00",
      },
      parentOrganization: { "@id": absoluteUrl("/#clinica") },
    },
    {
      "@type": "MedicalClinic", "@id": absoluteUrl("/#clinica"),
      name: site.clinic, address: site.address, telephone: "+55-44-3031-1222",
      image: absoluteUrl("/clinic/fachada.jpeg"), url: absoluteUrl("/#clinica"),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${manrope.variable} ${cormorant.variable}`}><body>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <StructuredData data={businessSchema} />
    {children}
    <Analytics />
  </body></html>;
}

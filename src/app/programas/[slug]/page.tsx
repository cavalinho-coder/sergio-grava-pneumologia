import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { DoctorCredentials } from "@/components/doctor-credentials";
import { StructuredData } from "@/components/structured-data";
import { getProgram, programs } from "@/data/programs";
import { site } from "@/data/site";
import { detailSchema, pageMetadata } from "@/lib/seo";

export const revalidate = 86400;
export const dynamicParams = false;
export function generateStaticParams() { return programs.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  return pageMetadata(program.seoTitle, program.description, `/programas/${slug}`);
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  const next = programs[(programs.indexOf(program) + 1) % programs.length];
  return <>
    <SiteHeader />
    <main id="conteudo" className="detail-page">
      <StructuredData data={detailSchema(program.title, program.description, `/programas/${slug}`, "programas")} />
      <section className="detail-hero">
        <div className="detail-orb" aria-hidden="true"><span>{program.icon}</span><i/><i/></div>
        <Link href="/#programas" className="back-link">Todos os programas</Link>
        <p className="kicker">Programas de Acompanhamento e Tratamento</p>
        <h1>{program.title}</h1>
        <p className="detail-lead">{program.intro || program.description}</p>
        <a href={site.whatsapp} target="_blank" rel="noreferrer" className="button">Agende sua avaliação respiratória</a>
      </section>
      <section className="detail-content" aria-label="Informações sobre o programa">
        <aside className="detail-aside"><DoctorCredentials /></aside>
        <div className="detail-sections">
          {program.sections.map((section, index) => <Reveal key={section.title} className="detail-section">
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><h2>{section.title}</h2>{section.body.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </Reveal>)}
        </div>
      </section>
      <section className="next-service"><p className="kicker light">Continue explorando</p><Link href={`/programas/${next.slug}`}><span>Próximo programa</span><h2>{next.title}</h2></Link></section>
    </main>
    <SiteFooter />
  </>;
}

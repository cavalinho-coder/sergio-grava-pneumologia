import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return <><SiteHeader /><main id="conteudo" className="detail-page"><section className="detail-hero">
    <p className="kicker">Página não encontrada</p><h1>Vamos encontrar<br/>o seu cuidado.</h1>
    <p className="detail-lead">Este endereço não está disponível. Conheça os cuidados e os programas de acompanhamento respiratório.</p>
    <Link className="button" href="/">Voltar ao início</Link>
  </section></main><SiteFooter /></>;
}

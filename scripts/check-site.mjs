import assert from "node:assert/strict";

const origin = process.argv[2] || "http://127.0.0.1:3100";
const canonicalOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://sergio-grava-pneumologia.vercel.app";
const read = async (path) => {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response.text();
};
const sitemap = await read("/sitemap.xml");
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => {
  assert.equal(new URL(match[1]).origin, canonicalOrigin);
  return new URL(match[1]).pathname;
});
assert.equal(paths.length, 17, "Home, 12 care pages and 4 programs must be in sitemap");
assert.equal(new Set(paths).size, paths.length);
const robots = await read("/robots.txt");
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
const titles = new Set();
const pages = await Promise.all(paths.map(async path => {
  const html = await read(path);
  const content = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${path}: unique title`);
  titles.add(title);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: one H1`);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical && new URL(canonical).toString(), new URL(path, canonicalOrigin).toString(), `${path}: canonical`);
  assert.ok(html.includes('property="og:title"'), `${path}: Open Graph`);
  assert.ok(content.includes("CRM-PR 17925") && content.includes("RQE 13548") && content.includes("RQE 158"), `${path}: medical registration`);
  assert.ok(content.includes("Consultas particulares com hora marcada.") && content.includes("Paraná Saúde") && content.includes("8h às 18h"), `${path}: contact details`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  assert.ok(schemas.some(schema => schema["@graph"].some(entity => entity["@type"] === "Physician")), `${path}: doctor schema`);
  if (path !== "/") assert.ok(schemas.some(schema => schema["@graph"].some(entity => entity["@type"] === "BreadcrumbList")), `${path}: breadcrumbs`);
  for (const link of content.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    if (link[1] === "/favicon.ico" || link[1].startsWith("/_next/")) continue;
    assert.ok(paths.includes(link[1]), `${path}: broken internal link ${link[1]}`);
  }
  assert.doesNotMatch(content, /resultados duradouros|Cuidado que gera resultados|Referência em broncoscopia|25\+|Mais de 25 anos|recuperação segura e sem complicações|medicamentos seguros/);
  return [path, content];
}));
const byPath = new Map(pages);
assert.ok(byPath.get("/").includes('/programas/dpoc'));
assert.ok(byPath.get("/").includes("Prova de função pulmonar e testes cutâneos para aeroalérgenos."));
assert.ok(byPath.get("/").includes("Dr. Sergio Grava, pneumologista em Maringá"));
assert.ok(byPath.get("/cuidados/apneia-do-sono").includes("realizado em laboratório do sono"));
assert.ok(byPath.get("/cuidados/asma").includes("na maioria dos casos"));
assert.ok(byPath.get("/programas/tabagismo").includes("12 semanas"));
assert.ok(byPath.get("/programas/dpoc").includes("oxigenoterapia"));
assert.ok(byPath.get("/programas/doencas-fibrosantes").includes("pneumonite de hipersensibilidade"));
const missing = await fetch(new URL("/programas/pagina-inexistente", origin));
assert.equal(missing.status, 404, "Unknown programs return 404");
console.log(`PASS: ${paths.length} pages, unique SEO metadata, JSON-LD, sitemap, robots, contacts, internal links, approved corrections and 404.`);

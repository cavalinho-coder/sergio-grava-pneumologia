export function contactEvents(href: string, label: string) {
  const url = new URL(href, "https://sergio-grava-pneumologia.vercel.app");
  const channel = url.protocol === "tel:" ? "phone" : url.protocol === "https:" && url.hostname === "wa.me" ? "whatsapp" : null;
  if (!channel) return null;
  const scheduling = /Agende sua avaliação/.test(label);
  return { channel, scheduling, events: [`contact_${channel}`, ...(scheduling ? ["schedule_evaluation"] : [])] };
}

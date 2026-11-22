"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { contactEvents } from "@/lib/contact-events";

const consentKey = "sg-measurement-consent-v1";
const consentEvent = "sg-consent-change";
const pixelId = "625445269122554";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function snapshot() {
  try { return localStorage.getItem(consentKey); } catch { return null; }
}

function subscribe(callback: () => void) {
  window.addEventListener(consentEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(consentEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function chooseConsent(value: "accepted" | "rejected") {
  try { localStorage.setItem(consentKey, value); } catch { return; }
  window.dispatchEvent(new Event(consentEvent));
  if (value === "rejected") window.location.reload();
}

export function Analytics() {
  const consent = useSyncExternalStore(subscribe, snapshot, () => null);
  const accepted = consent === "accepted";

  useEffect(() => {
    if (!accepted) return;
    function trackContact(event: MouseEvent) {
      const target = event.target;
      const link = target instanceof Element ? target.closest("a") : null;
      if (!link) return;
      const contact = contactEvents(link.href, link.textContent || "");
      if (!contact) return;
      const { channel, scheduling, events } = contact;
      window.dataLayer ??= [];
      events.forEach(eventName => window.dataLayer!.push({ event: eventName, contact_channel: channel }));
      // Preserve the existing Google Ads contact action; old GTM triggers match obsolete button text.
      window.gtag?.("event", "conversion", { send_to: "AW-11066995783/Wb-zCI3NpN0YEMfok50p" });
      // Use the requested pixel explicitly, even if the legacy GTM container has another pixel.
      window.fbq?.("trackSingle", pixelId, scheduling ? "Lead" : "Contact", { contact_channel: channel });
    }
    document.addEventListener("click", trackContact);
    return () => document.removeEventListener("click", trackContact);
  }, [accepted]);

  return <>
    {accepted && <>
      <Script id="google-tag-manager" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        // Keep the legacy container, but prevent its obsolete extra pixel, custom scripts
        // and page-load conversions. The requested pixel and contact conversion are managed here.
        dataLayer.push({'gtm.blocklist':['customScripts','nonGooglePixels','awct']});
        window.gtag = window.gtag || function(){dataLayer.push(arguments)};
        gtag('consent','default',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'denied',ad_personalization:'denied'});
        gtag('js',new Date());
        gtag('config','AW-11066995783');
        (function(w,d,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TBL7KV2');
      `}</Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11066995783" strategy="afterInteractive" />
      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('set','autoConfig',false,'625445269122554');
        fbq('init','625445269122554');
        fbq('trackSingle','625445269122554','PageView');
      `}</Script>
    </>}
    {consent === null && <section className="consent-banner" aria-label="Preferências de cookies">
      <p>Podemos usar cookies do Google e da Meta para medir visitas e cliques nos contatos? A escolha é opcional. Você pode alterá-la em “Cookies”.</p>
      <div><button onClick={() => chooseConsent("rejected")}>Recusar</button><button onClick={() => chooseConsent("accepted")}>Aceitar</button></div>
    </section>}
    {consent !== null && <button className="consent-settings" onClick={() => {
      try { localStorage.removeItem(consentKey); } catch { return; }
      window.location.reload();
    }}>Cookies</button>}
  </>;
}

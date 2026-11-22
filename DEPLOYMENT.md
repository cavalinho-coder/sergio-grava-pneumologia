# FreeDocs November 2026 updates

The approved Portuguese copy is stored in `src/data/services.ts` and
`src/data/programs.ts`. Shared professional identifiers and contact information
are in `src/data/site.ts`. Pages are prerendered and revalidate daily so the
experience counter, calculated from graduation in 2000, updates automatically.

## Measurement

Verified against the legacy site's public HTML on 22 November 2026:

- Google Tag Manager: `GTM-TBL7KV2`.
- Requested Meta Pixel: `625445269122554`.
- Existing Google Ads contact conversion:
  `AW-11066995783/Wb-zCI3NpN0YEMfok50p`.

The live GTM version 7 also contains an obsolete Meta Pixel
`173561358680159`, a third-party custom HTML tag, and a conversion fired on page
load. Its contact triggers depend on the old button labels. The new site keeps
the requested container but uses its documented `gtm.blocklist` facility to block
custom scripts, non-Google pixels and legacy `awct` conversion tags. The requested
Meta Pixel and the verified Google Ads contact conversion are managed explicitly
by `src/components/analytics.tsx`, once per contact click. This avoids sending a
page visit as a contact conversion or initializing the obsolete Pixel.

After optional cookie consent, contact clicks emit `contact_whatsapp`,
`contact_phone`, and, for booking buttons, `schedule_evaluation` into the data
layer. Booking clicks send Meta `Lead`; other contact clicks send Meta `Contact`.
All contact types use the existing Google Ads contact conversion. The event
payload contains only the channel, without symptoms, names, or form values.
Rejecting cookies loads none of these third-party scripts. Preferences can be
changed with the Cookies button. Revocation reloads the page without trackers;
it does not claim to remove cookies held on third-party domains.

Google Tag Manager is signed in locally but exposes no accessible containers in
the current Google account. Dashboard receipt, conversion settings, attribution,
and the doctor's ongoing Meta account recovery require the owning accounts.
Do not create replacement advertising accounts or run campaigns as part of a
website content deployment.

## Final domain migration

The custom domain `drsergiograva.com.br` still serves WordPress and is not attached
to the Vercel project. The old WordPress page sitemap currently lists only `/`.
Preserve that homepage at `/` when moving the domain; a self-redirect would loop.
The current care paths are unchanged, so existing links continue to work.

When the domain is ready to switch:

1. Attach and verify `drsergiograva.com.br` and `www.drsergiograva.com.br` on
   Vercel project `prj_sbvSjMrrtUNyHtti29b2ter1ANn6`, team
   `team_TlCPHpPhRAgAhvo4PBjwXdBJ`.
2. Preserve mail records and update only the web records specified by Vercel.
3. Set `NEXT_PUBLIC_SITE_URL=https://drsergiograva.com.br` and rebuild.
4. The prepared redirects in `next.config.ts` return HTTP 301 from www and the
   stable Vercel hostname to the canonical host, preserving paths. `/index.php`
   redirects to `/`. HTTPS is enforced by the platform.
5. Verify homepage, all sitemap URLs, robots, canonical tags, contact actions and
   TLS on the final domain; submit the new sitemap in the owning Search Console.
6. Map any additional old URLs found in Search Console or server logs to the
   closest relevant new page. Keep unrelated missing URLs as 404 rather than
   redirecting every unknown URL to the homepage.

Canonical URLs, structured data, Open Graph and sitemap all share this one origin
setting. Until the actual domain migration, they use the working Vercel hostname.

## Verification

Run `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm test`, and `npm run build`.
`node scripts/check-site.mjs http://127.0.0.1:3100` checks the production server,
all sitemap URLs, SEO metadata, JSON-LD, identifiers and the approved copy. Repeat
with the deployed origin after publishing.

/*
 * URL publique du site (liens de paiement, emails, sitemap, métadonnées) :
 * NEXT_PUBLIC_SITE_URL si elle est définie et valable, sinon le domaine fourni
 * par Vercel (domaine de production, ou URL du déploiement en preview), sinon
 * localhost.
 * Sur Vercel, une NEXT_PUBLIC_SITE_URL pointant vers localhost (copiée depuis
 * le .env local) est ignorée : elle enverrait aux clients des liens morts.
 */

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]"]);

let warned = false;

// "monsite.fr" ou "https://monsite.fr/" → "https://monsite.fr" ; null si invalide.
function normalize(value: string | undefined): URL | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function toString(url: URL) {
  return `${url.origin}${url.pathname}`.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const onVercel = Boolean(process.env.VERCEL_ENV);
  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_URL;

  const configured = normalize(process.env.NEXT_PUBLIC_SITE_URL);
  const usable = configured && !(onVercel && LOCAL_HOSTS.has(configured.hostname));

  if (usable) return toString(configured);

  if (onVercel && process.env.NEXT_PUBLIC_SITE_URL && !warned) {
    warned = true;
    console.warn(
      `NEXT_PUBLIC_SITE_URL ignorée (« ${process.env.NEXT_PUBLIC_SITE_URL} ») : ` +
        "valeur locale ou invalide sur Vercel. Domaine Vercel utilisé à la place.",
    );
  }

  const fallback = normalize(vercelHost);
  return fallback ? toString(fallback) : "http://localhost:3000";
}

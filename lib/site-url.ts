/*
 * URL publique du site (liens de paiement, emails, sitemap, métadonnées) :
 * NEXT_PUBLIC_SITE_URL si elle est définie, sinon le domaine fourni par Vercel
 * (domaine de production, ou URL du déploiement en preview), sinon localhost.
 * `||` et non `??` : une variable définie mais vide ne doit pas donner une URL vide.
 */
export function getSiteUrl(): string {
  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_URL;

  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

  return url.replace(/\/+$/, "");
}

import { prisma } from "@/lib/db";

/*
 * Limitation de débit stockée en base : contrairement à une Map en mémoire,
 * le compteur est partagé entre toutes les instances serverless. L'upsert
 * est atomique (une seule requête SQL), donc sans course entre requêtes.
 *
 * Renvoie true si l'action est autorisée.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const windowSeconds = windowMs / 1000;

  // Nettoyage opportuniste des compteurs expirés (~1 appel sur 50).
  if (Math.random() < 0.02) {
    void prisma.rateLimit
      .deleteMany({ where: { resetAt: { lt: new Date() } } })
      .catch(() => undefined);
  }

  try {
    const rows = await prisma.$queryRaw<{ count: number }[]>`
      INSERT INTO "RateLimit" ("key", "count", "resetAt")
      VALUES (${key}, 1, NOW() + make_interval(secs => ${windowSeconds}))
      ON CONFLICT ("key") DO UPDATE SET
        "count" = CASE
          WHEN "RateLimit"."resetAt" < NOW() THEN 1
          ELSE "RateLimit"."count" + 1
        END,
        "resetAt" = CASE
          WHEN "RateLimit"."resetAt" < NOW()
            THEN NOW() + make_interval(secs => ${windowSeconds})
          ELSE "RateLimit"."resetAt"
        END
      RETURNING "count"
    `;

    return (rows[0]?.count ?? 0) <= limit;
  } catch (error) {
    // Une panne du limiteur ne doit pas bloquer le site.
    console.error("Limitation de débit indisponible :", error);
    return true;
  }
}

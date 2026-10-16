import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/db";

// Tag de cache des pages qui affichent le badge : l'action de l'admin
// l'invalide pour que le changement soit visible tout de suite.
export const AVAILABILITY_TAG = "availability";

// Lu une fois puis mis en cache : les pages publiques restent statiques.
export const getAvailable = unstable_cache(
  async () => {
    try {
      const settings = await prisma.siteSettings.findUnique({
        where: { id: 1 },
        select: { available: true },
      });
      return settings?.available ?? true;
    } catch (error) {
      // Base indisponible ou migration pas encore appliquée : on garde le badge vert.
      console.error("Lecture de la disponibilité impossible :", error);
      return true;
    }
  },
  ["site-availability"],
  { tags: [AVAILABILITY_TAG] },
);

export async function setAvailable(available: boolean) {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, available },
    update: { available },
  });
}

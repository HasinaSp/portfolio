"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

import { signOut } from "@/auth";
import { requireAdmin } from "@/lib/admin";
import { AVAILABILITY_TAG, setAvailable } from "@/lib/availability";
import { isContactStatus } from "@/lib/contact-requests";
import { prisma } from "@/lib/db";

// Chaque action refait le contrôle d'accès : une action serveur est
// appelable directement, indépendamment de la page qui l'affiche.

export async function updateRequestStatus(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = formData.get("status");

  if (!id || !isContactStatus(status)) {
    throw new Error("Statut invalide.");
  }

  await prisma.contactRequest.update({ where: { id }, data: { status } });

  revalidatePath("/admin");
  revalidatePath(`/admin/demandes/${id}`);
}

export async function deleteRequest(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Demande introuvable.");

  await prisma.contactRequest.delete({ where: { id } });

  revalidatePath("/admin");
  redirect("/admin?supprimee=1");
}

export async function updateAvailability(formData: FormData) {
  await requireAdmin();

  const value = formData.get("available");
  if (value !== "true" && value !== "false") {
    throw new Error("Valeur invalide.");
  }

  await setAvailable(value === "true");

  // Pages publiques (badge) régénérées à la prochaine visite.
  updateTag(AVAILABILITY_TAG);
  revalidatePath("/admin");
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

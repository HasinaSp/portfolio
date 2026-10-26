import Link from "next/link";

import PaymentForm from "@/components/admin/PaymentForm";
import { requireAdmin } from "@/lib/admin";
import { serviceLabel } from "@/lib/contact-requests";
import { prisma } from "@/lib/db";

type PageProps = {
  // ?demande=<id> : formulaire prérempli depuis une demande de collaboration.
  searchParams: Promise<{ demande?: string }>;
};

export default async function NewPaymentPage({ searchParams }: PageProps) {
  await requireAdmin();

  const { demande } = await searchParams;
  const request = demande
    ? await prisma.contactRequest.findUnique({
        where: { id: demande },
        select: { id: true, name: true, email: true, service: true },
      })
    : null;

  return (
    <div className="max-w-2xl">
      <Link
        href={request ? `/admin/demandes/${request.id}` : "/admin/paiements"}
        className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
      >
        <span aria-hidden="true">←</span> {request ? "Retour à la demande" : "Tous les paiements"}
      </Link>

      <h1 className="mt-8 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
        Nouveau paiement<span className="text-[#d00018]">.</span>
      </h1>
      <p className="mt-3 text-sm leading-6 text-neutral-500">
        Un lien de paiement unique est créé pour ce client. Il paie par carte (ou autre moyen
        proposé par Lemon Squeezy), où qu&apos;il soit, le montant exact indiqué ici.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <PaymentForm
          defaults={{
            clientName: request?.name,
            clientEmail: request?.email,
            description: request ? serviceLabel(request.service) : undefined,
            contactRequestId: request?.id,
          }}
        />
      </div>
    </div>
  );
}

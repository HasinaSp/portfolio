import { NextResponse, after } from "next/server";
import type { PaymentStatus } from "@prisma/client";

import { prisma } from "@/lib/db";
import { verifyWebhookSignature, type OrderWebhook } from "@/lib/lemonsqueezy";
import { notifyPaymentReceived } from "@/lib/notify-payment";
import { formatMoney } from "@/lib/payments";

/*
 * Webhook Lemon Squeezy (événements order_created et order_refunded).
 * Seule source de vérité du statut d'un paiement : le retour du client sur
 * le site ne prouve rien, ce webhook est signé avec LEMONSQUEEZY_WEBHOOK_SECRET.
 * Répond 200 dès que le message est authentique, même s'il est ignoré, pour
 * que Lemon Squeezy ne le renvoie pas indéfiniment.
 */

const statusFromOrder: Record<OrderWebhook["data"]["attributes"]["status"], PaymentStatus> = {
  pending: "PENDING",
  failed: "FAILED",
  fraudulent: "FAILED",
  paid: "PAID",
  partial_refund: "PARTIAL_REFUND",
  refunded: "REFUNDED",
};

// Un statut ne revient jamais en arrière (ex. un ancien order_created renvoyé
// après un remboursement ne doit pas repasser le paiement à « payé »).
const rank: Record<PaymentStatus, number> = {
  PENDING: 0,
  FAILED: 0,
  PAID: 1,
  PARTIAL_REFUND: 2,
  REFUNDED: 3,
};

const ok = () => NextResponse.json({ received: true });

export async function POST(request: Request) {
  const raw = await request.text();

  if (!verifyWebhookSignature(raw, request.headers.get("x-signature"))) {
    return NextResponse.json({ error: "Signature invalide." }, { status: 401 });
  }

  let event: OrderWebhook;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Corps invalide." }, { status: 400 });
  }

  const name = event.meta?.event_name;
  if ((name !== "order_created" && name !== "order_refunded") || event.data?.type !== "orders") {
    return ok();
  }

  const paymentId = event.meta.custom_data?.payment_id;
  if (typeof paymentId !== "string") return ok(); // commande hors portfolio

  const order = event.data.attributes;

  // La commande doit venir de notre boutique et de notre produit.
  if (
    String(order.store_id) !== process.env.LEMONSQUEEZY_STORE_ID ||
    String(order.first_order_item?.variant_id) !== process.env.LEMONSQUEEZY_VARIANT_ID
  ) {
    console.error("Webhook Lemon Squeezy ignoré : boutique ou produit inattendu.");
    return ok();
  }

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) {
    console.error("Webhook Lemon Squeezy ignoré : paiement introuvable.");
    return ok();
  }

  const status = statusFromOrder[order.status] ?? "PENDING";

  // Le montant doit être celui du devis : le lien d'achat public du produit
  // accepte des données personnalisées, quelqu'un pourrait sinon payer le prix
  // de base du produit en indiquant l'id d'un devis plus cher. Selon le réglage
  // des taxes de la boutique, le devis est le sous-total ou le prix de l'article.
  const amountMatches =
    order.subtotal === payment.amount || order.first_order_item?.price === payment.amount;
  if (
    status === "PAID" &&
    (!amountMatches || order.currency.toUpperCase() !== payment.currency)
  ) {
    console.error(
      `Webhook Lemon Squeezy : montant inattendu pour la commande n° ${order.order_number} ` +
        `(${formatMoney(order.subtotal, order.currency.toUpperCase())} au lieu de ` +
        `${formatMoney(payment.amount, payment.currency)}). ` +
        "Paiement laissé en attente, à vérifier dans Lemon Squeezy.",
    );
    return ok();
  }

  if (rank[status] < rank[payment.status]) return ok();

  const becomesPaid = status === "PAID" && payment.status !== "PAID";

  const updated = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status,
      orderId: event.data.id,
      orderNumber: order.order_number,
      receiptUrl: order.urls?.receipt ?? payment.receiptUrl,
      testMode: order.test_mode,
      paidAt: becomesPaid ? new Date() : payment.paidAt,
    },
  });

  if (becomesPaid) after(() => notifyPaymentReceived(updated));

  return ok();
}

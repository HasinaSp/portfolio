import { createHmac, timingSafeEqual } from "node:crypto";

/*
 * Lemon Squeezy (paiements) : création des pages de paiement (« checkouts »)
 * et vérification des webhooks. Lemon Squeezy est « Merchant of Record » :
 * il encaisse, gère la TVA de chaque pays et envoie le reçu officiel.
 *
 * Variables : LEMONSQUEEZY_API_KEY, LEMONSQUEEZY_STORE_ID,
 * LEMONSQUEEZY_VARIANT_ID (le produit « Paiement de prestation », dont le
 * prix est remplacé par le montant du devis) et LEMONSQUEEZY_WEBHOOK_SECRET.
 */

const API_URL = "https://api.lemonsqueezy.com/v1";

function config() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;
  if (!apiKey || !storeId || !variantId) {
    throw new Error(
      "Lemon Squeezy non configuré : LEMONSQUEEZY_API_KEY, LEMONSQUEEZY_STORE_ID et LEMONSQUEEZY_VARIANT_ID sont requis.",
    );
  }
  return { apiKey, storeId, variantId };
}

export function lemonSqueezyConfigured() {
  return Boolean(
    process.env.LEMONSQUEEZY_API_KEY &&
      process.env.LEMONSQUEEZY_STORE_ID &&
      process.env.LEMONSQUEEZY_VARIANT_ID,
  );
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const { apiKey } = config();
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    // Le corps d'erreur décrit le champ fautif, sans donnée sensible.
    const detail = await response.text().catch(() => "");
    throw new Error(`Lemon Squeezy ${path} : HTTP ${response.status} ${detail.slice(0, 300)}`);
  }

  return response.json() as Promise<T>;
}

// Devise de la boutique : les montants des devis sont exprimés dans celle-ci.
export async function getStoreCurrency(): Promise<string> {
  const { storeId } = config();
  const store = await api<{ data: { attributes: { currency: string } } }>(`/stores/${storeId}`);
  return store.data.attributes.currency.toUpperCase();
}

export async function createCheckout(input: {
  paymentId: string;
  amount: number;
  description: string;
  clientName: string;
  clientEmail: string;
  returnUrl: string;
  receiptButtonText: string;
}): Promise<string> {
  const { storeId, variantId } = config();

  const checkout = await api<{ data: { attributes: { url: string } } }>("/checkouts", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          // Montant du devis, en centimes, à la place du prix du produit.
          custom_price: input.amount,
          product_options: {
            name: input.description,
            enabled_variants: [Number(variantId)],
            redirect_url: input.returnUrl,
            receipt_link_url: input.returnUrl,
            receipt_button_text: input.receiptButtonText,
          },
          // Pas de code promo : le montant payé doit être celui du devis.
          checkout_options: { discount: false },
          checkout_data: {
            name: input.clientName,
            email: input.clientEmail,
            // Renvoyé tel quel dans le webhook (meta.custom_data).
            custom: { payment_id: input.paymentId },
          },
          // Page de paiement jetable : un nouveau checkout est créé à chaque
          // clic sur « Payer », celui-ci expire après 24 h.
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
        relationships: {
          store: { data: { type: "stores", id: storeId } },
          variant: { data: { type: "variants", id: variantId } },
        },
      },
    }),
  });

  return checkout.data.attributes.url;
}

// Signature du webhook : HMAC-SHA256 (hex) du corps brut, en-tête X-Signature.
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expected = Buffer.from(createHmac("sha256", secret).update(rawBody).digest("hex"), "utf8");
  const received = Buffer.from(signature, "utf8");

  return expected.length === received.length && timingSafeEqual(expected, received);
}

export type OrderWebhook = {
  meta: {
    event_name: string;
    test_mode?: boolean;
    custom_data?: { payment_id?: unknown };
  };
  data: {
    type: string;
    id: string;
    attributes: {
      store_id: number;
      order_number: number;
      currency: string;
      subtotal: number;
      status: "pending" | "failed" | "paid" | "refunded" | "partial_refund" | "fraudulent";
      test_mode: boolean;
      urls?: { receipt?: string };
      first_order_item?: { variant_id: number; price: number };
    };
  };
};

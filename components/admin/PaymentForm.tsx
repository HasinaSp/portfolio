"use client";

import { useActionState } from "react";

import { createPayment, type PaymentFormState } from "@/app/(private)/admin/paiements/actions";

type Defaults = {
  clientName?: string;
  clientEmail?: string;
  description?: string;
  lang?: "fr" | "en";
  contactRequestId?: string;
};

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-[#d00018]";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-300">{message}</p>;
}

export default function PaymentForm({ defaults }: { defaults: Defaults }) {
  const [state, action, pending] = useActionState<PaymentFormState, FormData>(createPayment, {});
  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-5">
      {defaults.contactRequestId && (
        <input type="hidden" name="contactRequestId" value={defaults.contactRequestId} />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="clientName" className="text-sm text-neutral-300">
            Nom du client
          </label>
          <input
            id="clientName"
            name="clientName"
            required
            maxLength={100}
            defaultValue={defaults.clientName}
            className={inputClass}
          />
          <FieldError message={errors.clientName} />
        </div>

        <div>
          <label htmlFor="clientEmail" className="text-sm text-neutral-300">
            Email du client
          </label>
          <input
            id="clientEmail"
            name="clientEmail"
            type="email"
            required
            maxLength={254}
            defaultValue={defaults.clientEmail}
            className={inputClass}
          />
          <FieldError message={errors.clientEmail} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="text-sm text-neutral-300">
          Prestation (affichée au client et sur le reçu)
        </label>
        <input
          id="description"
          name="description"
          required
          maxLength={200}
          defaultValue={defaults.description}
          placeholder="Ex. Site vitrine — acompte de 50 %"
          className={inputClass}
        />
        <FieldError message={errors.description} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="amount" className="text-sm text-neutral-300">
            Montant (devise de la boutique Lemon Squeezy)
          </label>
          <input
            id="amount"
            name="amount"
            required
            inputMode="decimal"
            placeholder="750,00"
            className={inputClass}
          />
          <FieldError message={errors.amount} />
        </div>

        <div>
          <label htmlFor="lang" className="text-sm text-neutral-300">
            Langue de la page de paiement
          </label>
          <select id="lang" name="lang" defaultValue={defaults.lang ?? "fr"} className={inputClass}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-neutral-300">
        <input
          type="checkbox"
          name="sendEmail"
          defaultChecked
          className="h-4 w-4 accent-[#d00018]"
        />
        Envoyer le lien de paiement au client par email
      </label>

      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[#d00018] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b60015] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Création…" : "Créer le lien de paiement"}
      </button>
    </form>
  );
}

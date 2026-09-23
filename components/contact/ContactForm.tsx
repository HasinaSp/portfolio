"use client";

import { useState } from "react";

import { services } from "@/data/services";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: formData.get("service"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errors = result.errors;

        const firstError = errors
          ? Object.values(errors).flat()[0]
          : null;

        setStatus({
          type: "error",
          message:
            firstError ||
            result.message ||
            "Veuillez vérifier les informations saisies.",
        });

        return;
      }

      setStatus({
        type: "success",
        message:
          result.message ||
          "Votre demande a bien été envoyée.",
      });

      form.reset();
    } catch {
      setStatus({
        type: "error",
        message:
          "Impossible d'envoyer votre demande. Réessayez dans quelques instants.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* ... tes champs actuels ... */}
            <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
          >
            Nom
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Votre nom"
            className="mt-3 w-full border-b border-[#292929] bg-transparent px-0 py-4 text-sm text-white outline-none transition-colors placeholder:text-neutral-700 focus:border-[#d00018]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            className="mt-3 w-full border-b border-[#292929] bg-transparent px-0 py-4 text-sm text-white outline-none transition-colors placeholder:text-neutral-700 focus:border-[#d00018]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
        >
          Entreprise / activité
        </label>

        <input
          id="company"
          name="company"
          type="text"
          placeholder="Nom de votre entreprise"
          className="mt-3 w-full border-b border-[#292929] bg-transparent px-0 py-4 text-sm text-white outline-none transition-colors placeholder:text-neutral-700 focus:border-[#d00018]"
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
        >
          Service souhaité
        </label>

        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className="mt-3 w-full border-b border-[#292929] bg-black px-0 py-4 text-sm text-neutral-400 outline-none transition-colors focus:border-[#d00018]"
        >
          <option value="" disabled>
            Sélectionner un service
          </option>

          {services.map((service) => (
            <option
              key={service.slug}
              value={service.slug}
            >
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="budget"
          className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
        >
          Budget estimé
        </label>

        <select
          id="budget"
          name="budget"
          defaultValue=""
          className="mt-3 w-full border-b border-[#292929] bg-black px-0 py-4 text-sm text-neutral-400 outline-none transition-colors focus:border-[#d00018]"
        >
          <option value="" disabled>
            Sélectionner une fourchette
          </option>

          <option value="under-500">
            Moins de 500 €
          </option>

          <option value="500-1000">
            500 € – 1 000 €
          </option>

          <option value="1000-2500">
            1 000 € – 2 500 €
          </option>

          <option value="2500-5000">
            2 500 € – 5 000 €
          </option>

          <option value="5000-plus">
            Plus de 5 000 €
          </option>

          <option value="not-defined">
            Je ne sais pas encore
          </option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500"
        >
          Votre projet
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="Décrivez votre projet, vos objectifs et vos besoins..."
          className="mt-3 w-full resize-none border border-[#292929] bg-transparent p-5 text-sm leading-7 text-white outline-none transition-colors placeholder:text-neutral-700 focus:border-[#d00018]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#d00018] px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting
          ? "Envoi en cours..."
          : "Envoyer ma demande"}
      </button>

      {status && (
        <p
          className={`text-sm leading-6 ${
            status.type === "success"
              ? "text-green-500"
              : "text-red-400"
          }`}
        >
          {status.message}
        </p>
      )}

      <p className="text-xs leading-6 text-neutral-600">
        Vos informations seront utilisées uniquement pour
        répondre à votre demande de projet.
      </p>
    </form>
  );
}
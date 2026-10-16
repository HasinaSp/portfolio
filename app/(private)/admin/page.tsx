import Link from "next/link";
import type { ContactStatus, Prisma } from "@prisma/client";

import AvailabilityControl from "@/components/admin/AvailabilityControl";
import StatusBadge from "@/components/admin/StatusBadge";
import { requireAdmin } from "@/lib/admin";
import { getAvailable } from "@/lib/availability";
import {
  CONTACT_STATUSES,
  budgetLabel,
  formatRequestDate,
  isContactStatus,
  serviceLabel,
  statusMeta,
} from "@/lib/contact-requests";
import { prisma } from "@/lib/db";

const PAGE_SIZE = 20;

type AdminPageProps = {
  searchParams: Promise<{ statut?: string; page?: string; supprimee?: string }>;
};

function pageHref(status: ContactStatus | null, page: number) {
  const params = new URLSearchParams();
  if (status) params.set("statut", status);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/admin?${query}` : "/admin";
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();

  const { statut, page: rawPage, supprimee } = await searchParams;
  const status = isContactStatus(statut) ? statut : null;
  const page = Math.max(1, Number.parseInt(rawPage ?? "1", 10) || 1);
  const where: Prisma.ContactRequestWhereInput = status ? { status } : {};

  const [counts, requests, filteredTotal, available] = await Promise.all([
    prisma.contactRequest.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.contactRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        service: true,
        budget: true,
        message: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.contactRequest.count({ where }),
    getAvailable(),
  ]);

  const countFor = (value: ContactStatus) =>
    counts.find((row) => row.status === value)?._count._all ?? 0;
  const total = counts.reduce((sum, row) => sum + row._count._all, 0);
  const totalPages = Math.max(1, Math.ceil(filteredTotal / PAGE_SIZE));

  const tabs = [
    { status: null, label: "Toutes", count: total },
    ...CONTACT_STATUSES.map((value) => ({
      status: value,
      label: statusMeta[value].plural,
      count: countFor(value),
    })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            Demandes de contact<span className="text-[#d00018]">.</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            {countFor("NEW") > 0
              ? `${countFor("NEW")} nouvelle(s) demande(s) à traiter.`
              : "Aucune nouvelle demande à traiter."}
          </p>
        </div>
      </div>

      <AvailabilityControl available={available} acceptedCount={countFor("ACCEPTED")} />

      {supprimee && (
        <p
          role="status"
          className="mt-6 border border-emerald-900/60 bg-emerald-950/20 p-3 text-sm text-emerald-400"
        >
          Demande supprimée.
        </p>
      )}

      <nav aria-label="Filtrer par statut" className="mt-8 overflow-x-auto">
        <ul className="flex min-w-max gap-2 border-b border-[#1f1f1f] pb-4">
          {tabs.map((tab) => {
            const active = tab.status === status;
            return (
              <li key={tab.label}>
                <Link
                  href={pageHref(tab.status, 1)}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                    active
                      ? "border-white bg-white text-black"
                      : "border-[#2a2a2a] text-neutral-400 hover:border-neutral-500 hover:text-white"
                  }`}
                >
                  {tab.label}
                  <span className="tabular-nums text-xs text-neutral-500">
                    {tab.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {requests.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-[#2a2a2a] p-12 text-center text-sm text-neutral-500">
          {status
            ? `Aucune demande « ${statusMeta[status].label.toLowerCase()} ».`
            : "Aucune demande pour le moment."}
        </p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {requests.map((request) => (
            <li key={request.id}>
              <Link
                href={`/admin/demandes/${request.id}`}
                className={`group block rounded-2xl border p-5 transition-colors sm:p-6 ${
                  request.status === "NEW"
                    ? "border-[#d00018]/30 bg-[#d00018]/[0.04] hover:border-[#d00018]/70"
                    : "border-[#1f1f1f] bg-[#050505] hover:border-[#333]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-medium text-white transition-colors group-hover:text-[#ff4d5e]">
                      {request.name}
                      {request.company && (
                        <span className="text-neutral-500"> · {request.company}</span>
                      )}
                    </p>
                    <p className="mt-1 truncate text-sm text-neutral-500">{request.email}</p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-neutral-400">
                  {request.message}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-neutral-500">
                  <span>{serviceLabel(request.service)}</span>
                  <span>{budgetLabel(request.budget)}</span>
                  <time dateTime={request.createdAt.toISOString()}>
                    {formatRequestDate(request.createdAt)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-8 flex items-center justify-between gap-3 text-sm"
        >
          {page > 1 ? (
            <Link
              href={pageHref(status, page - 1)}
              rel="prev"
              className="rounded-full border border-[#2a2a2a] px-4 py-2 hover:border-neutral-500"
            >
              ← Précédent
            </Link>
          ) : (
            <span />
          )}
          <span className="tabular-nums text-neutral-500">
            Page {page} sur {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={pageHref(status, page + 1)}
              rel="next"
              className="rounded-full border border-[#2a2a2a] px-4 py-2 hover:border-neutral-500"
            >
              Suivant →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}

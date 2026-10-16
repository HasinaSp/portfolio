This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Configuration

| Variable | Rôle |
| --- | --- |
| `DATABASE_URL` | PostgreSQL (demandes de contact, limitation de débit) |
| `AUTH_SECRET` | Secret NextAuth (`npx auth secret`) |
| `ADMIN_EMAIL` | Email du compte admin |
| `ADMIN_PASSWORD_HASH` | Hash bcrypt du mot de passe admin. **Dans `.env`, échapper chaque `$` en `\$`** (Next.js remplace sinon `$2b`, `$10`… par des variables vides). Sur Vercel, coller la valeur telle quelle. |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (sitemap, Open Graph, liens des emails) |
| `RESEND_API_KEY` | Facultatif : email à chaque nouvelle demande de contact (plan gratuit Resend) |
| `CONTACT_NOTIFY_TO` | Facultatif : destinataire de ces emails (par défaut `ADMIN_EMAIL`) |
| `CONTACT_NOTIFY_FROM` | Facultatif : expéditeur, sur un domaine vérifié chez Resend (par défaut l'adresse de test Resend) |

Contenu modifiable sans toucher aux pages : `data/projects.ts` (projets et études de cas), `data/testimonials.ts` (témoignages), `data/availability.ts` (textes du badge de disponibilité ; l'état disponible / planning complet se change depuis `/admin`).

Migrations : `npx prisma migrate deploy`.

## Langues (FR / EN)

- Le français est servi à la racine (`/projects`), l'anglais sous `/en` (`/en/projects`). `proxy.ts` réécrit les URL françaises vers `app/[lang]` ; l'admin (`app/(private)`) reste en français.
- Les textes d'une page sont dans un objet `content = { fr, en }` en haut de la page ; les textes communs (en-tête, pied de page, cartes) dans `lib/ui-text.ts` ; projets et services dans `data/` (champs `{ fr, en }`).
- Liens internes : toujours `localePath(lang, "/chemin")` (`lib/i18n.ts`).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

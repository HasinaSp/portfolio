import { notFound } from "next/navigation";

// URL inconnue : affiche la 404 traduite (app/[lang]/not-found.tsx) dans
// le layout du site, au lieu de la page 404 générique de Next.js.
export default function CatchAllPage() {
  notFound();
}

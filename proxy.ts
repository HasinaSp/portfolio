import { NextResponse } from "next/server";

import { auth } from "@/auth";

/*
 * Vérification rapide (JWT du cookie, sans base) sur l'espace admin :
 * redirige vers /login. Les pages et actions admin refont leur propre
 * contrôle côté serveur (lib/admin.ts).
 */
export const proxy = auth((request) => {
  if (request.auth?.user?.role !== "ADMIN") {
    const login = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(login);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};

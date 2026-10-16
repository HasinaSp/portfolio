import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;

// Hash factice : la comparaison bcrypt est faite même si l'email est faux,
// pour que le temps de réponse ne révèle pas l'adresse de l'admin.
const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8DPLKXt1FYlwYpQW9m1Q2ZsNQ0R5ny";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    // Session admin courte : 8 heures.
    maxAge: 8 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, request) {
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (
          !adminEmail ||
          !passwordHash ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string" ||
          credentials.password.length > 200
        ) {
          return null;
        }

        // Anti force brute : par IP, et pour le compte admin toutes IP confondues.
        const [ipAllowed, accountAllowed] = await Promise.all([
          rateLimit(`login:ip:${clientIp(request.headers)}`, 10, LOGIN_WINDOW_MS),
          rateLimit("login:admin", 20, LOGIN_WINDOW_MS),
        ]);
        if (!ipAllowed || !accountAllowed) return null;

        const emailMatches =
          credentials.email.trim().toLowerCase() === adminEmail;
        const passwordMatches = await bcrypt.compare(
          credentials.password,
          emailMatches ? passwordHash : DUMMY_HASH,
        );

        if (!emailMatches || !passwordMatches) return null;

        return {
          id: "admin",
          name: "Administrateur",
          email: process.env.ADMIN_EMAIL,
          role: "ADMIN",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});

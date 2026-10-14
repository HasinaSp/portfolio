import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
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
      async authorize(credentials) {
        const email = process.env.ADMIN_EMAIL;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (
          !email ||
          !passwordHash ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        if (
          credentials.email.trim().toLowerCase() !==
          email.trim().toLowerCase()
        ) {
          return null;
        }

        const validPassword = await bcrypt.compare(
          credentials.password,
          passwordHash,
        );

        if (!validPassword) {
          return null;
        }

        return {
          id: "admin",
          name: "Administrateur",
          email,
          role: "ADMIN",
        };
      },
    }),
  ],
});
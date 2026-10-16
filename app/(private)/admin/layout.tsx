import type { Metadata } from "next";

import AdminBar from "@/components/admin/AdminBar";
import Container from "@/components/ui/Container";
import { requireAdmin } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <Container className="py-10 sm:py-14">
      <AdminBar email={session.user?.email} />
      <div className="mt-10">{children}</div>
    </Container>
  );
}

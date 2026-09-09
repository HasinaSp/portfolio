import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({
  children,
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-24 sm:py-32", className)}
    >
      {children}
    </section>
  );
}
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center",
    "rounded-full px-6 py-3",
    "text-sm font-medium",
    "transition-all duration-300",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-[#d00018]",
    {
      "bg-[#d00018] text-white hover:bg-[#b60015]":
        variant === "primary",

      "border border-[#2a2a2a] bg-transparent text-white hover:border-[#d00018] hover:bg-[#190003]":
        variant === "secondary",

      "text-white hover:text-[#d00018]":
        variant === "ghost",
    },
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles}>
      {children}
    </button>
  );
}
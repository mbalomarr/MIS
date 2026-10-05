"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

interface NavLinkProps extends NavItem {
  onNavigate?: () => void;
  className?: string;
}

/**
 * A primary-nav link. Light over the transparent header, ink once the header
 * is solid (driven by the header's `data-solid` attribute), cyan when current.
 */
export function NavLink({ label, href, onNavigate, className }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = !href.includes("#") && pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ease-brand",
        "text-paper hover:text-signal-300",
        "group-data-[solid=true]/header:text-ink-800 group-data-[solid=true]/header:hover:text-signal-700",
        isCurrent && "text-signal-300 group-data-[solid=true]/header:text-signal-700 font-semibold",
        className,
      )}
    >
      {label}
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * "light" = light-ink logo for dark backgrounds, "dark" = dark-ink logo for light ones,
   * "auto" = both stacked, cross-fading on the parent's `data-solid` state (used by the navbar).
   */
  tone?: "light" | "dark" | "auto";
  className?: string;
  onClick?: () => void;
}

const LIGHT_SRC = "/brand/logo-reversed.svg";
const DARK_SRC = "/brand/logo.svg";

/** The animated MIS Club logo, linking home. */
export function Logo({ tone = "auto", className, onClick }: LogoProps) {
  return (
    <Link href="/" onClick={onClick} className={cn("relative block w-40 shrink-0 lg:w-48", className)}>
      <span className="sr-only">
        {siteConfig.name} — {siteConfig.university}, home
      </span>
      {tone !== "dark" && (
        <Image
          src={LIGHT_SRC}
          alt=""
          width={200}
          height={70}
          loading="eager"
          className={cn(
            "h-auto w-full transition-opacity duration-300 ease-brand",
            tone === "auto" && "group-data-[solid=true]/header:opacity-0",
          )}
        />
      )}
      {tone !== "light" && (
        <Image
          src={DARK_SRC}
          alt=""
          width={200}
          height={70}
          loading="eager"
          className={cn(
            "h-auto w-full transition-opacity duration-300 ease-brand",
            tone === "auto" && "absolute inset-0 opacity-0 group-data-[solid=true]/header:opacity-100",
          )}
        />
      )}
    </Link>
  );
}

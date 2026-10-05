import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { FooterColumn } from "@/lib/site";

const linkClass = "inline-flex items-center gap-1.5 text-sm transition-colors hover:text-signal-300";

/** One titled list of links in the footer. External links open in a new tab. */
export function FooterLinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h2 className="mb-3 text-sm tracking-[0.12em] text-white uppercase">{column.heading}</h2>
      <ul className="grid gap-2">
        {column.links.map(({ label, href, external }) => (
          <li key={href}>
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {label}
                <ExternalLink size={12} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <Link href={href} className={linkClass}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

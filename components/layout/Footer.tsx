import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ExternalLink, Mail, MapPin } from "lucide-react";
import { GitHubIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { footerColumns, siteConfig } from "@/lib/site";
import { FooterLinkColumn } from "./FooterLinkColumn";

const socialLinks = [
  { label: "GitHub", href: siteConfig.links.githubRepo, Icon: GitHubIcon },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: InstagramIcon },
];

/** Site footer: PMU + club branding, contact details, navigation columns and GitHub. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 pt-16 text-ink-300">
      <Container className="grid gap-12 pb-12 lg:grid-cols-[1fr_1.3fr]">
        {/* --- Brand + contact --- */}
        <div>
          <Image
            src="/brand/03-horizontal-dark-transparent.svg"
            alt={`${siteConfig.clubName} — ${siteConfig.universityShort}`}
            width={260}
            height={92}
            className="h-auto w-56"
          />
          <p className="mt-3 text-xs tracking-[0.14em] text-signal-300 uppercase">{siteConfig.university}</p>
          <p className="mt-4 max-w-sm text-sm">
            The hub for the Management Information Systems major and the official website of the MIS Student Club.
          </p>

          <address className="mt-6 grid gap-3 text-sm not-italic">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-3 transition-colors hover:text-signal-300"
            >
              <Mail size={18} className="shrink-0 text-signal-500" aria-hidden="true" />
              {siteConfig.contact.email}
            </a>
            <span className="inline-flex items-center gap-3">
              <MapPin size={18} className="shrink-0 text-signal-500" aria-hidden="true" />
              {siteConfig.contact.location}
            </span>
          </address>

          <ul className="mt-6 flex gap-2" aria-label="Social links">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 place-items-center rounded-full border border-paper/15 text-paper transition duration-300 ease-brand hover:-translate-y-0.5 hover:border-signal-300 hover:text-signal-300"
                >
                  <Icon size={18} />
                  <span className="sr-only">{label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Link columns --- */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerColumns.map((column) => (
            <FooterLinkColumn key={column.heading} column={column} />
          ))}
        </nav>
      </Container>

      {/* --- Bottom bar --- */}
      <div className="border-t border-paper/10">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 text-xs">
          <p>
            &copy; {year} {siteConfig.clubName} — {siteConfig.university}. All rights reserved.
          </p>
          <a
            href={siteConfig.links.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono transition-colors hover:text-signal-300"
          >
            <GitHubIcon size={16} />
            {siteConfig.links.githubRepo.replace("https://", "")}
            <ExternalLink size={12} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <Link href="#top" className="inline-flex items-center gap-1 transition-colors hover:text-signal-300">
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </Link>
        </Container>
      </div>
    </footer>
  );
}

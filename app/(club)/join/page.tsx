import type { Metadata } from "next";
import { Check, Mail, MapPin } from "lucide-react";
import { JoinForm } from "@/components/forms/JoinForm";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { joinPage } from "@/content/registration";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the Club",
  description: "Register as a member of the MIS Club at Prince Mohammad Bin Fahd University. Free and open to every major.",
};

export default function JoinPage() {
  const contact = [
    { icon: Mail, label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: MapPin, label: siteConfig.contact.location },
  ];

  return (
    <>
      <PageHero eyebrow={joinPage.eyebrow} title={joinPage.title} description={joinPage.description} />

      <section aria-label="Registration" className="bg-paper py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <h2 className="mb-6 text-2xl text-ink-800">{joinPage.perksTitle}</h2>
            <ul className="mb-10 grid gap-4">
              {joinPage.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-ink-600">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-signal-100 text-signal-700">
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <address className="grid gap-3 border-t border-paper-200 pt-6 text-sm text-ink-400 not-italic">
              {contact.map(({ icon: Icon, label, href }) => {
                const content = (
                  <>
                    <Icon size={18} className="shrink-0 text-signal-700" aria-hidden="true" />
                    {label}
                  </>
                );
                return href ? (
                  <a key={label} href={href} className="inline-flex items-center gap-3 hover:text-signal-700">
                    {content}
                  </a>
                ) : (
                  <span key={label} className="inline-flex items-center gap-3">
                    {content}
                  </span>
                );
              })}
              <a
                href={siteConfig.links.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 hover:text-signal-700"
              >
                <GitHubIcon size={18} className="shrink-0 text-signal-700" />
                {siteConfig.links.githubRepo.replace("https://", "")}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </address>
          </div>

          <JoinForm />
        </Container>
      </section>
    </>
  );
}

import { EventCard } from "@/components/cards/EventCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clubCommunity, events } from "@/content/events";
import { todayIso } from "@/lib/dates";
import { joinLink, sectionIds } from "@/lib/site";

/** The MIS Club and its activities. Upcoming events are listed first; past ones are marked. */
export function ClubCommunity() {
  const today = todayIso();
  const ordered = [...events].sort((a, b) => {
    const aPast = a.date < today;
    const bPast = b.date < today;
    if (aPast !== bPast) return aPast ? 1 : -1;
    return aPast ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
  });

  return (
    <section id={sectionIds.misClub} aria-labelledby="mis-club-title" className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="mis-club-title"
          eyebrow={clubCommunity.eyebrow}
          title={clubCommunity.title}
          description={clubCommunity.description}
          action={<ButtonLink href={joinLink.href}>Join the Club</ButtonLink>}
        />

        <h3 className="mb-6 text-xl text-ink-800">Activities</h3>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((event) => (
            <li key={`${event.date}-${event.title}`}>
              <EventCard event={event} isPast={event.date < today} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

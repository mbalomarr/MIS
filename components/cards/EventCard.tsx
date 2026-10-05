import { Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatEventDate } from "@/lib/dates";
import { joinLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { ClubEvent, EventType } from "@/types/content";

const TYPE_LABELS: Record<EventType, string> = {
  bootcamp: "Bootcamp",
  talk: "Tech Talk",
  competition: "Competition",
};

interface EventCardProps {
  event: ClubEvent;
  /** Past events are dimmed and lose their Register button */
  isPast: boolean;
}

/** A club activity: date block, type badge, details and a register action. */
export function EventCard({ event, isPast }: EventCardProps) {
  const { day, month } = formatEventDate(event.date);
  const meta = [
    { icon: MapPin, text: event.location },
    { icon: Clock, text: event.time },
    { icon: Users, text: event.capacity },
  ];

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-card border border-paper-200 bg-white p-6 shadow-hairline transition duration-300 ease-brand",
        isPast ? "opacity-75" : "hover:-translate-y-1 hover:border-signal-300 hover:shadow-lift",
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <time
          dateTime={event.date}
          className={cn(
            "grid size-[68px] shrink-0 place-content-center rounded-lg text-center",
            isPast ? "bg-ink-400 text-white" : "bg-ink-800 text-white",
          )}
        >
          <span className="text-2xl leading-none font-bold tabular-nums">{day}</span>
          <span className="text-xs tracking-[0.14em] text-signal-300 uppercase">{month}</span>
        </time>
        <div className="flex flex-wrap justify-end gap-2">
          <Badge tone={event.type}>{TYPE_LABELS[event.type]}</Badge>
          {isPast && <Badge tone="neutral">Past</Badge>}
        </div>
      </div>

      <h3 className="mb-2 text-lg text-ink-800">{event.title}</h3>
      <p className="mb-5 flex-1 text-sm text-ink-400">{event.description}</p>

      <ul className="mb-6 grid gap-2 text-xs text-ink-400">
        {meta.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <Icon size={14} className="shrink-0 text-signal-700" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>

      {!isPast && (
        <ButtonLink href={joinLink.href} size="sm" className="self-start">
          Register
          <span className="sr-only"> for {event.title}</span>
        </ButtonLink>
      )}
    </article>
  );
}

import type { Pillar } from "@/types/content";

/** One core pillar of the major: icon, title, description and optional tool chips. */
export function PillarCard({ icon: Icon, title, description, tools }: Pillar) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-paper-200 bg-white p-6 shadow-hairline transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-lift">
      <span className="mb-5 grid size-12 place-items-center rounded-lg bg-signal-100 text-signal-700">
        <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <h3 className="mb-3 text-xl text-ink-800">{title}</h3>
      <p className="text-sm text-ink-400">{description}</p>

      {tools && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools">
          {tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-paper-200 bg-paper px-3 py-1 font-mono text-xs font-medium text-ink-700"
            >
              {tool}
            </li>
          ))}
        </ul>
      )}

      {/* Cyan underline that sweeps in on hover, from the original pillar cards */}
      <span
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-signal-500 to-transparent transition-transform duration-300 ease-brand group-hover:scale-x-100"
        aria-hidden="true"
      />
    </article>
  );
}

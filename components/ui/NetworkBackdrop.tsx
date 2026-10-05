import { cn } from "@/lib/utils";

/** Node positions and sizes from the original hero SVG: [cx, cy, r]. */
const NODES: ReadonlyArray<readonly [number, number, number]> = [
  [180, 520, 5],
  [340, 380, 4],
  [520, 440, 6],
  [700, 260, 4],
  [900, 320, 5],
  [1040, 180, 4],
  [300, 180, 5],
  [640, 600, 4],
  [880, 560, 5],
];

/** Staggered start times so the nodes glow out of step, as in the original. */
const DELAYS = ["0s", "0.8s", "1.6s"];

interface NetworkBackdropProps {
  /** Keeps SVG ids unique when more than one backdrop is on a page */
  idPrefix: string;
  className?: string;
}

/** Decorative grid + node network with glowing nodes, for dark sections. */
export function NetworkBackdrop({ idPrefix, className }: NetworkBackdropProps) {
  const patternId = `${idPrefix}-grid`;
  const fadeId = `${idPrefix}-fade`;
  const maskId = `${idPrefix}-mask`;

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={patternId} width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0H0V60" fill="none" stroke="#2FB8C6" strokeWidth="0.5" opacity="0.18" />
        </pattern>
        <radialGradient id={fadeId} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="1200" height="700" fill={`url(#${fadeId})`} />
        </mask>
      </defs>

      <rect width="1200" height="700" fill={`url(#${patternId})`} mask={`url(#${maskId})`} />

      <g stroke="#2FB8C6" strokeWidth="1" opacity="0.16" fill="none">
        <path d="M180 520 L340 380 L520 440 L700 260 L900 320 L1040 180" />
        <path d="M120 240 L300 180 L520 440 L640 600 L880 560 L1060 470" />
      </g>

      <g fill="#2FB8C6">
        {NODES.map(([cx, cy, r], index) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={r}
            className="animate-node-glow"
            style={{ animationDelay: DELAYS[index % DELAYS.length] }}
          />
        ))}
      </g>
    </svg>
  );
}

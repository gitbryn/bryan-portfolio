import { ClipboardList, PenTool, Play, SearchCheck, ShieldCheck, type LucideIcon } from 'lucide-react';

interface Node {
  label: string;
  index: string;
  icon: LucideIcon;
  x: number;
  y: number;
  w?: number;
  release?: boolean;
}

// Nodes sit on the connector path defined in index.css (.pipeline-dot offset-path).
const nodes: Node[] = [
  { label: 'Plan', index: '01', icon: ClipboardList, x: 30, y: 40 },
  { label: 'Design', index: '02', icon: PenTool, x: 280, y: 40 },
  { label: 'Execute', index: '03', icon: Play, x: 280, y: 170 },
  { label: 'Validate', index: '04', icon: SearchCheck, x: 30, y: 170 },
  { label: 'Release-ready', index: '05', icon: ShieldCheck, x: 120, y: 300, w: 220, release: true },
];

/**
 * Illustration of how quality flows through a release: plan → design →
 * execute → validate → release, with a retest loop. Decorative, not live data.
 */
export function PipelineVisual() {
  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-2 p-4 shadow-card sm:p-6">
        <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
        <svg
          viewBox="0 0 460 390"
          className="relative w-full"
          role="img"
          aria-label="Illustration of a quality pipeline: plan, design, execute, validate, then release-ready, with a retest loop between validate and execute."
        >
          {/* Connectors */}
          <path d="M105 68 H355 V198 H105 V328 H230" fill="none" className="stroke-line" strokeWidth="2" />
          <path
            d="M105 68 H355 V198 H105 V328 H230"
            fill="none"
            className="pipeline-flow stroke-accent-line"
            strokeWidth="2"
          />
          {/* Retest loop between Validate and Execute */}
          <path
            d="M170 226 C170 268, 290 268, 290 226"
            fill="none"
            className="stroke-accent"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity="0.7"
          />
          <path d="m286 232 4-7 4 7" fill="none" className="stroke-accent" strokeWidth="1.5" opacity="0.7" />
          <text x="230" y="276" textAnchor="middle" className="fill-subtle font-mono" fontSize="10" letterSpacing="1.5">
            RETEST LOOP
          </text>

          <circle r="5" className="pipeline-dot fill-accent" />

          {nodes.map(({ label, index, icon: Icon, x, y, w = 150, release }) => (
            <g key={label}>
              <rect
                x={x}
                y={y}
                width={w}
                height={56}
                rx={14}
                className={release ? 'fill-surface stroke-accent' : 'fill-surface stroke-line'}
                strokeWidth={release ? 1.5 : 1}
              />
              <rect
                x={x + 12}
                y={y + 12}
                width={32}
                height={32}
                rx={9}
                className={release ? 'fill-accent' : 'fill-accent-soft'}
              />
              <Icon
                x={x + 19}
                y={y + 19}
                width={18}
                height={18}
                strokeWidth={2}
                className={release ? 'text-on-accent' : 'text-accent'}
                aria-hidden="true"
              />
              <text x={x + 56} y={y + 24} className="fill-subtle font-mono" fontSize="10" letterSpacing="1">
                {index}
              </text>
              <text x={x + 56} y={y + 41} className="fill-fg font-display" fontSize="15" fontWeight="700">
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] tracking-[0.12em] text-subtle uppercase">
        How quality moves through a release
      </figcaption>
    </figure>
  );
}

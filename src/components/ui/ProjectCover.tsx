/**
 * Drawn cover art for project cards. Each motif is a small line drawing of
 * what the project actually does, so the grid reads at a glance instead of
 * showing a wall of identical GitHub preview images.
 *
 * All strokes use currentColor (the accent) or the muted ink, so covers follow
 * the light/dark theme automatically.
 */

import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { CoverMotif } from '@/lib/data'

interface ProjectCoverProps {
  motif: CoverMotif
  caption?: string
  className?: string
}

const ProjectCover: FC<ProjectCoverProps> = ({ motif, caption, className }) => (
  <div
    className={cn('relative aspect-[16/9] overflow-hidden bg-plate text-accent', className)}
    style={{
      backgroundImage: 'radial-gradient(var(--line-strong) 0.75px, transparent 0.75px)',
      backgroundSize: '14px 14px',
    }}
  >
    <svg
      viewBox="0 0 320 180"
      className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {motifs[motif]}
    </svg>
    {caption && (
      <span className="absolute bottom-2.5 left-3 rounded bg-plate px-1.5 py-0.5 font-mono text-[11px] text-muted">
        {caption}
      </span>
    )}
  </div>
)

export default ProjectCover

// Shared stroke styles
const ink = { stroke: 'var(--muted)', strokeWidth: 1.2, opacity: 0.55 }
const accent = { stroke: 'currentColor', strokeWidth: 1.6 }

const motifs: Record<CoverMotif, ReactNode> = {
  // Football pitch with a highlighted pass
  pitch: (
    <>
      <g {...ink}>
        <rect x="40" y="24" width="240" height="132" rx="2" />
        <line x1="160" y1="24" x2="160" y2="156" />
        <circle cx="160" cy="90" r="20" />
        <rect x="40" y="58" width="34" height="64" />
        <rect x="246" y="58" width="34" height="64" />
        <rect x="40" y="76" width="12" height="28" />
        <rect x="268" y="76" width="12" height="28" />
      </g>
      {[[92, 50], [100, 128], [128, 90], [196, 60], [208, 116], [236, 90]].map(([x, y]) => (
        <circle key={`a${x}`} cx={x} cy={y} r="3.5" stroke="var(--muted)" strokeWidth="1.2" />
      ))}
      {[[70, 90], [110, 72], [118, 116], [150, 132], [182, 92], [224, 70]].map(([x, y]) => (
        <circle key={`h${x}`} cx={x} cy={y} r="3.5" fill="currentColor" />
      ))}
      <path d="M118 116 Q 168 40 224 70" {...accent} strokeDasharray="4 4" />
      <path d="M216 63 L224 70 L214 73" {...accent} />
    </>
  ),

  // ECG trace feeding an attribution heatmap
  pulse: (
    <>
      <polyline
        points="24,96 64,96 74,96 82,78 90,112 98,52 108,124 116,96 150,96 160,96 168,82 176,108 184,60 194,118 202,96 214,96"
        {...accent}
      />
      <line x1="24" y1="130" x2="214" y2="130" {...ink} />
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => {
          const v = [0.15, 0.3, 0.8, 0.45, 0.1, 0.25, 0.9, 0.6, 0.2, 0.1, 0.1, 0.55, 1, 0.7, 0.3, 0.05, 0.2, 0.65, 0.4, 0.15, 0.1, 0.1, 0.3, 0.2, 0.05][row * 5 + col]
          return (
            <rect
              key={`${row}-${col}`}
              x={230 + col * 14}
              y={56 + row * 14}
              width="12"
              height="12"
              rx="1.5"
              fill="currentColor"
              opacity={v}
            />
          )
        })
      )}
    </>
  ),

  // Scatter with a fitted regression line and residuals
  scatter: (
    <>
      <g {...ink}>
        <line x1="40" y1="152" x2="290" y2="152" />
        <line x1="40" y1="28" x2="40" y2="152" />
      </g>
      {[
        [58, 132], [70, 140], [82, 118], [96, 126], [104, 108], [118, 116], [128, 98], [140, 104],
        [150, 88], [164, 96], [172, 78], [186, 84], [198, 70], [206, 80], [220, 60], [232, 68],
        [244, 52], [256, 60], [268, 44], [278, 50],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3" fill="var(--muted)" opacity="0.7" />
      ))}
      {[[96, 126, 117], [164, 96, 86], [220, 60, 66]].map(([x, y, fy]) => (
        <line key={x} x1={x} y1={y} x2={x} y2={fy} {...accent} strokeWidth={1} strokeDasharray="2 3" />
      ))}
      <line x1="50" y1="140" x2="286" y2="42" {...accent} />
    </>
  ),

  // Monthly sales bars with a rising trend line
  bars: (
    <>
      <line x1="40" y1="152" x2="288" y2="152" {...ink} />
      {[46, 40, 52, 44, 58, 62, 74, 86, 98].map((h, i) => (
        <rect
          key={i}
          x={50 + i * 26}
          y={152 - h}
          width="16"
          height={h}
          rx="1.5"
          fill={i >= 6 ? 'currentColor' : 'var(--muted)'}
          opacity={i >= 6 ? 0.85 : 0.3}
        />
      ))}
      <polyline points="58,110 84,110 110,104 136,104 162,96 188,88 214,76 240,62 266,48" {...accent} />
      <text x="266" y="34" textAnchor="middle" className="font-mono" fontSize="11" fill="currentColor">
        +17%
      </text>
    </>
  ),

  // Property listing UI: search bar and a grid of cards
  listings: (
    <>
      <g {...ink}>
        <rect x="44" y="22" width="232" height="138" rx="5" />
        <line x1="44" y1="38" x2="276" y2="38" />
        <rect x="58" y="48" width="150" height="12" rx="6" />
      </g>
      <rect x="216" y="48" width="46" height="12" rx="6" fill="currentColor" opacity="0.85" />
      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => {
          const x = 58 + col * 72
          const y = 70 + row * 44
          const hi = col === 1 && row === 0
          return (
            <g key={`${col}-${row}`}>
              <rect x={x} y={y} width="62" height="36" rx="3" {...(hi ? accent : ink)} />
              <path d={`M${x + 8} ${y + 22} l10 -10 l10 10 v8 h-20 z`} {...(hi ? accent : ink)} strokeWidth={1} />
              <line x1={x + 34} y1={y + 14} x2={x + 54} y2={y + 14} {...ink} />
              <line x1={x + 34} y1={y + 22} x2={x + 48} y2={y + 22} {...ink} />
            </g>
          )
        })
      )}
    </>
  ),

  // Video-call grid with the active speaker highlighted
  classroom: (
    <>
      {[[56, 30], [164, 30], [56, 98], [164, 98]].map(([x, y], i) => {
        const hi = i === 0
        return (
          <g key={i}>
            <rect x={x} y={y} width="100" height="58" rx="4" {...(hi ? accent : ink)} />
            <circle cx={x + 50} cy={y + 24} r="9" {...(hi ? accent : ink)} />
            <path d={`M${x + 32} ${y + 52} q18 -18 36 0`} {...(hi ? accent : ink)} />
          </g>
        )
      })}
    </>
  ),

  // Connect 4 board mid-game
  board: (
    <>
      <rect x="78" y="22" width="164" height="140" rx="8" {...ink} />
      {Array.from({ length: 7 }).map((_, col) =>
        Array.from({ length: 6 }).map((_, row) => {
          // Heights per column, bottom-up; alternating owners.
          const heights = [1, 2, 4, 3, 2, 1, 0]
          const filled = 5 - row < heights[col]
          const mine = (col + row) % 2 === 0
          return (
            <circle
              key={`${col}-${row}`}
              cx={92 + col * 22.6}
              cy={38 + row * 22.6}
              r="8"
              {...(filled
                ? { fill: mine ? 'currentColor' : 'var(--muted)', opacity: mine ? 0.9 : 0.45 }
                : { stroke: 'var(--muted)', strokeWidth: 1, opacity: 0.4 })}
            />
          )
        })
      )}
    </>
  ),

  // Agent / network graph
  nodes: (
    <>
      <g {...ink}>
        <line x1="160" y1="90" x2="84" y2="50" />
        <line x1="160" y1="90" x2="80" y2="132" />
        <line x1="160" y1="90" x2="236" y2="46" />
        <line x1="160" y1="90" x2="244" y2="128" />
        <line x1="84" y1="50" x2="80" y2="132" />
        <line x1="236" y1="46" x2="244" y2="128" />
      </g>
      <line x1="160" y1="90" x2="236" y2="46" {...accent} />
      {[[84, 50], [80, 132], [244, 128]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="10" fill="var(--cover)" stroke="var(--muted)" strokeWidth="1.2" />
      ))}
      <circle cx="236" cy="46" r="10" fill="var(--cover)" {...accent} />
      <circle cx="160" cy="90" r="16" fill="currentColor" opacity="0.9" />
    </>
  ),

  // 2048 tiles
  tiles: (
    <>
      <rect x="94" y="24" width="132" height="132" rx="6" {...ink} />
      {['2', '', '4', '', '', '8', '', '2', '16', '64', '4', '', '128', '512', '2048', '32'].map((n, i) => {
        const x = 102 + (i % 4) * 30.5
        const y = 32 + Math.floor(i / 4) * 30.5
        const strength = n ? Math.min(1, Math.log2(Number(n)) / 11) : 0
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="25"
              height="25"
              rx="3"
              fill={n ? 'currentColor' : 'none'}
              opacity={n ? 0.15 + strength * 0.8 : 1}
              stroke={n ? 'none' : 'var(--muted)'}
              strokeOpacity="0.35"
            />
            {n && (
              <text
                x={x + 12.5}
                y={y + 16}
                textAnchor="middle"
                className="font-mono"
                fontSize={n.length > 3 ? 7 : 9}
                fill={strength > 0.5 ? 'var(--cover)' : 'var(--ink-2)'}
              >
                {n}
              </text>
            )}
          </g>
        )
      })}
    </>
  ),

  // Battery level beside a charge/temperature curve
  battery: (
    <>
      <rect x="54" y="48" width="56" height="96" rx="6" {...ink} />
      <rect x="72" y="40" width="20" height="8" rx="2" {...ink} />
      <rect x="62" y="80" width="40" height="56" rx="3" fill="currentColor" opacity="0.85" />
      <g {...ink}>
        <line x1="140" y1="144" x2="280" y2="144" />
        <line x1="140" y1="40" x2="140" y2="144" />
      </g>
      <path d="M140 132 C 170 128, 190 70, 220 62 S 262 58, 280 56" {...accent} />
      <path d="M140 118 C 172 116, 196 104, 224 100 S 262 108, 280 104" stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="3 4" />
    </>
  ),

  // Bookshelf
  books: (
    <>
      <line x1="56" y1="150" x2="264" y2="150" {...ink} />
      {[
        [64, 18, 96], [84, 14, 84], [100, 22, 104], [124, 16, 90], [142, 12, 74], [156, 20, 100],
        [178, 16, 86], [196, 24, 110],
      ].map(([x, w, h], i) => (
        <rect
          key={i}
          x={x}
          y={150 - h}
          width={w}
          height={h}
          rx="1.5"
          {...(i === 2 || i === 5 ? { fill: 'currentColor', opacity: 0.8 } : ink)}
        />
      ))}
      <rect x="224" y="62" width="18" height="88" rx="1.5" transform="rotate(14 233 150)" {...accent} />
    </>
  ),

  // Coffee cup from above, with tasting-note rings
  cup: (
    <>
      <circle cx="140" cy="90" r="56" {...ink} />
      <circle cx="140" cy="90" r="38" {...accent} />
      <circle cx="140" cy="90" r="30" fill="currentColor" opacity="0.18" />
      <path d="M140 80 c-6 -8 -18 -2 -12 8 l12 12 l12 -12 c6 -10 -6 -16 -12 -8z" fill="currentColor" opacity="0.7" />
      <rect x="178" y="82" width="26" height="16" rx="8" {...accent} />
      <g {...ink}>
        <line x1="226" y1="58" x2="276" y2="58" />
        <line x1="226" y1="76" x2="266" y2="76" />
        <line x1="226" y1="94" x2="272" y2="94" />
        <line x1="226" y1="112" x2="256" y2="112" />
      </g>
    </>
  ),

  // Branching story paths with one route highlighted
  branches: (
    <>
      <g {...ink}>
        <path d="M60 90 C 90 90, 96 50, 126 50" />
        <path d="M126 50 C 156 50, 162 34, 192 34" />
        <path d="M126 130 C 156 130, 162 146, 192 146" />
        <path d="M192 90 C 222 90, 228 118, 258 118" />
        <path d="M192 34 C 222 34, 228 30, 258 30" />
      </g>
      <path d="M60 90 C 90 90, 96 130, 126 130 C 156 130, 162 90, 192 90 C 222 90, 228 62, 258 62" {...accent} />
      <circle cx="60" cy="90" r="5" fill="currentColor" />
      {[[126, 50], [192, 34], [192, 146]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4" fill="var(--cover)" stroke="var(--muted)" strokeWidth="1.2" />
      ))}
      {[[126, 130], [192, 90]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4" fill="var(--cover)" {...accent} />
      ))}
      {[[258, 30], [258, 118]].map(([x, y]) => (
        <rect key={y} x={x - 4} y={y - 4} width="8" height="8" stroke="var(--muted)" strokeWidth="1.2" />
      ))}
      <rect x="254" y="58" width="8" height="8" fill="currentColor" />
    </>
  ),

  // Score list with a live fixture
  scores: (
    <>
      {[
        ['2', '1', true],
        ['0', '0', false],
        ['3', '2', false],
      ].map(([a, b, live], i) => {
        const y = 42 + i * 40
        return (
          <g key={i}>
            <rect x="62" y={y} width="196" height="30" rx="4" {...(live ? accent : ink)} />
            <circle cx="84" cy={y + 15} r="6" fill="var(--muted)" opacity="0.5" />
            <line x1="98" y1={y + 15} x2="128" y2={y + 15} {...ink} />
            <text x="160" y={y + 19} textAnchor="middle" className="font-mono" fontSize="11" fill={live ? 'currentColor' : 'var(--ink-2)'}>
              {a} – {b}
            </text>
            <line x1="192" y1={y + 15} x2="222" y2={y + 15} {...ink} />
            <circle cx="236" cy={y + 15} r="6" fill="var(--muted)" opacity="0.5" />
            {live && <circle cx="252" cy={y + 6} r="2.5" fill="currentColor" />}
          </g>
        )
      })}
    </>
  ),
}

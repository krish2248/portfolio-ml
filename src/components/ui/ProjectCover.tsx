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

export type CoverMotif = 'tracks' | 'pitch' | 'scatter' | 'nodes' | 'board'

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
  // Tau decay: three muon tracks from a displaced vertex, crossing detector layers
  tracks: (
    <>
      <g {...ink}>
        {[130, 172, 214, 256].map((x) => (
          <line key={x} x1={x} y1="26" x2={x} y2="154" />
        ))}
        <path d="M36 90 L64 52 M36 90 L70 130 M36 90 L60 146" />
      </g>
      <path d="M36 90 L92 90" {...accent} strokeDasharray="4 4" />
      <g {...accent}>
        <path d="M92 90 C 150 82, 220 60, 284 34" />
        <path d="M92 90 C 150 92, 220 92, 284 88" />
        <path d="M92 90 C 150 100, 220 124, 284 150" />
      </g>
      {[[130, 84], [172, 74], [214, 62], [256, 46], [130, 91], [172, 91], [214, 91], [256, 90], [130, 97], [172, 107], [214, 121], [256, 138]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="currentColor" />
      ))}
      <circle cx="36" cy="90" r="4" fill="var(--muted)" />
      <circle cx="92" cy="90" r="5" fill="currentColor" />
    </>
  ),

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
}

/**
 * CRT Overlay Component
 * Adds the full retro CRT monitor experience with scanlines, flicker, and noise
 */

import { FC, memo } from 'react'
import { useTheme } from '../../context/ThemeContext'

interface CRTOverlayProps {
  /** Enable/disable scanlines effect */
  scanlines?: boolean
  /** Enable/disable flicker effect */
  flicker?: boolean
  /** Enable/disable noise grain effect */
  noise?: boolean
  /** Enable/disable screen curve vignette */
  curve?: boolean
}

/**
 * Renders CRT monitor effects as fixed overlays
 * Automatically disabled in light mode (paper printout aesthetic)
 */
const CRTOverlay: FC<CRTOverlayProps> = memo(
  ({ scanlines = true, flicker = true, noise = true, curve = true }) => {
    const { theme } = useTheme()

    // Disable all effects in light mode
    if (theme === 'light') {
      return null
    }

    return (
      <div
        className="crt-overlay pointer-events-none fixed inset-0 z-[9999]"
        aria-hidden="true"
      >
        {/* Scanlines - horizontal lines across screen */}
        {scanlines && (
          <>
            {/* Static scanlines */}
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 0, 0, 0.08) 2px,
                  rgba(0, 0, 0, 0.08) 4px
                )`,
              }}
            />
            {/* Moving horizontal scan line */}
            <div
              className="absolute left-0 right-0 h-[4px] opacity-[0.08]"
              style={{
                background: 'rgba(0, 255, 65, 1)',
                animation: 'scanline-move 6s linear infinite',
              }}
            />
          </>
        )}

        {/* Flicker effect applied via CSS animation */}
        {flicker && (
          <div
            className="absolute inset-0"
            style={{
              animation: 'flicker 8s infinite',
              background: 'transparent',
            }}
          />
        )}

        {/* Noise/grain texture */}
        {noise && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Screen curve vignette effect */}
        {curve && (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                ellipse at center,
                transparent 0%,
                transparent 70%,
                rgba(0, 0, 0, 0.3) 100%
              )`,
            }}
          />
        )}
      </div>
    )
  }
)

CRTOverlay.displayName = 'CRTOverlay'

export default CRTOverlay

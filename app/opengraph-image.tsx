import { ImageResponse } from 'next/og'

export const alt = 'Alia — Directorio Social de México'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        border: '12px solid #0f172a',
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: '900',
          color: '#0f172a',
          letterSpacing: '-0.05em',
          marginBottom: 24,
        }}
      >
        ALIA
      </div>
      <div
        style={{
          fontSize: 48,
          color: '#475569',
          fontWeight: '600',
          textAlign: 'center',
          maxWidth: 900,
        }}
      >
        Encuentra y apoya causas que importan.
      </div>
    </div>,
    { ...size }
  )
}

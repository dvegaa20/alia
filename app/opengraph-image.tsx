import { ImageResponse } from 'next/og'

export const alt = 'Alia — Directorio Social de México'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#F5EEDD',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        border: '16px solid #16587B',
      }}
    >
      <div
        style={{
          fontSize: 112,
          fontWeight: '600',
          color: '#16587B',
          letterSpacing: '-0.03em',
          marginBottom: 20,
        }}
      >
        alia.
      </div>
      <div
        style={{
          fontSize: 42,
          color: '#111827',
          fontWeight: '500',
          textAlign: 'center',
          maxWidth: 900,
        }}
      >
        Encuentra y apoya causas reales en México.
      </div>
    </div>,
    { ...size }
  )
}

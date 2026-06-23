import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Home Central Stores — Hardware & Building Supplies in Owego, Vestal & Candor NY'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#1A2B1A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '6px', height: '64px',
            background: '#E8590C', borderRadius: '3px', marginRight: '20px',
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '40px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
              Home Central Stores
            </span>
            <span style={{ fontSize: '18px', color: '#AAAAAA' }}>
              hcinc.com · Owego · Vestal · Candor NY
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span style={{ fontSize: '52px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
            Hardware & Building Supplies
          </span>
          <span style={{ fontSize: '52px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
            in Southern Tier New York
          </span>
          <span style={{ fontSize: '22px', color: '#AAAAAA', marginTop: '8px' }}>
            60,000+ Products · Tools · Lumber · Paint · Contractor Zone · Special Ordering
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{
              background: '#E8590C', color: '#FFFFFF',
              fontSize: '20px', fontWeight: 600,
              padding: '12px 28px', borderRadius: '8px',
            }}>
              Shop Online
            </div>
            <div style={{
              border: '1.5px solid #444', color: '#AAAAAA',
              fontSize: '20px', padding: '12px 28px', borderRadius: '8px',
            }}>
              4 Locations in NY
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Owego', 'Vestal', 'Candor'].map((city) => (
              <div key={city} style={{
                background: '#243324', border: '1px solid #3A4A3A',
                borderRadius: '8px', padding: '12px 20px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '4px',
              }}>
                <span style={{ fontSize: '11px', color: '#888888', letterSpacing: '1px' }}>NY</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

import { ImageResponse } from 'next/og';

export const alt = 'Xtreme HD IPTV — Premium IPTV Subscription Provider';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a1730',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Blue glow left */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 70% at 15% 65%, rgba(37,99,235,0.55), transparent)',
          }}
        />
        {/* Blue glow right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 60% at 85% 30%, rgba(59,130,246,0.35), transparent)',
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 40,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 48,
              color: 'white',
            }}
          >
            X
          </div>
          <span style={{ fontSize: 44, fontWeight: 900, color: 'white' }}>
            Xtreme HD IPTV
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 28,
            maxWidth: 980,
            position: 'relative',
          }}
        >
          Premium IPTV Subscription in HD & 4K
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: 26,
            color: '#93c5fd',
            textAlign: 'center',
            fontWeight: 600,
            position: 'relative',
            marginBottom: 44,
          }}
        >
          Instant Activation · 24/7 WhatsApp & Telegram Support
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            position: 'relative',
          }}
        >
          {['HD & 4K Quality', 'All Devices', 'Live TV & VOD', '24/7 Support'].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  padding: '10px 24px',
                  background: 'rgba(37,99,235,0.18)',
                  border: '1px solid rgba(59,130,246,0.45)',
                  borderRadius: 999,
                  fontSize: 19,
                  color: '#bfdbfe',
                  fontWeight: 600,
                }}
              >
                {badge}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}

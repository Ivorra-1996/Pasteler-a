import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Dulce encanto — Pastelería artesanal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FBF3E6',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 300,
            height: 300,
            border: '3px solid #C1652B',
            marginBottom: 40,
          }}
        >
          <div style={{ display: 'flex', width: '60%', height: 3, backgroundColor: '#C1652B', marginBottom: 18 }} />
          <div
            style={{
              display: 'flex',
              fontSize: 44,
              fontStyle: 'italic',
              fontWeight: 700,
              color: '#4A2A14',
            }}
          >
            Dulce encanto
          </div>
          <div style={{ display: 'flex', width: '60%', height: 3, backgroundColor: '#C1652B', marginTop: 18 }} />
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#6B5540',
          }}
        >
          Pastelería artesanal — tortas hechas a pedido
        </div>
      </div>
    ),
    { ...size },
  );
}

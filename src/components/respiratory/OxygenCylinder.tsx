import { useState } from 'react';

type Props = {
  onBack: () => void;
};

export function OxygenCylinder({ onBack }: Props) {
  const [pressure, setPressure] = useState('');
  const [volume, setVolume] = useState('');

  const p = Number(pressure);
  const v = Number(volume);

  const oxygenAmount =
    p > 0 && v > 0
      ? Math.round(p * v * 10.12 * 0.8 * 10) / 10
      : null;

  return (
    <div>
      {/* 戻る */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
          padding: '12px 16px',
          borderRadius: 14,
          border: 'none',
          background: '#eff6ff',
          color: '#1d4ed8',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 20 }}>←</span>
        呼吸器 HOMEへ
      </button>

      <div style={cardStyle}>
        <h1 style={{ marginBottom: 4 }}>酸素ボンベの残量計算</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          酸素ボンベの残量を算出
        </p>

        {/* 内圧 */}
        <label style={labelStyle}>内圧（MPa）</label>
        <input
          type="number"
          inputMode="decimal"
          value={pressure}
          onChange={(e) => setPressure(e.target.value)}
          placeholder="例: 15"
          style={inputStyle}
        />

        {/* 容量 */}
        <label style={labelStyle}>容量（L）</label>
        <input
          type="number"
          inputMode="decimal"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          placeholder="例: 3.4"
          style={inputStyle}
        />

        {/* 結果 */}
        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            background: '#eff6ff',
            fontWeight: 600,
          }}
        >
          酸素残量: {oxygenAmount ?? '—'} mL
        </div>

        {/* メモ */}
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            color: '#6b7280',
          }}
        >
          ※ 安全係数は <strong>0.8</strong> としています< br />
          ※ 当院の酸素ボンベの容量は、V=3.4
        </div>
      </div>
    </div>
  );
}

/* ===== 共通スタイル ===== */


const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: 20,
  padding: 20,
  boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  marginTop: 12,
  marginBottom: 4,
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 14,
  marginBottom: 8,
  borderRadius: 12,
  border: '1px solid #d1d5db',
  fontSize: 16,
};

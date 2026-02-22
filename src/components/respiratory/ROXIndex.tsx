import { useState } from 'react';

type Props = {
  onBack: () => void;
};

export function ROXIndex({ onBack }: Props) {
  const [spo2, setSpo2] = useState('');
  const [fio2, setFio2] = useState('');
  const [rr, setRr] = useState('');

  const parsedSpO2 = Number(spo2);
  let parsedFiO2 = Number(fio2);
  const parsedRR = Number(rr);

  // FiO2 が % 入力された場合の補正
  if (parsedFiO2 > 1) {
    parsedFiO2 = parsedFiO2 / 100;
  }

  const rox =
    parsedSpO2 > 0 && parsedFiO2 > 0 && parsedRR > 0
      ? Math.round(((parsedSpO2 / parsedFiO2) / parsedRR) * 100) / 100
      : null;

  const interpretation = (() => {
    if (rox === null) return null;
    if (rox >= 4.88)
      return {
        text: '人工呼吸器不要',
        color: '#065f46',
        bg: '#ecfdf5',
      };
    if (rox >= 3.85)
      return {
        text: '経過観察',
        color: '#92400e',
        bg: '#fffbeb',
      };
    return {
      text: '人工呼吸器導入を検討',
      color: '#991b1b',
      bg: '#fef2f2',
    };
  })();

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
        <h1 style={{ marginBottom: 4 }}>ROX Index</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          NPPVやHFNC使用時の呼吸評価
        </p>

        {/* SpO2 */}
        <label style={labelStyle}>SpO₂（%）</label>
        <input
          type="number"
          inputMode="decimal"
          value={spo2}
          onChange={(e) => setSpo2(e.target.value)}
          placeholder="例: 95"
          style={inputStyle}
        />

        {/* FiO2 */}
        <label style={labelStyle}>FiO₂</label>
        <input
          type="number"
          inputMode="decimal"
          value={fio2}
          onChange={(e) => setFio2(e.target.value)}
          placeholder="例: 40 または 0.4"
          style={inputStyle}
        />

        {/* 呼吸回数 */}
        <label style={labelStyle}>呼吸回数（回/分）</label>
        <input
          type="number"
          inputMode="decimal"
          value={rr}
          onChange={(e) => setRr(e.target.value)}
          placeholder="例: 22"
          style={inputStyle}
        />

        {/* 結果 */}
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              background: '#eff6ff',
              fontWeight: 600,
            }}
          >
            ROX Index: {rox ?? '—'}
          </div>

          {interpretation && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 12,
                background: interpretation.bg,
                color: interpretation.color,
                fontWeight: 600,
              }}
            >
              {interpretation.text}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            color: '#6b7280',
          }}
        >
          ・4.88以上   ：人工呼吸器不要<br />
          ・3.85-4.87 ：経過観察<br />
          ・3.85未満   ：人工呼吸器導入検討
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

import { useState } from 'react';

type Props = {
  onBack: () => void;
};

export function PFRatio({ onBack }: Props) {
  const [paO2, setPaO2] = useState('');
  const [fiO2, setFiO2] = useState('');

  const parsedPaO2 = Number(paO2);
  const parsedFiO2 = normalizeFiO2(fiO2);

  const pfRatio =
    parsedPaO2 > 0 && parsedFiO2 > 0
      ? Math.round(parsedPaO2 / parsedFiO2)
      : null;

  const assessment = getPfAssessment(pfRatio);

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 20,
        padding: 20,
        boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
      }}
    >
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


      <h1>P/F Ratio</h1>
      <p style={{ color: '#6b7280' }}>肺の酸素化能の指標</p>

      {/* PaO2 */}
      <label>PaO2 (mmHg)</label>
      <input
        value={paO2}
        onChange={(e) => setPaO2(e.target.value)}
        placeholder="例: 80"
        inputMode="decimal"
        style={inputStyle}
      />

      {/* FiO2 */}
      <label>FiO2</label>
      <input
        value={fiO2}
        onChange={(e) => setFiO2(e.target.value)}
        placeholder="例: 40 または 0.4"
        inputMode="decimal"
        style={inputStyle}
      />

      {/* 結果表示 */}
      <div
        style={{
          marginTop: 16,
          padding: 16,
          borderRadius: 12,
          background: assessment.bg,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700 }}>
          P/F RATIO: {pfRatio ?? '—'}
        </div>

        <div
          style={{
            marginTop: 4,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {assessment.label}
        </div>

        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            color: '#374151',
          }}
        >
          {assessment.comment}
        </div>
      </div>

      {/* 判定基準 */}
      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          color: '#6b7280',
        }}
      >
        P/F Ratio &lt;300: 軽症 / &lt;200: 中等度 / &lt;100: 重症（酸素化障害）
      </div>
    </div>
  );
}

/* ---------- helper functions ---------- */

function normalizeFiO2(value: string): number {
  const v = Number(value);
  if (!v || v <= 0) return NaN;
  return v > 1 ? v / 100 : v;
}

function getPfAssessment(pf: number | null) {
  if (pf === null) {
    return {
      bg: '#f3f4f6',
      label: '未計算',
      comment: 'PaO₂ と FiO₂ を入力してください',
    };
  }

  if (pf < 100) {
    return {
      bg: '#fee2e2',
      label: '重症の酸素化障害',
      comment: '高度な呼吸不全を示唆します',
    };
  }

  if (pf < 200) {
    return {
      bg: '#fef3c7',
      label: '中等度の酸素化障害',
      comment: '呼吸管理の強化を検討してください',
    };
  }

  if (pf < 300) {
    return {
      bg: '#e0f2fe',
      label: '軽症の酸素化障害',
      comment: '経過観察と酸素投与を検討',
    };
  }

  return {
    bg: '#eff6ff',
    label: '正常',
    comment: '明らかな酸素化障害は認めません',
  };
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  marginBottom: 12,
  borderRadius: 12,
  border: '1px solid #d1d5db',
  fontSize: 16,
};

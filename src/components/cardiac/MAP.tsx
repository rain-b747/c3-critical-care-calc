import { useState } from 'react';

type Props = {
  onBack: () => void;
};

export function MAP({ onBack }: Props) {
  const [sbp, setSbp] = useState('');
  const [dbp, setDbp] = useState('');

  const sbpNum = Number(sbp);
  const dbpNum = Number(dbp);

  const map =
    sbpNum > 0 && dbpNum > 0
      ? (sbpNum + 2 * dbpNum) / 3
      : null;

  // ===== MAPによる結果Boxスタイル =====
  const mapResultStyle = (): React.CSSProperties => {
    if (map === null) return resultBoxStyle;

    if (map < 65) {
      return {
        ...resultBoxStyle,
        background: '#fee2e2',
        color: '#991b1b',
      };
    }

    if (map < 75) {
      return {
        ...resultBoxStyle,
        background: '#fef9c3',
        color: '#854d0e',
      };
    }

    return {
      ...resultBoxStyle,
      background: '#ecfeff',
      color: '#155e75',
    };
  };

  return (
    <div>
      {/* 戻る */}
      <button onClick={onBack} style={backButtonStyle}>
        <span style={{ fontSize: 20 }}>←</span>
        循環器 HOMEへ
      </button>

      {/* カード */}
      <div style={cardStyle}>
        <h1 style={{ marginBottom: 4 }}>平均動脈圧（MAP）</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          血圧から平均動脈圧を算出
        </p>

        {/* 入力 */}
        <label style={labelStyle}>収縮期血圧（SBP, mmHg）</label>
        <input
          type="number"
          inputMode="decimal"
          value={sbp}
          onChange={(e) => setSbp(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>拡張期血圧（DBP, mmHg）</label>
        <input
          type="number"
          inputMode="decimal"
          value={dbp}
          onChange={(e) => setDbp(e.target.value)}
          style={inputStyle}
        />

        {/* 結果 */}
        <div style={mapResultStyle()}>
          MAP：{map !== null ? map.toFixed(1) : '—'} mmHg
        </div>

        {/* 注釈 */}
        <div style={noteStyle}>
          ※ MAP = (SBP + 2 × DBP) ÷ 3<br />
          ※ 目標MAP：65 mmHg以上
        </div>
      </div>
    </div>
  );
}

/* ===== Styles（NAGammaと完全統一） ===== */

const backButtonStyle: React.CSSProperties = {
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
};

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

const resultBoxStyle: React.CSSProperties = {
  marginTop: 16,
  padding: 16,
  borderRadius: 12,
  background: '#eff6ff',
  fontWeight: 700,
  fontSize: 18,
  textAlign: 'center',
};

const noteStyle: React.CSSProperties = {
  marginTop: 12,
  fontSize: 12,
  color: '#6b7280',
};

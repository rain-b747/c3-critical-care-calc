import { useState } from 'react';

type Props = {
  setScore: (score: number) => void;
};

export function SofaCoagulation({ setScore }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    { label: '血小板 ≥150,000 /μL', score: 0 },
    { label: '100,000–149,000', score: 1 },
    { label: '50,000–99,000', score: 2 },
    { label: '20,000–49,000', score: 3 },
    { label: '<20,000', score: 4 },
  ];

  const handleSelect = (score: number) => {
    setSelected(score);
    setScore(score);
  };

  return (
    <div style={cardStyle}>
      <h2>血小板はどのくらいですか？</h2>
      <p style={hintStyle}>
        ヒント：DIC評価の重要指標です
      </p>

      {options.map((o) => (
        <Option
          key={o.score}
          label={o.label}
          active={selected === o.score}
          onClick={() => handleSelect(o.score)}
        />
      ))}

      <div style={evidenceStyle}>
        📌 血小板減少は凝固異常や敗血症重症化のサイン
      </div>
    </div>
  );
}

/* ===== 共通UI ===== */

function Option({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: 14,
        marginTop: 12,
        borderRadius: 14,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: active ? '2px solid #2563eb' : '1px solid #d1d5db',
        background: active ? '#eff6ff' : '#f9fafb',
      }}
    >
      {label}
      {active && <span style={{ float: 'right' }}>✔</span>}
    </button>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: 20,
  padding: 20,
  boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
};

const hintStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#6b7280',
  marginBottom: 8,
};

const evidenceStyle: React.CSSProperties = {
  marginTop: 16,
  fontSize: 11,
  color: '#6b7280',
  background: '#f3f4f6',
  padding: 8,
  borderRadius: 8,
};
import { useState } from 'react';

type Props = {
  setScore: (score: number) => void;
};

export function SofaRenal({ setScore }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    { label: 'Cr <1.2 mg/dL', score: 0 },
    { label: '1.2–1.9', score: 1 },
    { label: '2.0–3.4', score: 2 },
    { label: '3.5–4.9 または 尿量 <500mL/日', score: 3 },
    { label: '≥5.0 または 尿量 <200mL/日', score: 4 },
  ];

  const handleSelect = (score: number) => {
    setSelected(score);
    setScore(score);
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: 4 }}>腎機能はどうですか？</h2>

      <p style={hintStyle}>
        ヒント：Cr または 尿量で評価します
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
        📌 急性腎障害（AKI）の進行度を反映します
      </div>
    </div>
  );
}

/* =============================
   内部UIコンポーネント
   ============================= */

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
        transition: 'all 0.2s ease',
        border: active ? '2px solid #2563eb' : '1px solid #d1d5db',
        background: active ? '#eff6ff' : '#f9fafb',
      }}
    >
      {label}
      {active && <span style={{ float: 'right' }}>✔</span>}
    </button>
  );
}

/* =============================
   Styles
   ============================= */

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
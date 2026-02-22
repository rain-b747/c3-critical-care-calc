import { useState } from 'react';
import type { CSSProperties } from 'react';

type Props = {
  setScore: (score: number) => void;
};

/* =========================
   共通UIパーツ
========================= */

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
        border: active ? '2px solid #2563eb' : '1px solid #d1d5db',
        background: active ? '#eff6ff' : '#f9fafb',
      }}
    >
      {label}
    </button>
  );
}

const cardStyle: CSSProperties = {
  background: '#ffffff',
  borderRadius: 20,
  padding: 20,
  boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
};

const hintStyle: CSSProperties = {
  fontSize: 12,
  color: '#6b7280',
  marginBottom: 8,
};

const evidenceStyle: CSSProperties = {
  marginTop: 20,
  padding: 12,
  background: '#f3f4f6',
  borderRadius: 12,
  fontSize: 13,
};

/* =========================
   Liver本体
========================= */

export function SofaLiver({ setScore }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    { label: '<1.2 mg/dL', score: 0 },
    { label: '1.2–1.9 mg/dL', score: 1 },
    { label: '2.0–5.9 mg/dL', score: 2 },
    { label: '6.0–11.9 mg/dL', score: 3 },
    { label: '≥12.0 mg/dL', score: 4 },
  ];

  const handleSelect = (score: number) => {
    setSelected(score);
    setScore(score);
  };

  return (
    <div style={cardStyle}>
      <h2>肝機能はどうですか？</h2>

      <p style={hintStyle}>
        ヒント：T-BIL：総ビリルビン値（mg/dL）で評価します
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
        📌 黄疸や肝不全の重症度を反映します。<br />
        ビリルビン高値は予後不良因子です。
      </div>
    </div>
  );
}
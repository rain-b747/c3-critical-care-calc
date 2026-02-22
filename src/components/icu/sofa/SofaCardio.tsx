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
   Cardio本体
========================= */

export function SofaCardio({ setScore }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    { label: 'MAP ≥70 mmHg（安定）', score: 0 },
    { label: 'MAP <70 mmHg', score: 1 },
    { label: 'DOA≤5γ または DOB 使用', score: 2 },
    { label: 'DOA=5.1-15γ または NOA≤0.1γ、Ad≤0.1γ', score: 3 },
    { label: 'DOA>15γ または NOA>0.1γ、Ad>0.1γ', score: 4 },
  ];

  const handleSelect = (score: number) => {
    setSelected(score);
    setScore(score);
  };

  return (
    <div style={cardStyle}>
      <h2>血圧や昇圧剤の使用状況は？</h2>

      <p style={hintStyle}>
        ヒント：平均血圧（MAP）とカテコラミン投与量で評価
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
        📌 循環不全の進行度を示す重要項目。<br />
        カテコラミン必要量の増加は重症化を示します。
      </div>
    </div>
  );
}
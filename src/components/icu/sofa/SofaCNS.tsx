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
   CNS本体
========================= */

export function SofaCNS({ setScore }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    { label: 'GCS 15（正常）', score: 0 },
    { label: 'GCS 13–14', score: 1 },
    { label: 'GCS 10–12', score: 2 },
    { label: 'GCS 6–9', score: 3 },
    { label: 'GCS <6', score: 4 },
  ];

  const handleSelect = (score: number) => {
    setSelected(score);
    setScore(score);
  };

  return (
    <div style={cardStyle}>
      <h2>意識レベルはどうですか？</h2>

      <p style={hintStyle}>
        ヒント：GCS = E（開眼）＋ V（言語）＋ M（運動）の合計点
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
        📌 GCS低下は予後不良因子です。<br />
        特に GCS &lt; 8 は重症とされます。
      </div>
    </div>
  );
}
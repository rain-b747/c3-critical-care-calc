import { useState } from 'react';

type Props = {
  setScore: (score: number) => void;
};

export function SofaRespiratory({ setScore }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    { label: '酸素化は保たれている（P/F ≥ 400）', score: 0 },
    { label: 'やや低下（P/F 300–399）', score: 1 },
    { label: '中等度低下（P/F 200–299）', score: 2 },
    { label: '高度低下（P/F 100–199 + 人工呼吸管理）', score: 3 },
    { label: '極めて重度（P/F <100 + 人工呼吸管理）', score: 4 },
  ];

  const handleSelect = (score: number) => {
    setSelected(score);
    setScore(score);
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: 4 }}>呼吸状態はどうですか？</h2>

      <p style={hintStyle}>
        ヒント：PaO₂ / FiO₂ 比で評価します（人工呼吸管理の有無も重要）
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
        📌 P/F比 = PaO₂ ÷ FiO₂  
        ARDS重症度判定にも使用されます
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
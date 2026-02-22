import { useState } from 'react';

type Props = { onBack: () => void };

export function GCS({ onBack }: Props) {
  const [eye, setEye] = useState<number | null>(null);
  const [verbal, setVerbal] = useState<number | null>(null);
  const [motor, setMotor] = useState<number | null>(null);

  const total = (eye ?? 0) + (verbal ?? 0) + (motor ?? 0);

  const getScoreStyle = () => {
    if (total <= 8 && total !== 0) return { background: '#fee2e2', color: '#991b1b' };
    if (total <= 12 && total !== 0) return { background: '#fef3c7', color: '#854d0e' };
    return { background: '#e0f2fe', color: '#155e75' };
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 20,
        padding: 20,
        boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
      }}
    >
      {/* 戻るボタン */}
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
        集中治療 HOMEへ
      </button>

      <h1>GCS スコア</h1>
      <p style={{ color: '#6b7280', marginBottom: 16 }}>Glasgow Coma Scale（該当する項目を1つ選択）</p>

      <Section title="E：開眼">
        <SelectButton label="自発的に開眼" value={4} current={eye} onSelect={setEye} />
        <SelectButton label="呼びかけで開眼" value={3} current={eye} onSelect={setEye} />
        <SelectButton label="痛み刺激で開眼" value={2} current={eye} onSelect={setEye} />
        <SelectButton label="開眼なし" value={1} current={eye} onSelect={setEye} />
      </Section>

      <Section title="V：言語">
        <SelectButton label="見当識あり（正常会話）" value={5} current={verbal} onSelect={setVerbal} />
        <SelectButton label="混乱した会話" value={4} current={verbal} onSelect={setVerbal} />
        <SelectButton label="不適切な発語" value={3} current={verbal} onSelect={setVerbal} />
        <SelectButton label="理解不能な音声" value={2} current={verbal} onSelect={setVerbal} />
        <SelectButton label="発語なし" value={1} current={verbal} onSelect={setVerbal} />
      </Section>

      <Section title="M：運動">
        <SelectButton label="命令に従う" value={6} current={motor} onSelect={setMotor} />
        <SelectButton label="痛み部位へ手を持ってくる（局在）" value={5} current={motor} onSelect={setMotor} />
        <SelectButton label="逃避反応（屈曲）" value={4} current={motor} onSelect={setMotor} />
        <SelectButton label="異常屈曲（除皮質肢位）" value={3} current={motor} onSelect={setMotor} />
        <SelectButton label="異常伸展（除脳肢位）" value={2} current={motor} onSelect={setMotor} />
        <SelectButton label="反応なし" value={1} current={motor} onSelect={setMotor} />
      </Section>

      <div
        style={{
          ...getScoreStyle(),
          padding: 16,
          borderRadius: 12,
          textAlign: 'center',
          fontWeight: 700,
          marginTop: 16,
          fontSize: 18,
        }}
      >
        GCS：{total} 点
      </div>
    </div>
  );
}

/* ---------- Section / SelectButton ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function SelectButton({ label, value, current, onSelect }: { label: string; value: number; current: number | null; onSelect: (v: number) => void }) {
  const selected = current === value;
  return (
    <button
      onClick={() => onSelect(value)}
      style={{
        width: '100%',
        padding: '12px',
        marginBottom: 8,
        borderRadius: 12,
        border: selected ? '2px solid #1d4ed8' : '1px solid #d1d5db',
        background: selected ? '#eff6ff' : '#f3f4f6',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
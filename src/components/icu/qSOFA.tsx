import { useState } from 'react';

type Props = { onBack: () => void };

export function QSOFA({ onBack }: Props) {
  const [rrHigh, setRrHigh] = useState(false);
  const [sbpLow, setSbpLow] = useState(false);
  const [mentalDisorder, setMentalDisorder] = useState<null | boolean>(null);

  const score = Number(rrHigh) + Number(sbpLow) + Number(mentalDisorder === true);

  const getScoreStyle = () => {
    if (score >= 2) return { background: '#fee2e2', color: '#991b1b' };
    if (score === 1) return { background: '#fef3c7', color: '#854d0e' };
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

      <h1>qSOFA スコア</h1>
      <p style={{ color: '#6b7280', marginBottom: 16 }}>敗血症の簡易スクリーニング（当てはまる項目を選択）</p>

      <Toggle label="呼吸数 ≥ 22 /min" checked={rrHigh} onChange={setRrHigh} />
      <Toggle label="収縮期血圧 ≤ 100 mmHg" checked={sbpLow} onChange={setSbpLow} />

      <Section title="意識状態の評価">
        <Toggle
          label="会話が成立し、見当識も保たれている"
          checked={mentalDisorder === false}
          onChange={() => setMentalDisorder(false)}
        />
        <Toggle
          label="会話が成立しない / 反応が鈍い / 指示に従えない"
          checked={mentalDisorder === true}
          onChange={() => setMentalDisorder(true)}
        />
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
        qSOFA：{score}
      </div>
    </div>
  );
}

/* ---------- Section / Toggle ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '100%',
        padding: '12px',
        marginBottom: 8,
        borderRadius: 12,
        border: checked ? '2px solid #1d4ed8' : '1px solid #d1d5db',
        background: checked ? '#eff6ff' : '#f3f4f6',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {label}
      {checked && <span style={{ fontWeight: 700 }}>✔</span>}
    </button>
  );
}
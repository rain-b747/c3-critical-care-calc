import { useState } from 'react';

type Props = { onBack: () => void };

export function JCS({ onBack }: Props) {
  const [jcs, setJcs] = useState<number | null>(null);

  const getScoreStyle = () => {
    if (jcs === null) return { background: '#f3f4f6', color: '#374151' };
    if (jcs >= 100) return { background: '#fee2e2', color: '#991b1b' };
    if (jcs >= 10) return { background: '#fef3c7', color: '#854d0e' };
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

      <h1>JCS スコア</h1>
      <p style={{ color: '#6b7280' }}>Japan Coma Scale（該当する項目を1つ選択）</p>

      <Section title="1桁：刺激なしで覚醒">
        <SelectButton label="0：意識清明" value={0} current={jcs} onSelect={setJcs} />
        <SelectButton label="1：ほぼ清明だが今ひとつはっきりしない" value={1} current={jcs} onSelect={setJcs} />
        <SelectButton label="2：見当識障害あり" value={2} current={jcs} onSelect={setJcs} />
        <SelectButton label="3：自分の名前・生年月日が言えない" value={3} current={jcs} onSelect={setJcs} />
      </Section>

      <Section title="2桁：刺激で覚醒">
        <SelectButton label="10：普通の呼びかけで開眼" value={10} current={jcs} onSelect={setJcs} />
        <SelectButton label="20：大声・揺さぶりで開眼" value={20} current={jcs} onSelect={setJcs} />
        <SelectButton label="30：痛み刺激で開眼" value={30} current={jcs} onSelect={setJcs} />
      </Section>

      <Section title="3桁：刺激でも覚醒しない">
        <SelectButton label="100：払いのける動作あり" value={100} current={jcs} onSelect={setJcs} />
        <SelectButton label="200：わずかな反応あり" value={200} current={jcs} onSelect={setJcs} />
        <SelectButton label="300：反応なし" value={300} current={jcs} onSelect={setJcs} />
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
        JCS：{jcs ?? '—'}
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

function SelectButton({
  label,
  value,
  current,
  onSelect,
}: {
  label: string;
  value: number;
  current: number | null;
  onSelect: (v: number) => void;
}) {
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
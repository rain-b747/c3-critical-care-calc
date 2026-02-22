import { useState } from 'react';

type Props = {
  onBack: () => void;
};

const GAMMA_PRESETS = [0.05, 0.1, 0.2, 0.3];

type Mode = 'gammaToRate' | 'rateToGamma';

export function NAGamma({ onBack }: Props) {
  const [mode, setMode] = useState<Mode>('gammaToRate');

  const [naMg, setNaMg] = useState('');
  const [salineMl, setSalineMl] = useState('');
  const [weight, setWeight] = useState('');

  const [gamma, setGamma] = useState('');
  const [rate, setRate] = useState('');

  const na = Number(naMg);
  const saline = Number(salineMl);
  const wt = Number(weight);

  const totalVolume = na + saline;
  const concentration =
    na > 0 && totalVolume > 0 ? na / totalVolume : null; // mg/mL
  const mgPerHrPerGamma = wt > 0 ? wt * 0.06 : null;

  const rateFromGamma =
    mode === 'gammaToRate' &&
    concentration &&
    mgPerHrPerGamma &&
    Number(gamma) > 0
      ? (Number(gamma) * mgPerHrPerGamma) / concentration
      : null;

  const gammaFromRate =
    mode === 'rateToGamma' &&
    concentration &&
    mgPerHrPerGamma &&
    Number(rate) > 0
      ? (Number(rate) * concentration) / mgPerHrPerGamma
      : null;

  return (
    <div>
      {/* 戻る */}
      <button onClick={onBack} style={backButtonStyle}>
        <span style={{ fontSize: 20 }}>←</span>
        循環器 HOMEへ
      </button>

      {/* カード */}
      <div style={cardStyle}>
        <h1 style={{ marginBottom: 4 }}>NoA γ（ガンマ）計算</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          ノルアドレナリン投与量の計算
        </p>

        {/* モード切替 */}
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button
            onClick={() => setMode('gammaToRate')}
            style={modeButton(mode === 'gammaToRate')}
          >
            γ → 投与流量
          </button>
          <button
            onClick={() => setMode('rateToGamma')}
            style={modeButton(mode === 'rateToGamma')}
          >
            投与流量 → γ
          </button>
        </div>

        {/* 溶解条件 */}
        <label style={labelStyle}>ノルアドレナリン量 (mg)</label>
        <input
          type="number"
          inputMode="decimal"
          value={naMg}
          onChange={(e) => setNaMg(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>生理食塩水量 (mL)</label>
        <input
          type="number"
          inputMode="decimal"
          value={salineMl}
          onChange={(e) => setSalineMl(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>体重 (kg)</label>
        <input
          type="number"
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={inputStyle}
        />

        {/* γ → 流量 */}
        {mode === 'gammaToRate' && (
          <>
            <label style={labelStyle}>γ (μg/kg/min)</label>
            <input
              type="number"
              inputMode="decimal"
              value={gamma}
              onChange={(e) => setGamma(e.target.value)}
              style={inputStyle}
            />

            <div style={presetRow}>
              {GAMMA_PRESETS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGamma(String(g))}
                  style={presetButton}
                >
                  {g}
                </button>
              ))}
            </div>

            <div style={resultBoxStyle}>
              投与流量: {rateFromGamma ? rateFromGamma.toFixed(1) : '—'} mL/hr
            </div>
          </>
        )}

        {/* 流量 → γ */}
        {mode === 'rateToGamma' && (
          <>
            <label style={labelStyle}>投与流量 (mL/hr)</label>
            <input
              type="number"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              style={inputStyle}
            />

            <div style={resultBoxStyle}>
              γ: {gammaFromRate ? gammaFromRate.toFixed(3) : '—'}
            </div>
          </>
        )}

        {/* 注釈 */}
        <div style={noteStyle}>
          ※ 1γ = 1 μg/kg/min = 体重 × 0.06 mg/hr<br />
          ※ 濃度 = NoA量 ÷ 全量
        </div>
      </div>
    </div>
  );
}

/* ===== Styles（OxygenCylinderと統一） ===== */

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

const modeButton = (active: boolean): React.CSSProperties => ({
  flex: 1,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 14,
  border: active ? '2px solid #2563eb' : '1px solid #d1d5db',
  background: active ? '#eff6ff' : '#f9fafb',
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer',
});

const presetRow: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  marginTop: 8,
};

const presetButton: React.CSSProperties = {
  flex: 1,
  height: 52,
  borderRadius: 14,
  border: '1px solid #d1d5db',
  background: '#f9fafb',
  fontSize: 18,
  fontWeight: 700,
};

const resultBoxStyle: React.CSSProperties = {
  marginTop: 16,
  padding: 16,
  borderRadius: 12,
  background: '#eff6ff',
  fontWeight: 700,
};

const noteStyle: React.CSSProperties = {
  marginTop: 12,
  fontSize: 12,
  color: '#6b7280',
};

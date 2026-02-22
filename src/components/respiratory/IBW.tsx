import { useState } from 'react';

type Sex = 'male' | 'female';

type Props = {
    onBack: () => void;
};

export function IBW({ onBack }: Props) {
    const [sex, setSex] = useState<Sex>('male');
    const [height, setHeight] = useState('');
    const [vtSetting, setVtSetting] = useState(6); // ml/kg

    const h = Number(height);

    // IBW 計算（身長・性別による条件分岐）
    const ibw = (() => {
        if (!h || h <= 0) return null;

        // ① 身長：70cm以下（男女共通）
        if (h <= 70) {
            return 0.125 * h - 0.75;
        }

        // ② 身長：70cm超過、128cm以下（男女共通）
        if (h <= 128) {
            return 0.0037 * h * h - 0.4018 * h + 18.62;
        }

        // ③④ 身長：129cm以上（性別で分岐）
        if (sex === 'male') {
            return 0.9079 * h - 88.022;
        } else {
            return 0.9049 * h - 92.006;
        }
    })();

    const ibwRounded = ibw !== null ? Math.round(ibw * 10) / 10 : null;

    const vtMin = ibw !== null ? Math.round(ibw * 4) : null;
    const vtMax = ibw !== null ? Math.round(ibw * 8) : null;
    const vtSelected = ibw !== null ? Math.round(ibw * vtSetting) : null;

    return (
        <div>
            {/* 戻る */}
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
                呼吸器 HOMEへ
            </button>

            <div
                style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    padding: 20,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                }}
            >
                <h1 style={{ marginBottom: 4 }}>
                    理想体重（IBW）<br /> 一回換気量（mL/kg）
                </h1>
                <p style={{ color: '#6b7280', fontSize: 13 }}>
                    理想体重と一回換気量の目安
                </p>

                {/* 性別 */}
                <div style={{ marginTop: 16 }}>
                    <label style={labelStyle}>性別</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {(['male', 'female'] as Sex[]).map((s) => (
                            <button
                                key={s}
                                onClick={() => setSex(s)}
                                style={{
                                    flex: 1,
                                    padding: 12,
                                    borderRadius: 12,
                                    border:
                                        sex === s
                                            ? '2px solid #2563eb'
                                            : '1px solid #d1d5db',
                                    background:
                                        sex === s ? '#eff6ff' : '#ffffff',
                                    fontWeight: 600,
                                }}
                            >
                                {s === 'male' ? '男性' : '女性'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 身長 */}
                <div style={{ marginTop: 16 }}>
                    <label style={labelStyle}>身長（cm）</label>
                    <input
                        type="number"
                        inputMode="decimal"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="例: 170"
                        style={inputStyle}
                    />
                </div>

                {/* VT 設定 */}
                <div style={{ marginTop: 20 }}>
                    <label style={labelStyle}>
                        一回換気量設定（ml/kg）: {vtSetting}
                    </label>
                    <input
                        type="range"
                        min={4}
                        max={8}
                        step={1}
                        value={vtSetting}
                        onChange={(e) => setVtSetting(Number(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>

                {/* 結果 */}
                <div
                    style={{
                        marginTop: 24,
                        padding: 16,
                        borderRadius: 16,
                        background: '#eff6ff',
                    }}
                >
                    <div style={resultRow}>
                        <span>理想体重IBW（kg）</span>
                        <strong>{ibwRounded ?? '—'} kg</strong>
                    </div>

                    <div style={resultRow}>
                        <span>IBW×4〜8（mL）</span>
                        <strong>
                            {vtMin && vtMax ? `${vtMin} – ${vtMax} ml` : '—'}
                        </strong>
                    </div>

                    <div style={resultRow}>
                        <span>一回換気量（mL/kg）</span>
                        <strong>{vtSelected ?? '—'} ml</strong>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: 12,
                        fontSize: 12,
                        color: '#6b7280',
                    }}
                >
                    ※ 対象：新生児〜成人<br />
                    ※ 出典：PennsylvaniaMedicalCenter（成人）およびTraubSlに基づくIBW。AmJHospPhar1980（小児患者）<br />
                    ※ 実際の設定は、医師の指示に従ってください
                </div>
            </div>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    display: 'block',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    border: '1px solid #d1d5db',
    fontSize: 16,
};

const resultRow: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
};

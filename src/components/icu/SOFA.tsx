import { useState, useRef } from 'react';
import type { SofaScores } from "./types/sofaTypes";
import { motion, AnimatePresence } from "framer-motion";

import { SofaResult } from './sofa/SofaResult';
import { SofaRespiratory } from './sofa/SofaRespiratory';
import { SofaCoagulation } from './sofa/SofaCoagulation';
import { SofaLiver } from './sofa/SofaLiver';
import { SofaCardio } from './sofa/SofaCardio';
import { SofaCNS } from './sofa/SofaCNS';
import { SofaRenal } from './sofa/SofaRenal';

type Props = {
  onBack: () => void;
};

export function SOFA({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [scores, setScores] = useState<SofaScores>({
    respiratory: -1,
    coagulation: -1,
    liver: -1,
    cardio: -1,
    cns: -1,
    renal: -1,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const total =
    Math.max(0, scores.respiratory) +
    Math.max(0, scores.coagulation) +
    Math.max(0, scores.liver) +
    Math.max(0, scores.cardio) +
    Math.max(0, scores.cns) +
    Math.max(0, scores.renal);

  const handleScore = (key: keyof SofaScores, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }));

    setTimeout(() => {
      if (step < 5) {
        setDirection(1);
        setStep(prev => prev + 1);
      }
    }, 200);
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(prev => prev - 1);
    }
  };

  const steps = [
    <SofaRespiratory setScore={(v) => handleScore('respiratory', v)} />,
    <SofaCoagulation setScore={(v) => handleScore('coagulation', v)} />,
    <SofaLiver setScore={(v) => handleScore('liver', v)} />,
    <SofaCardio setScore={(v) => handleScore('cardio', v)} />,
    <SofaCNS setScore={(v) => handleScore('cns', v)} />,
    <SofaRenal setScore={(v) => handleScore('renal', v)} />,
  ];

  return (
    <div ref={containerRef} style={{ paddingBottom: 80, overflow: 'hidden' }}>

      {/* 戻るボタン */}
      <button onClick={onBack} style={backButtonStyle}>
        <span style={{ fontSize: 20, marginRight: 6 }}>←</span>
        集中治療 HOMEへ
      </button>

      {/* 進捗バー（アニメーション） */}
      <div style={progressContainer}>
        <motion.div
          style={progressBar}
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / 6) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* スライドアニメーション */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) goBack();
          }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>

      {/* 下部バー */}
      <div style={bottomBarStyle}>
        <div style={{ fontWeight: 800 }}>
          SOFA 合計：{total}
        </div>

        {step > 0 && (
          <button style={navButtonStyle} onClick={goBack}>
            戻る
          </button>
        )}
      </div>

      {step === 5 && scores.renal !== -1 && (
        <SofaResult total={total} />
      )}
    </div>
  );
}

/* =========================
   スタイル
========================= */

const backButtonStyle: React.CSSProperties = {
  marginBottom: 16,
  padding: 12,
  borderRadius: 12,
  border: 'none',
  background: '#eff6ff',
  color: '#1d4ed8',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
};

const progressContainer: React.CSSProperties = {
  height: 6,
  background: '#e5e7eb',
  borderRadius: 4,
  marginBottom: 24,
  overflow: 'hidden',
};

const progressBar: React.CSSProperties = {
  height: '100%',
  background: '#2563eb',
};

const bottomBarStyle: React.CSSProperties = {
  position: 'sticky',
  bottom: 0,
  background: '#ffffff',
  padding: 16,
  marginTop: 24,
  borderTop: '1px solid #e5e7eb',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navButtonStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 8,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  cursor: 'pointer',
};
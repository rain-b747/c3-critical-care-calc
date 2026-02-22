import { useState } from 'react';
import { PFRatio } from './PFRatio';
import { IBW } from './IBW';
import { ROXIndex } from './ROXIndex';
import { OxygenCylinder } from './OxygenCylinder';
import pfIcon from '../../assets/lung.jpeg';
import type { ReactElement } from 'react';

/* =========================
   ツール定義
   ========================= */

type Tool = {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: (onBack: () => void) => ReactElement;
};

const TOOLS: Tool[] = [
  {
    id: 'ibw',
    title: '理想体重（IBW）',
    description: '一回換気量設定の基準',
    icon: pfIcon,
    component: (onBack) => <IBW onBack={onBack} />,
  },

  {
    id: 'pf',
    title: 'P/F Ratio',
    description: '肺のガス交換能の指標',
    icon: pfIcon,
    component: (onBack) => <PFRatio onBack={onBack} />,
  },
  
  {
    id: 'roxindex',
    title: 'ROX Index',
    description: '呼吸管理や人工呼吸器導入の効果を評価',
    icon: pfIcon,
    component: (onBack) => <ROXIndex onBack={onBack} />,
  },
  {
    id: 'oxygen-cylinder',
    title: '酸素ボンベの残量計算',
    description: 'どのくらい酸素が残っているのかを算出',
    icon: pfIcon,
    component: (onBack) => <OxygenCylinder onBack={onBack} />,
  },
  // 👇 ここに追加するだけ
  // {
  //   id: 'peep',
  //   title: 'PEEP',
  //   description: 'PEEP設定の目安',
  //   icon: pfIcon,
  //   component: (onBack) => <PEEP onBack={onBack} />,
  // },
];

export function RespiratoryHome() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const activeTool = TOOLS.find((t) => t.id === activeToolId);

  // ===== ツール画面 =====
  if (activeTool) {
    return activeTool.component(() => setActiveToolId(null));
  }

  // ===== ホーム画面 =====
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>呼吸器：Respiratory</h2>

      {TOOLS.map((tool) => (
        <ToolCard
          key={tool.id}
          title={tool.title}
          description={tool.description}
          icon={tool.icon}
          onClick={() => setActiveToolId(tool.id)}
        />
      ))}
    </div>
  );
}

/* =========================
   共通カード
   ========================= */

type ToolCardProps = {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
};

function ToolCard({
  title,
  description,
  icon,
  onClick,
}: ToolCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        background: '#ffffff',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        cursor: 'pointer',
      }}
    >
      <img
        src={icon}
        alt={title}
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          objectFit: 'contain',
          flexShrink: 0,
        }}
      />

      <div>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>
          {description}
        </div>
      </div>
    </div>
  );
}

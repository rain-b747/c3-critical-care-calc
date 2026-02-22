import { useState } from 'react';
import type { ReactElement } from 'react';
import icuIcon from '../../assets/icu.png';

import { QSOFA } from './qSOFA';
import { SOFA } from './SOFA';
import { GCS } from './GCS';
import { JCS } from './JCS';

/* =========================
   ICU ツール定義
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
    id: 'sofa',
    title: 'SOFA スコア',
    description: '敗血症、多臓器不全の評価',
    icon: icuIcon,
    component: (onBack) => <SOFA onBack={onBack} />,
  },
  {
    id: 'qsofa',
    title: 'qSOFA スコア',
    description: '一般病棟・外来での敗血症スクリーニング',
    icon: icuIcon,
    component: (onBack) => <QSOFA onBack={onBack} />,
  },
  {
    id: 'gcs',
    title: 'GCS：Glasgow Coma Scale',
    description: '救急やICUでの意識レベル評価',
    icon: icuIcon,
    component: (onBack) => <GCS onBack={onBack} />,
  },
  {
    id: 'jcs',
    title: 'JCS：Japan Coma Scale',
    description: '病棟などで、「起きているのか？」を評価',
    icon: icuIcon,
    component: (onBack) => <JCS onBack={onBack} />,
  },
];

export function ICCHome() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const activeTool = TOOLS.find((t) => t.id === activeToolId);

  // ===== ツール画面 =====
  if (activeTool) {
    return activeTool.component(() => setActiveToolId(null));
  }

  // ===== ICU HOME =====
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>
        集中治療：Intensive Care
      </h2>

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
        <div style={{ fontWeight: 600 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#6b7280',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
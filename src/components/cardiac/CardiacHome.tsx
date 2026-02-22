import { useState } from 'react';
import type { ReactElement } from 'react';
import pfIcon from '../../assets/cardiac.jpeg';
import { NAGamma } from './NAGamma';
import { MAP } from './MAP';

/* =========================
   循環器ツール定義
   ========================= */

type ToolComponentProps = {
  onBack: () => void;
};

type Tool = {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: (props: ToolComponentProps) => ReactElement;
};

const TOOLS: Tool[] = [
  {
    id: 'na-gamma',
    title: 'NoA γ（ガンマ）計算',
    description: 'ノルアドレナリン投与量評価',
    icon: pfIcon,
    component: NAGamma,
  },
  {
    id: 'map',
    title: '平均動脈圧（MAP）',
    description: '血圧からMAPを算出',
    icon: pfIcon,
    component: MAP,
  },

  // 今後もこの形で追加できる
  // {
  //   id: 'shock-index',
  //   title: 'Shock Index',
  //   description: '循環動態評価',
  //   icon: pfIcon,
  //   component: ShockIndex,
  // },
];

export function CardiacHome() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const activeTool = TOOLS.find((t) => t.id === activeToolId);

  // ===== ツール画面 =====
  if (activeTool) {
    const ActiveComponent = activeTool.component;
    return <ActiveComponent onBack={() => setActiveToolId(null)} />;
  }

  // ===== ホーム画面 =====
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>循環器：Cardiac</h2>

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

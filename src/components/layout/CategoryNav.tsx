import { CATEGORIES } from '../../app/constants';
import type { CategoryId } from '../../app/constants';

type Props = {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
};

export function CategoryNav({ active, onChange }: Props) {
  return (
    <nav
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          background: '#f3f4f6',
          padding: 4,
          borderRadius: 12,
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 10,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#2563eb' : '#374151',
                boxShadow: isActive
                  ? '0 1px 2px rgba(0,0,0,0.08)'
                  : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

type Props = {
    step: number;
    totalSteps: number;
  };
  
  export function SofaProgress({ step, totalSteps }: Props) {
    const percent = ((step + 1) / totalSteps) * 100;
  
    return (
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12 }}>進捗 {step + 1} / {totalSteps}</div>
        <div style={{
          height: 8,
          background: '#e5e7eb',
          borderRadius: 6,
        }}>
          <div style={{
            width: `${percent}%`,
            height: 8,
            background: '#2563eb',
            borderRadius: 6,
          }} />
        </div>
      </div>
    );
  }
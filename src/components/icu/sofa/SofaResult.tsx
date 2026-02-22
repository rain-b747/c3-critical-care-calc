type Props = {
    total: number;
  };
  
  export function SofaResult({ total }: Props) {
    const style = (): React.CSSProperties => {
      if (total >= 10) return { background: '#fee2e2', color: '#991b1b' };
      if (total >= 5) return { background: '#fef9c3', color: '#854d0e' };
      return { background: '#ecfeff', color: '#155e75' };
    };
  
    return (
      <div style={{ ...style(), padding: 20, borderRadius: 16, marginTop: 24 }}>
        <h2>SOFA 合計 {total} 点</h2>
        <p>
          {total >= 10 && '重症。集中治療管理を強く検討' && 'ICU入室時が11点以上で死亡率95%'}
          {total >= 5 && total < 10 && '中等症。厳重経過観察' && 'ICU入室時が9点以下で死亡率33%以下'}
          {total < 5 && '軽症〜中等症' && 'ICU入室時が9点以下で死亡率33%以下'}
        </p>
      </div>
    );
  }
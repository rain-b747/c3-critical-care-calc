export function Home() {
  return (
    <div style={{ padding: '12px', maxWidth: 720, margin: '0 auto' }}>
      {/* アプリ概要 */}
      <section style={{ marginBottom: 20 }}>
        <h2 style={sectionTitle}>⭐️ アプリ概要 ⭐️</h2>
        <p style={text}>
          C3は、呼吸・循環・集中治療領域における各種スコアリングや
          投与量計算を迅速に行うための医療者向け補助ツールです。
        </p>
        <p style={text}>
          ベッドサイドや当直中の即時計算を目的としています。
        </p>
      </section>

     

      {/* 使い方 */}
      <section style={{ marginBottom: 20 }}>
        <h2 style={sectionTitle}>✏️ 使い方 ✏️</h2>
        <ol style={list}>
          <li>上部メニューから領域を選択</li>
          <li>必要な数値を入力（単位に注意）</li>
          <li>自動計算された結果を確認</li>
        </ol>
      </section>

      {/* 注意・免責 */}
      <section style={{ marginBottom: 20 }}>
        <h2 style={sectionTitle}>❗️ 注意・免責 ❗️</h2>
        <ul style={list}>
          <li>本ツールは診断・治療方針を決定するものではありません</li>
          <li>最終判断は必ず医療者が行ってください</li>
          <li>最新のガイドライン・施設ルールを優先してください</li>
        </ul>
      </section>

      {/* 更新履歴 */}
      <section>
        <h2 style={sectionTitle}>⌛️ 更新履歴 ⌛️</h2>
        <ul style={list}>
          <li>v1.0：ROX Index、ノルアドレナリン投与量計算を追加</li>
        </ul>
      </section>
    </div>
  );
}

/* 👇 ここを必ず追加 */
const sectionTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 6,
  color: '#111827',
};

const text: React.CSSProperties = {
  fontSize: 14,
  color: '#374151',
  lineHeight: 1.6,
};

const list: React.CSSProperties = {
  fontSize: 14,
  color: '#374151',
  paddingLeft: 18,
  lineHeight: 1.6,
};


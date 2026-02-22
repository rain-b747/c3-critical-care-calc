import appIcon from '../../assets/app-icon.png';

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <header
      style={{
        position: 'sticky',  // 元の sticky に戻す
        top: 0,
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '10px 12px',
        zIndex: 100,
      }}
    >
      {/* 上段 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* 左：アイコン＋タイトル */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            minWidth: 0,
          }}
        >
          <img
            src={appIcon}
            alt="C3"
            style={{
              width: 52,
              height: 52,
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />

          <h1
            style={{
              margin: 0,
              fontSize: 25,
              fontWeight: 600,
              color: '#111827',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <span style={{ color: '#2563eb' }}>C3</span>
            <span> : {title}</span>
          </h1>
        </div>

        {/* 右端：バージョン表記 */}
        <span
          style={{
            fontSize: 10,
            color: '#6b7280',
            border: '1px solid #d1d5db',
            borderRadius: 999,
            padding: '2px 8px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          test v1.0
        </span>
      </div>

      {/* 下段：注意文 */}
      <div
        style={{
          fontSize: 11,
          color: '#6b7280',
          marginTop: 2,
        }}
      >
        計算・スコア ツール（最終的な判断は 医療者が行ってください）
      </div>
    </header>
  );
}
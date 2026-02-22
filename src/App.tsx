import { useState } from 'react';
import { Header } from './components/layout/Header';
import { CategoryNav } from './components/layout/CategoryNav';
import type { CategoryId } from './app/constants';

import { Home } from './components/home/mainHome';
import { RespiratoryHome } from './components/respiratory/RespiratoryHome';
import { ICCHome } from './components/icu/ICCHome';
import { CardiacHome } from './components/cardiac/CardiacHome';

function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('home');
  const [categoryVersion, setCategoryVersion] = useState(0);

  const handleCategoryChange = (next: CategoryId) => {
    if (next === activeCategory) {
      // 同じカテゴリ → 強制リセット
      setCategoryVersion((v) => v + 1);
    } else {
      setActiveCategory(next);
    }
  };

  return (
    <div
      style={{
        height: '100vh',           // 画面全体を固定
        background: 'black',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
        }}
      >
        {/* 上部固定エリア */}
        <div style={{ flexShrink: 0 }}>
          <Header title="Critical Care Calc" />
          <CategoryNav active={activeCategory} onChange={handleCategoryChange} />
        </div>

        {/* 下部スクロール可能エリア */}
        <div
          style={{
            flex: 1,            // 残り領域全てを占有
            overflowY: 'auto',  // スクロール可能
            padding: 16,
          }}
        >
          {activeCategory === 'home' && <Home key={`home-${categoryVersion}`} />}
          {activeCategory === 'respiratory' && <RespiratoryHome key={`resp-${categoryVersion}`} />}
          {activeCategory === 'icu' && <ICCHome key={`icu-${categoryVersion}`} />}
          {activeCategory === 'cardiac' && <CardiacHome key={`card-${categoryVersion}`} />}
        </div>
      </div>
    </div>
  );
}

export default App;
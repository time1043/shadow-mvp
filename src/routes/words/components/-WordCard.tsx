import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import type { WordStatus } from '../hooks/-useWordsState';

import { useWordsContext } from '../hooks/-context';
import { ProgressBar } from './-ProgressBar';

export function WordCard() {
  const ctx = useWordsContext();
  const {
    words,
    currentIndex,
    currentWord,
    showChinese,
    statusMap,
    markKnown,
    markUnknown,
    nextWord,
    prevWord,
    toggleChinese,
    goToIndex,
    isDone,
  } = ctx;
  const navigate = useNavigate();

  useEffect(() => {
    if (isDone) navigate({ to: '/words/summary' });
  }, [isDone]);

  useEffect(() => {
    if (isDone) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          markUnknown();
          break;
        case 'ArrowRight':
          e.preventDefault();
          markKnown();
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextWord();
          break;
        case 'ArrowUp':
          e.preventDefault();
          prevWord();
          break;
        case ' ':
          e.preventDefault();
          toggleChinese();
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const threshold = 50;

      if (absDx < threshold && absDy < threshold) return;

      if (absDx > absDy) {
        if (dx < 0) {
          markUnknown();
        } else {
          markKnown();
        }
      } else {
        if (dy < 0) {
          nextWord();
        } else {
          prevWord();
        }
      }
    };

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  });

  const getWordColor = (status?: WordStatus) => {
    if (status === 'known') return '#34a853';
    if (status === 'unknown') return '#ea4335';
    return '#1a1a1a';
  };

  return (
    <div style={styles.container}>
      <div style={{ width: '100%', maxWidth: 480, marginBottom: 16 }}>
        <ProgressBar
          total={words.length}
          current={currentIndex}
          onChange={goToIndex}
        />
      </div>
      <div style={styles.card}>
        <div
          style={{ ...styles.english, color: getWordColor(statusMap[currentWord.id]) }}
          onClick={() => {
            toggleChinese();
          }}
        >
          {currentWord.english}
        </div>
        <div
          style={{
            ...styles.chinese,
            opacity: showChinese ? 1 : 0,
            transform: showChinese ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {currentWord.chinese}
        </div>
      </div>
      <div style={styles.hints}>
        <span>← 不认识</span>
        <span>↑↓ 切换单词 · 空格/轻点 显示中文</span>
        <span>认识 →</span>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 60px)',
    padding: 24,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    touchAction: 'none',
    userSelect: 'none',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    border: '1px solid #e5e5e5',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    padding: '48px 32px',
    backgroundColor: '#fff',
  },
  english: {
    fontSize: 40,
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 24,
  },
  chinese: {
    fontSize: 24,
    color: '#666',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
  },
  hints: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 480,
    marginTop: 32,
    fontSize: 14,
    color: '#aaa',
  },
};

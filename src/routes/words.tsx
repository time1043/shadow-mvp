import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { words } from '@/data/words';

export const Route = createFileRoute('/words')({ component: Words });

type WordStatus = 'known' | 'unknown';

function Words() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChinese, setShowChinese] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<number, WordStatus>>({});

  const currentWord = words[currentIndex];
  const isDone = currentIndex >= words.length;

  useEffect(() => {
    if (isDone) return;
    const utterance = new SpeechSynthesisUtterance(currentWord.english);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }, [currentIndex, isDone]);

  const getCardColor = (status?: WordStatus) => {
    if (status === 'known') return '#e6f9e6';
    if (status === 'unknown') return '#fde8e8';
    return '#fff';
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (!isDone) {
            setStatusMap((prev) => ({ ...prev, [currentWord.id]: 'unknown' }));
            setShowChinese(true);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (!isDone) {
            setStatusMap((prev) => ({ ...prev, [currentWord.id]: 'known' }));
            setCurrentIndex((prev) => prev + 1);
            setShowChinese(false);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < words.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setShowChinese(false);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setShowChinese(false);
          }
          break;
        case ' ':
          e.preventDefault();
          setShowChinese((prev) => !prev);
          speechSynthesis.speak(
            Object.assign(new SpeechSynthesisUtterance(currentWord.english), { lang: 'en-US' }),
          );
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

      if (absDx < threshold && absDy < threshold) {
        setShowChinese((prev) => !prev);
        const utterance = new SpeechSynthesisUtterance(currentWord.english);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
        return;
      }

      if (absDx > absDy) {
        if (dx < 0) {
          // swipe left → unknown, show Chinese
          if (!isDone) {
            setStatusMap((prev) => ({ ...prev, [currentWord.id]: 'unknown' }));
            setShowChinese(true);
          }
        } else {
          // swipe right → known, next
          if (!isDone) {
            setStatusMap((prev) => ({ ...prev, [currentWord.id]: 'known' }));
            setCurrentIndex((prev) => prev + 1);
            setShowChinese(false);
          }
        }
      } else {
        if (dy < 0) {
          // swipe up → next word (like short video feed)
          if (currentIndex < words.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setShowChinese(false);
          }
        } else {
          // swipe down → previous word
          if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setShowChinese(false);
          }
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

  if (isDone) {
    const total = Object.keys(statusMap).length;
    const knownWords = words.filter((w) => statusMap[w.id] === 'known');
    const unknownWords = words.filter((w) => statusMap[w.id] === 'unknown');
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ margin: '0 0 24px' }}>完成!</h2>
          <p style={{ fontSize: 18, margin: '0 0 8px' }}>
            认识: {knownWords.length} / {total}
          </p>
          <p style={{ fontSize: 18, margin: '0 0 24px' }}>
            不认识: {unknownWords.length} / {total}
          </p>
          {unknownWords.length > 0 && (
            <div style={{ textAlign: 'left', width: '100%' }}>
              <h3 style={{ margin: '0 0 12px' }}>不认识的单词:</h3>
              {unknownWords.map((w) => (
                <div
                  key={w.id}
                  style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  {w.english} — {w.chinese}
                </div>
              ))}
            </div>
          )}
          <button
            style={styles.restartBtn}
            onClick={() => {
              setCurrentIndex(0);
              setStatusMap({});
              setShowChinese(false);
            }}
          >
            再来一次
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.progress}>
        {currentIndex + 1} / {words.length}
      </div>
      <div style={{ ...styles.card, backgroundColor: getCardColor(statusMap[currentWord.id]) }}>
        <div style={styles.english}>{currentWord.english}</div>
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
  progress: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
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
  restartBtn: {
    marginTop: 24,
    padding: '10px 32px',
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
};

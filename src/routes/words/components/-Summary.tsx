import { useNavigate } from '@tanstack/react-router';

import { useWordsContext } from '../hooks/-context';

export function Summary() {
  const { words, statusMap, reset } = useWordsContext();
  const navigate = useNavigate();

  const handleReset = () => {
    reset();
    navigate({ to: '/words' });
  };

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
        <button style={styles.restartBtn} onClick={handleReset}>
          再来一次
        </button>
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

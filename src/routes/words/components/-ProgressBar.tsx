import { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export function ProgressBar({ total, current, onChange }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const getIndexFromX = (clientX: number) => {
    const bar = barRef.current;
    if (!bar) return current;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(ratio * (total - 1));
  };

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      onChange(getIndexFromX(clientX));
    };
    const onUp = () => setDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, getIndexFromX, onChange]);

  const handleClick = (e: React.MouseEvent) => {
    onChange(getIndexFromX(e.clientX));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    onChange(getIndexFromX(e.clientX));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    onChange(getIndexFromX(e.touches[0].clientX));
  };

  const progress = total > 1 ? current / (total - 1) : 0;

  return (
    <div style={styles.wrapper}>
      <div
        ref={barRef}
        style={styles.bar}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div style={{ ...styles.fill, width: `${progress * 100}%` }} />
        <div
          style={{
            ...styles.thumb,
            left: `${progress * 100}%`,
          }}
        />
      </div>
      <span style={styles.label}>
        {current + 1} / {total}
      </span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    maxWidth: 480,
  },
  bar: {
    position: 'relative',
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e5e5e5',
    cursor: 'pointer',
    touchAction: 'none',
  },
  label: {
    fontSize: 13,
    color: '#999',
    whiteSpace: 'nowrap',
    minWidth: 48,
    textAlign: 'right',
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#1a1a1a',
    transition: 'width 0.1s ease',
  },
  thumb: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: '#1a1a1a',
    transition: 'left 0.1s ease',
  },
};

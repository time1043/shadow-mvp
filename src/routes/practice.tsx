import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

import { quotes, type Quote } from '@/data/quotes';

export const Route = createFileRoute('/practice')({ component: Practice });

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function Practice() {
  const [order, setOrder] = useState<number[]>(() => shuffleArray(quotes.map((_, i) => i)));
  const [pos, setPos] = useState(0);
  const [input, setInput] = useState('');
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const quote: Quote = quotes[order[pos]];

  const nextQuote = () => {
    setInput('');
    setFinished(false);
    setPos((p) => {
      const next = p + 1;
      if (next >= order.length) {
        setOrder(shuffleArray(quotes.map((_, i) => i)));
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [pos, finished]);

  const accuracy = (() => {
    if (!finished) return 0;
    let correct = 0;
    for (let i = 0; i < quote.english.length; i++) {
      if (input[i] === quote.english[i]) correct++;
    }
    return Math.round((correct / quote.english.length) * 100);
  })();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (finished) return;
    const val = e.target.value;
    setInput(val);
    if (val.length === quote.english.length) {
      setFinished(true);
    }
  };

  return (
    <div className="practice">
      <div className="practice-header">
        <span className="practice-progress">
          {pos + 1} / {order.length}
        </span>
        <h1 className="practice-title">Shadow</h1>
        <span className="practice-subtitle">Doctor Who Typing Practice</span>
      </div>

      <div className="practice-card">
        <p className="hint-chinese">{quote.chinese}</p>
        <p className="hint-source">{quote.source}</p>
      </div>

      <div className="typing-area">
        <div className="typing-display" onClick={() => inputRef.current?.focus()}>
          {quote.english.split('').map((char, i) => {
            let className = 'char pending';
            if (i < input.length) {
              className = input[i] === char ? 'char correct' : 'char wrong';
            } else if (i === input.length) {
              className = 'char cursor';
            }
            return (
              <span key={`${quote.id}-${i}`} className={className}>
                {char}
              </span>
            );
          })}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInput}
          className="typing-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={finished}
        />
      </div>

      {finished && (
        <div className="result">
          <div className="result-score">
            <span className="result-label">正确率</span>
            <span className="result-value">{accuracy}%</span>
          </div>
          {accuracy < 100 && (
            <p className="result-answer">
              正确答案：<strong>{quote.english}</strong>
            </p>
          )}
          <button className="btn-next" onClick={nextQuote}>
            下一条 →
          </button>
        </div>
      )}
    </div>
  );
}

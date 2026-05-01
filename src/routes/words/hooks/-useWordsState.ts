import { useEffect, useState } from 'react';

import { words } from '@/data/words';

export type WordStatus = 'known' | 'unknown';

export function useWordsState() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChinese, setShowChinese] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<number, WordStatus>>({});

  const isDone = currentIndex >= words.length;
  const currentWord = isDone ? words[words.length - 1] : words[currentIndex];

  useEffect(() => {
    if (isDone) return;
    const utterance = new SpeechSynthesisUtterance(currentWord.english);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }, [currentIndex, isDone]);

  const markKnown = () => {
    setStatusMap((prev) => ({ ...prev, [currentWord.id]: 'known' }));
    setCurrentIndex((i) => i + 1);
    setShowChinese(false);
  };

  const markUnknown = () => {
    setStatusMap((prev) => ({ ...prev, [currentWord.id]: 'unknown' }));
    setShowChinese(true);
    speechSynthesis.speak(
      Object.assign(new SpeechSynthesisUtterance(currentWord.english), {
        lang: 'en-US',
      }),
    );
  };

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowChinese(false);
    }
  };

  const prevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setShowChinese(false);
    }
  };

  const toggleChinese = () => {
    setShowChinese((prev) => !prev);
    speechSynthesis.speak(
      Object.assign(new SpeechSynthesisUtterance(currentWord.english), {
        lang: 'en-US',
      }),
    );
  };

  const goToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(words.length - 1, index));
    setCurrentIndex(clamped);
    setShowChinese(false);
  };

  const reset = () => {
    setCurrentIndex(0);
    setStatusMap({});
    setShowChinese(false);
  };

  return {
    words,
    currentIndex,
    currentWord,
    showChinese,
    statusMap,
    isDone,
    markKnown,
    markUnknown,
    nextWord,
    prevWord,
    toggleChinese,
    goToIndex,
    reset,
  };
}

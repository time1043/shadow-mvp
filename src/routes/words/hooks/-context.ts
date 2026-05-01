import { createContext, useContext } from 'react';

import { useWordsState } from './-useWordsState';

export type WordsContextValue = ReturnType<typeof useWordsState>;

export const WordsContext = createContext<WordsContextValue | null>(null);

export function useWordsContext() {
  const ctx = useContext(WordsContext);
  if (!ctx) throw new Error('useWordsContext must be used within WordsContext.Provider');
  return ctx;
}

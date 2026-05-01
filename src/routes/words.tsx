import { createFileRoute, Outlet } from '@tanstack/react-router';

import { WordsContext } from './words/hooks/-context';
import { useWordsState } from './words/hooks/-useWordsState';

export const Route = createFileRoute('/words')({ component: WordsLayout });

function WordsLayout() {
  const state = useWordsState();
  return (
    <WordsContext.Provider value={state}>
      <Outlet />
    </WordsContext.Provider>
  );
}

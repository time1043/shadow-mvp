import { createFileRoute } from '@tanstack/react-router';

import { WordCard } from './components/-WordCard';

export const Route = createFileRoute('/words/')({ component: WordCard });

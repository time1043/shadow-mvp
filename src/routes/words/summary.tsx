import { createFileRoute } from '@tanstack/react-router';

import { Summary } from './components/-Summary';

export const Route = createFileRoute('/words/summary')({ component: Summary });

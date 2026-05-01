# Word Flashcard

Route: `/words`

## Files

- `src/data/words.ts` — mock word data (10 entries)
- `src/routes/words.tsx` — layout route, provides `WordsContext`
- `src/routes/words/index.tsx` — word card page
- `src/routes/words/summary.tsx` — completion summary page
- `src/routes/words/hooks/-useWordsState.ts` — state management hook
- `src/routes/words/hooks/-context.ts` — React Context + `useWordsContext`
- `src/routes/words/components/-WordCard.tsx` — word card component
- `src/routes/words/components/-ProgressBar.tsx` — draggable progress bar
- `src/routes/words/components/-Summary.tsx` — summary component

## Interaction

### Keyboard

| Key   | Action                                                              |
| ----- | ------------------------------------------------------------------- |
| Left  | Mark as "unknown", show Chinese, replay pronunciation, stay on card |
| Right | Mark as "known", advance to next word                               |
| Down  | Next word                                                           |
| Up    | Previous word                                                       |
| Space | Toggle Chinese visibility, replay pronunciation                     |

### Touch Gestures (Mobile)

| Gesture     | Action                                                |
| ----------- | ----------------------------------------------------- |
| Swipe left  | Mark as "unknown", show Chinese, replay pronunciation |
| Swipe right | Mark as "known", advance to next word                 |
| Swipe up    | Next word (short video convention)                    |
| Swipe down  | Previous word                                         |
| Tap on word | Toggle Chinese visibility, replay pronunciation       |

## Pronunciation

- Uses built-in `SpeechSynthesis` API (`en-US`)
- Auto-plays when a word appears
- Replays on tap on the word or space key

## Word Status Colors

| Status  | Word Color        |
| ------- | ----------------- |
| Default | Black `#1a1a1a`   |
| Known   | Green `#34a853`   |
| Unknown | Red `#ea4335`     |

## Progress Bar

- Displayed above the word card
- Shows current position / total (e.g. `3 / 10`)
- Click anywhere on the bar to jump to that word
- Drag the thumb to scrub through words

## Completion Screen

Route: `/words/summary`

Shown after all words are marked:

- Known / unknown count summary
- List of unknown words (English + Chinese)
- "Restart" button to reset progress

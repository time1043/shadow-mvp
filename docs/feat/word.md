# Word Flashcard

Route: `/words`

## Files

- `src/data/words.ts` — mock word data (10 entries)
- `src/routes/words.tsx` — flashcard page

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

## Card Status Colors

| Status  | Background      |
| ------- | --------------- |
| Default | White `#fff`    |
| Known   | Green `#e6f9e6` |
| Unknown | Red `#fde8e8`   |

## Completion Screen

Shown after all words are marked:

- Known / unknown count summary
- List of unknown words (English + Chinese)
- "Restart" button to reset progress

export interface Word {
  id: number;
  english: string;
  chinese: string;
}

export const words: Word[] = [
  { id: 1, english: 'abandon', chinese: '放弃' },
  { id: 2, english: 'brilliant', chinese: '杰出的' },
  { id: 3, english: 'contemporary', chinese: '当代的' },
  { id: 4, english: 'deliberate', chinese: '故意的' },
  { id: 5, english: 'elaborate', chinese: '精心制作的' },
  { id: 6, english: 'fascinate', chinese: '着迷' },
  { id: 7, english: 'genuine', chinese: '真正的' },
  { id: 8, english: 'hesitate', chinese: '犹豫' },
  { id: 9, english: 'inevitable', chinese: '不可避免的' },
  { id: 10, english: 'justify', chinese: '证明...正当' },
];

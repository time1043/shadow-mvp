export interface Quote {
  id: number;
  english: string;
  chinese: string;
  source: string;
}

export const quotes: Quote[] = [
  {
    id: 1,
    english: 'I am definitely a madman with a box.',
    chinese: '我绝对是个带着盒子的疯子。',
    source: 'The Eleventh Doctor — "The Eleventh Hour"',
  },
  // {
  //   id: 2,
  //   english: "We're all stories in the end. Just make it a good one, eh?",
  //   chinese: '说到底我们都只是个故事。那就把它讲成一个好的吧？',
  //   source: 'The Eleventh Doctor — "The Big Bang"',
  // },
  // {
  //   id: 3,
  //   english:
  //     "Some people live more in twenty years than others do in eighty. It's not the time that matters, it's the person.",
  //   chinese: '有些人在二十年里活出的精彩，比别人八十年还多。重要的不是时间，而是人。',
  //   source: 'The Tenth Doctor — "The Lazarus Experiment"',
  // },
  // {
  //   id: 4,
  //   english:
  //     "Everything ends, and it's always sad. But everything begins again too, and that's always happy.",
  //   chinese: '一切都会结束，这总是令人伤感。但一切也都会重新开始，这总是令人欢喜。',
  //   source: 'The Eleventh Doctor — "Closing Time"',
  // },
  // {
  //   id: 5,
  //   english:
  //     "The way I see it, every life is a pile of good things and bad things. The good things don't always soften the bad things, but vice versa, the bad things don't always spoil the good things.",
  //   chinese:
  //     '在我看来，每个人的人生都是一堆好事和坏事的叠加。好事不一定能冲淡坏事，反过来，坏事也不一定会毁掉好事。',
  //   source: 'The Eleventh Doctor — "Vincent and the Doctor"',
  // },
  {
    id: 6,
    english: "I don't want to go.",
    chinese: '我不想走。',
    source: 'The Tenth Doctor — "The End of Time"',
  },
  // {
  //   id: 7,
  //   english:
  //     "You know the very powerful and the very stupid have one thing in common. They don't alter their views to fit the facts. They alter the facts to fit their views.",
  //   chinese:
  //     '你知道权倾天下的人和愚蠢至极的人有一个共同点：他们不会为事实改变自己的观点，而是篡改事实来迎合自己的观点。',
  //   source: 'The Fourth Doctor — "The Face of Evil"',
  // },
  // {
  //   id: 8,
  //   english: "There's no point in being grown up if you can't be childish sometimes.",
  //   chinese: '如果连偶尔孩子气都不行，那长大还有什么意义。',
  //   source: 'The Fourth Doctor — "Robot"',
  // },
];

interface QuizItem {
  image: string
  options: [string, string] // Exactly two options
  correctAnswer: 0 | 1 // 0 for first option, 1 for second option
}

export const quizData: QuizItem[] = [
  {
    image: "/quiz-images/quiz1.jpg",
    options: [
      "Amazon Echo",     // index 0 - 正解
      "Google home"      // index 1 - 不正解
    ],
    correctAnswer: 0     // 0は最初の選択肢（Amazon Echo）が正解
  },
  {
    image: "/quiz-images/quiz2.jpg",
    options: [
      "景福宮の夜景",
      "BTS「Permission to Dance」のコンサート会場"
    ],
    correctAnswer: 1
  },
  {
    image: "/quiz-images/quiz3.jpg",
    options: [
      "BLACKPINK WORLD TOURのペンライト演出",
      "一般的な音楽フェスの様子"
    ],
    correctAnswer: 0
  },
  // ... 他のクイズデータ
] 
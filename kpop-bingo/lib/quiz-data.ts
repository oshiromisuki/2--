interface QuizItem {
  image: string
  question: string // 問題文を追加
  options: [string, string] // Exactly two options
  correctAnswer: 0 | 1 // 0 for first option, 1 for second option
  feedbackImage: string // 回答選択後に表示される画像
}

export const quizData: QuizItem[] = [
  {
    image: "/quiz-images/quiz1.png",
    question: "モルモットと合体した動物は何？",
    options: [
      "アヒル",
      "ガチョウ"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz1_A.png"
  },
  {
    image: "/quiz-images/quiz2.png",
    question: "うさぎと合体した動物は何？",
    options: [
      "フクロウ",
      "ミミズク"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz2_A.png"
  },
  {
    image: "/quiz-images/quiz3.png",
    question: "ハムスターと合体した動物は何？",
    options: [
      "ヤギ",
      "ヒツジ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz3_A.png"
  },
  {
    image: "/quiz-images/quiz4.png",
    question: "柴犬と合体した動物は何？",
    options: [
      "キツネ",
      "フェレット"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz4_A.png"
  },
  {
    image: "/quiz-images/quiz5.png",
    question: "柴犬と合体した動物は何？",
    options: [
      "たぬき",
      "アライグマ"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz5_A.png"
  },
  {
    image: "/quiz-images/quiz6.png",
    question: "しろくまと合体した動物は何？",
    options: [
      "ペンギン",
      "パンダ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz6_A.png"
  },
  {
    image: "/quiz-images/quiz7.png",
    question: "エルビス・プレスリーと合体した人物は誰？",
    options: [
      "マリリン・モンロー",
      "オードリー・ヘップバーン"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz7_A.png"
  },
  {
    image: "/quiz-images/quiz8.png",
    question: "マツコ・デラックスと合体した人物は誰？",
    options: [
      "松本人志",
      "千鳥・大吾"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz8_A.png"
  },
  {
    image: "/quiz-images/quiz9.png",
    question: "タモリと合体した人物は誰？",
    options: [
      "スティーブ・ジョブズ",
      "スティーヴン・スピルバーグ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz9_A.png"
  },
  {
    image: "/quiz-images/quiz10.png",
    question: "ライオンと合体した動物は何？",
    options: [
      "タコ",
      "イカ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz10_A.png"
  },
  {
    image: "/quiz-images/quiz11.png",
    question: "イルカと合体した動物は何？",
    options: [
      "ねずみ",
      "カピバラ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz11_A.png"
  },
  {
    image: "/quiz-images/quiz12.png",
    question: "カモメと合体した動物は何？",
    options: [
      "ペリカン",
      "アホウドリ"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz12_A.png"
  },
  {
    image: "/quiz-images/quiz13.png",
    question: "カラスと合体した動物は何？",
    options: [
      "アザラシ",
      "オットセイ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz13_A.png"
  },
  {
    image: "/quiz-images/quiz14.png",
    question: "カニと合体した動物は何？",
    options: [
      "イカ",
      "くらげ"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz14_A.png"
  },
  {
    image: "/quiz-images/quiz15.png",
    question: "イルカと合体した動物は何？",
    options: [
      "イルカ",
      "アザラシ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz15_A.png"
  },
  {
    image: "/quiz-images/quiz16.png",
    question: "クラゲと合体した動物は何？",
    options: [
      "フラミンゴ",
      "サギ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz16_A.png"
  },
  {
    image: "/quiz-images/quiz17.png",
    question: "サメと合体した動物は何？",
    options: [
      "クジラ",
      "ジンベイザメ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz17_A.png"
  },
  {
    image: "/quiz-images/quiz18.png",
    question: "リクガメと合体した動物は何？",
    options: [
      "キジ",
      "ヤンバルクイナ"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz18_A.png"
  },
  {
    image: "/quiz-images/quiz19.png",
    question: "パンダと合体した人は誰？",
    options: [
      "ピース・又吉",
      "マイケル・ジャクソン"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz19_A.png"
  },
  {
    image: "/quiz-images/quiz20.png",
    question: "ハリネズミと合体した人は誰？",
    options: [
      "マザー・テレサ",
      "レディー・ガガ"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz20_A.png"
  },
  {
    image: "/quiz-images/quiz21.png",
    question: "掃除機と合体した動物は何？",
    options: [
      "アリクイ",
      "アルマジロ"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz21_A.png"
  },
  {
    image: "/quiz-images/quiz22.png",
    question: "Bluetoothイヤホンと合体した動物は何？",
    options: [
      "ヤモリ",
      "カメレオン"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz22_A.png"
  },
  {
    image: "/quiz-images/quiz23.png",
    question: "ルンバと合体した動物は何？",
    options: [
      "ウナギ",
      "アナゴ"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz23_A.png"
  },
  {
    image: "/quiz-images/quiz24.png",
    question: "電子レンジと合体した家電は何？",
    options: [
      "空気清浄機",
      "スピーカー"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz24_A.png"
  },
  {
    image: "/quiz-images/quiz25.png",
    question: "アイロンと合体した家電は何？",
    options: [
      "電子レンジ",
      "炊飯器"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz25_A.png"
  },
  {
    image: "/quiz-images/quiz26.png",
    question: "ドラえもんと合体したキャラクターは何？",
    options: [
      "ウサビッチ",
      "トトロ"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz26_A.png"
  },
  {
    image: "/quiz-images/quiz27.png",
    question: "鉄腕アトムと合体したロボットは何？",
    options: [
      "ロックマン",
      "ペッパー君"
    ],
    correctAnswer: 0,
    feedbackImage: "/stamps/quiz27_A.png"
  },
  {
    image: "/quiz-images/quiz28.png",
    question: "PCと合体した動物は何？",
    options: [
      "トラ",
      "ライオン"
    ],
    correctAnswer: 1,
    feedbackImage: "/stamps/quiz28_A.png"
  },
] 
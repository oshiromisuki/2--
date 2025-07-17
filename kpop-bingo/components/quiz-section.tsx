"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { quizData } from "@/lib/quiz-data"

interface QuizSectionProps {
  onClose: () => void
  usedQuizIds: number[] // 使用済みクイズのID配列
  onComplete: (quizId: number) => void // クイズ完了時のコールバック
}

export default function QuizSection({ onClose, usedQuizIds, onComplete }: QuizSectionProps) {
  const [selectedQuiz, setSelectedQuiz] = useState(quizData[0])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizId, setQuizId] = useState(0)

  // コンポーネントがマウントされるたびに新しいクイズを選択
  useEffect(() => {
    // 未使用のクイズをフィルタリング
    const availableQuizzes = quizData.filter((_, index) => !usedQuizIds.includes(index))
    
    // 全てのクイズが使用済みの場合は最初からやり直し
    const quizzesToUse = availableQuizzes.length > 0 ? availableQuizzes : quizData
    
    // ランダムに選択
    const randomIndex = Math.floor(Math.random() * quizzesToUse.length)
    const selectedQuizData = quizzesToUse[randomIndex]
    
    // 選択されたクイズのIDを取得（元の配列内のインデックス）
    const originalIndex = quizData.findIndex(quiz => 
      quiz.question === selectedQuizData.question
    )
    
    setQuizId(originalIndex)
    setSelectedQuiz(selectedQuizData)
    setSelectedOption(null)
    setShowResult(false)
  }, [usedQuizIds])

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)
    setShowResult(true)
  }

  const isCorrect = selectedOption === selectedQuiz.correctAnswer

  const handleClose = () => {
    if (showResult) {
      // 結果が表示されている場合は使用済みとしてマーク
      onComplete(quizId)
    } else {
      // 回答前の場合は単にクローズ
      onClose()
    }
  }

  // 選択肢のラベルを生成（A, B, C...）
  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index) // A, B, C...
  }

  // 選択肢を4つに拡張（空欄で埋める）
  const paddedOptions = [...selectedQuiz.options]
  while (paddedOptions.length < 4) {
    paddedOptions.push("")
  }

  return (
    <Card className="bg-white/95 backdrop-blur-md border-4 border-orange-500 shadow-[0_0_20px_rgba(255,107,53,0.3)] rounded-xl w-full h-full">
      <CardContent className="p-10 h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-700">
            BINGO! Quiz Time
          </h3>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleClose}
            className="text-orange-700 hover:text-orange-900 hover:bg-orange-100/30 p-4"
          >
            <X className="h-10 w-10" />
          </Button>
        </div>

        <div className="flex flex-col justify-center flex-grow">
          {/* 問題文 */}
          <div className="text-center mb-12">
            <p className="text-orange-800 text-4xl font-bold leading-relaxed">
              {selectedQuiz.question}
            </p>
          </div>

          {/* 2×2の選択肢グリッド（常に4つ） */}
          <div className="grid grid-cols-2 grid-rows-2 gap-10 w-full mx-auto h-[50vh] items-center justify-center">
            {paddedOptions.map((option, index) => (
              <motion.div key={index} whileHover={option ? { scale: 1.04 } : {}} whileTap={option ? { scale: 0.98 } : {}} className="flex items-center justify-center h-full">
                <Button
                  variant="outline"
                  className={`w-full h-[12vh] min-h-[100px] text-3xl md:text-4xl font-bold flex items-center justify-center border-4 transition-all duration-200
                    ${selectedOption === index
                      ? selectedOption === selectedQuiz.correctAnswer
                        ? "border-orange-600 bg-orange-100 text-orange-800"
                        : "border-red-500 bg-red-100 text-red-500"
                      : "border-orange-400 bg-white hover:bg-orange-50 text-orange-800"}
                    ${!option ? "opacity-0 pointer-events-none" : ""}`}
                  onClick={() => option && !showResult && handleOptionSelect(index)}
                  disabled={showResult || !option}
                >
                  <span className="bg-orange-500 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center text-2xl mr-6 flex-shrink-0">
                    {getOptionLabel(index)}
                  </span>
                  <span className="flex-1 text-center">{option}</span>
                  {showResult && selectedOption === index && (
                    <div className="w-20 h-20 flex-shrink-0 ml-4">
                      <img 
                        src={index === selectedQuiz.correctAnswer ? "/maru.png" : "/batu.png"} 
                        alt={index === selectedQuiz.correctAnswer ? "Correct" : "Incorrect"}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* 結果表示 */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 space-y-6 text-center"
            >
              <div className={`p-8 rounded-lg text-3xl font-bold ${
                isCorrect ? "bg-orange-100 text-orange-700 border border-orange-400" : "bg-red-100 text-red-500 border border-red-300"
              }`}>
                {isCorrect
                  ? "正解です！素晴らしい！"
                  : `不正解です。正解は「${getOptionLabel(selectedQuiz.correctAnswer)}. ${selectedQuiz.options[selectedQuiz.correctAnswer]}」でした。`}
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={() => onComplete(quizId)}
                  size="lg"
                  className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-6 px-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-2xl"
                >
                  次へ
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"
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
      quiz.image === selectedQuizData.image && 
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

  return (
    <Card className="bg-black/90 backdrop-blur-md border-4 border-orange-500 shadow-[0_0_20px_rgba(255,153,0,0.6)] rounded-xl w-full h-full">
      <CardContent className="p-10 h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-yellow-200">
            BINGO! Quiz Time
          </h3>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleClose}
            className="text-orange-300 hover:text-orange-100 hover:bg-orange-900/30 p-4"
          >
            <X className="h-10 w-10" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 flex-grow">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="rounded-xl overflow-hidden border-4 border-orange-500/50 shadow-[0_0_20px_rgba(255,153,0,0.5)] relative">
              <img src={selectedQuiz.image} alt="Quiz image" className="w-full h-auto" />
              
              {/* 不正解時のみフィードバック画像表示 */}
              {showResult && !isCorrect && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={selectedQuiz.feedbackImage}
                      alt="Feedback image"
                      className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]"
                    />
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-orange-200 text-3xl mb-8">{selectedQuiz.question}</p>

            <div className="space-y-6">
              {selectedQuiz.options.map((option, index) => (
                <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left p-6 border-3 text-2xl min-h-[100px] ${
                      selectedOption === index
                        ? selectedOption === selectedQuiz.correctAnswer
                          ? "border-green-500 bg-green-500/20 text-green-300"
                          : "border-red-500 bg-red-500/20 text-red-300"
                        : "border-orange-500/50 bg-black/60 hover:bg-orange-900/30 text-orange-100"
                    }`}
                    onClick={() => !showResult && handleOptionSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-center w-full">
                      <span className="flex-1">{option}</span>
                      {showResult && selectedOption === index && (
                        <div className="w-16 h-16 flex-shrink-0 ml-4">
                          <img 
                            src={index === selectedQuiz.correctAnswer ? "/maru.png" : "/batu.png"} 
                            alt={index === selectedQuiz.correctAnswer ? "Correct" : "Incorrect"}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                <div className={`p-6 rounded-lg text-2xl ${
                  isCorrect ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                }`}>
                  {isCorrect
                    ? "Correct! You guessed the right prompt!"
                    : "Not quite! The correct prompt was: " + selectedQuiz.options[selectedQuiz.correctAnswer]}
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={() => onComplete(quizId)}
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl"
                  >
                    次へ
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
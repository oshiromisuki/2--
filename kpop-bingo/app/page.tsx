"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import NumberDisplay from "@/components/number-display"
import HistoryPanel from "@/components/history-panel"
import QuizSection from "@/components/quiz-section"
import ConfettiEffect from "@/components/confetti-effect"

export default function BingoGame() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [currentNumber, setCurrentNumber] = useState<number | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [quizKey, setQuizKey] = useState(0)
  const [usedQuizIds, setUsedQuizIds] = useState<number[]>([])

  const selectNumber = () => {
    if (isSelecting) return

    setIsSelecting(true)

    // Create array of numbers 1-90 that haven't been selected yet
    const availableNumbers = Array.from({ length: 90 }, (_, i) => i + 1).filter((num) => !selectedNumbers.includes(num))

    if (availableNumbers.length === 0) {
      setIsSelecting(false)
      return
    }

    // Simulate "spinning" through numbers rapidly
    let count = 0
    const maxCount = 20
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length)
      setCurrentNumber(availableNumbers[randomIndex])
      count++

      if (count >= maxCount) {
        clearInterval(interval)
        const finalNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)]
        setCurrentNumber(finalNumber)
        setSelectedNumbers((prev) => [...prev, finalNumber])
        setIsSelecting(false)
      }
    }, 100)
  }

  const handleBingo = () => {
    setShowConfetti(true)
    setQuizKey(prev => prev + 1)
    setTimeout(() => {
      setShowQuiz(true)
      setShowConfetti(false)
    }, 3000)
  }

  const resetGame = () => {
    setSelectedNumbers([])
    setCurrentNumber(null)
    setShowQuiz(false)
    setUsedQuizIds([])
  }

  const closeQuiz = () => {
    setShowQuiz(false)
  }

  const handleQuizComplete = (quizId: number) => {
    setUsedQuizIds(prev => [...prev, quizId])
    setShowQuiz(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {showConfetti && <ConfettiEffect />}

      <header className="pt-6 pb-3 px-4 text-center">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-blue-700 mb-2">
          BINGO クイズ
        </h1>
        <p className="text-blue-700 text-lg font-semibold drop-shadow-sm">数字を選んでカードをマークし、クイズに挑戦しよう！</p>
      </header>

      <main className="container mx-auto max-w-[1600px] px-12 py-4 flex flex-row gap-24">
        <div className="w-[45%] flex flex-col items-center justify-center">
          <NumberDisplay currentNumber={currentNumber} isSelecting={isSelecting} />

          <div className="mt-8 flex gap-6 justify-center w-full">
            <Button
              onClick={selectNumber}
              disabled={isSelecting || selectedNumbers.length >= 90}
              className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 text-white font-bold py-6 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl min-w-[200px] border-2 border-black"
            >
              {isSelecting ? "選択中..." : "数字を引く"}
            </Button>

            <Button
              onClick={handleBingo}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-6 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl min-w-[200px] border-2 border-black"
            >
              BINGO!
            </Button>

            <Button
              onClick={resetGame}
              variant="outline"
              className="border-2 border-black text-blue-700 hover:bg-blue-100 font-bold py-6 px-10 rounded-full shadow-lg transition-all duration-300 text-xl min-w-[200px]"
            >
              ゲームリセット
            </Button>
          </div>
        </div>

        <div className="w-[45%]">
          <HistoryPanel selectedNumbers={selectedNumbers} />
        </div>
      </main>

      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          >
            <div className="w-[95vw] h-[90vh] flex justify-center items-center">
              <QuizSection 
                key={quizKey} 
                onClose={closeQuiz} 
                usedQuizIds={usedQuizIds}
                onComplete={handleQuizComplete}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


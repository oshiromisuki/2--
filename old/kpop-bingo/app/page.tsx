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

  const selectNumber = () => {
    if (isSelecting) return

    setIsSelecting(true)

    // Create array of numbers 1-75 that haven't been selected yet
    const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1).filter((num) => !selectedNumbers.includes(num))

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
    setTimeout(() => {
      setShowQuiz(true)
      setShowConfetti(false)
    }, 3000)
  }

  const resetGame = () => {
    setSelectedNumbers([])
    setCurrentNumber(null)
    setShowQuiz(false)
  }

  const closeQuiz = () => {
    setShowQuiz(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 text-white">
      {showConfetti && <ConfettiEffect />}

      <header className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-2">
          BINGO AI
        </h1>
        <p className="text-pink-200 text-lg">Select numbers and mark your card!</p>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center justify-center lg:w-1/2">
          <NumberDisplay currentNumber={currentNumber} isSelecting={isSelecting} />

          <div className="mt-8 flex gap-4 justify-center w-full">
            <Button
              onClick={selectNumber}
              disabled={isSelecting || selectedNumbers.length >= 75}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              {isSelecting ? "Selecting..." : "Draw Number"}
            </Button>

            <Button
              onClick={handleBingo}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              BINGO!
            </Button>

            <Button
              onClick={resetGame}
              variant="outline"
              size="lg"
              className="border-pink-400 text-pink-200 hover:bg-pink-900/30 font-bold py-3 px-6 rounded-full"
            >
              Reset Game
            </Button>
          </div>
        </div>

        <div className="flex-1 lg:w-1/2">
          <HistoryPanel selectedNumbers={selectedNumbers} />
        </div>
      </main>

      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <QuizSection onClose={closeQuiz} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


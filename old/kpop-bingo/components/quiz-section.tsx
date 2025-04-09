"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import { quizData } from "@/lib/quiz-data"

interface QuizSectionProps {
  onClose: () => void
}

export default function QuizSection({ onClose }: QuizSectionProps) {
  const [selectedQuiz] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quizData.length)
    return quizData[randomIndex]
  })

  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)
    setShowResult(true)
  }

  const isCorrect = selectedOption === selectedQuiz.correctAnswer

  return (
    <Card className="bg-black/80 backdrop-blur-md border-2 border-pink-500 shadow-[0_0_15px_rgba(219,39,119,0.5)] rounded-xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            BINGO! Quiz Time
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-pink-300 hover:text-pink-100 hover:bg-pink-900/30"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="rounded-lg overflow-hidden border-2 border-pink-500/50 shadow-[0_0_15px_rgba(219,39,119,0.3)]">
              <img src={selectedQuiz.image} alt="Quiz image" className="w-full h-auto" />
            </div>
          </div>

          <div className="lg:w-1/2">
            <p className="text-pink-200 text-lg mb-6">Which prompt was used to generate this image?</p>

            <div className="space-y-4">
              {selectedQuiz.options.map((option, index) => (
                <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left p-4 border-2 text-base min-h-[60px] ${
                      selectedOption === index
                        ? selectedOption === selectedQuiz.correctAnswer
                          ? "border-green-500 bg-green-500/20 text-green-300"
                          : "border-red-500 bg-red-500/20 text-red-300"
                        : "border-pink-500/50 bg-black/30 hover:bg-pink-900/30 text-pink-200"
                    }`}
                    onClick={() => !showResult && handleOptionSelect(index)}
                    disabled={showResult}
                  >
                    <span className="block">{option}</span>
                  </Button>
                </motion.div>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-4"
              >
                <div className={`p-4 rounded-lg text-lg ${
                  isCorrect ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                }`}>
                  {isCorrect
                    ? "Correct! You guessed the right prompt!"
                    : "Not quite! The correct prompt was: " + selectedQuiz.options[selectedQuiz.correctAnswer]}
                </div>
                <div className="flex justify-center">
                  <Image
                    src={isCorrect ? "/stamps/congratulations.png" : "/stamps/sad.png"}
                    alt={isCorrect ? "Congratulations stamp" : "Sad stamp"}
                    width={150}
                    height={150}
                    className="animate-bounce"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


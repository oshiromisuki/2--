"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface HistoryPanelProps {
  selectedNumbers: number[]
}

export default function HistoryPanel({ selectedNumbers }: HistoryPanelProps) {
  // Create arrays for each column (B: 1-15, I: 16-30, etc.)
  const columns = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),
    I: Array.from({ length: 15 }, (_, i) => i + 16),
    N: Array.from({ length: 15 }, (_, i) => i + 31),
    G: Array.from({ length: 15 }, (_, i) => i + 46),
    O: Array.from({ length: 15 }, (_, i) => i + 61),
  }

  return (
    <Card className="bg-black/30 backdrop-blur-md border-pink-500/30 shadow-[0_0_15px_rgba(219,39,119,0.3)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
          Called Numbers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {Object.entries(columns).map(([letter, _]) => (
            <div key={letter} className="text-center font-bold text-2xl text-pink-400">
              {letter}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Object.entries(columns).map(([letter, numbers]) => (
            <div key={letter} className="flex flex-col gap-1">
              {numbers.map((num) => (
                <motion.div
                  key={num}
                  initial={selectedNumbers.includes(num) ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.5 }}
                  animate={selectedNumbers.includes(num) ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0.5 }}
                  className={`rounded-full p-1 text-center font-bold ${
                    selectedNumbers.includes(num)
                      ? "bg-gradient-to-r from-pink-600/40 to-purple-600/40"
                      : "bg-pink-900/20"
                  }`}
                >
                  {num}
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-pink-200">{selectedNumbers.length} / 75 numbers called</div>
      </CardContent>
    </Card>
  )
}


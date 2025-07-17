"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface HistoryPanelProps {
  selectedNumbers: number[]
}

export default function HistoryPanel({ selectedNumbers }: HistoryPanelProps) {
  // Create arrays for each column (B: 1-18, I: 19-36, N: 37-54, G: 55-72, O: 73-90)
  const columns = {
    B: Array.from({ length: 18 }, (_, i) => i + 1),
    I: Array.from({ length: 18 }, (_, i) => i + 19),
    N: Array.from({ length: 18 }, (_, i) => i + 37),
    G: Array.from({ length: 18 }, (_, i) => i + 55),
    O: Array.from({ length: 18 }, (_, i) => i + 73),
  }

  // Get the last 3 selected numbers in reverse order
  const recentNumbers = [...selectedNumbers].reverse().slice(0, 3)

  return (
    <Card className="bg-white/95 backdrop-blur-md border-orange-600 border-2 shadow-[0_0_10px_rgba(255,107,53,0.10)]">
      <CardHeader className="pb-3 pt-6 px-8">
        <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-700">
          呼ばれた数字
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-6">
        {/* Recent numbers display */}
        {recentNumbers.length > 0 && (
          <div className="mb-6 flex justify-center gap-6">
            {recentNumbers.map((num, index) => (
              <motion.div
                key={`recent-${num}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 flex items-center justify-center text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 rounded-full border-2 border-orange-600 text-white shadow-lg"
              >
                {num}
              </motion.div>
            ))}
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-orange-900 mb-2">
            <span className="text-xl font-bold">{selectedNumbers.length} / 90</span>
            <span className="text-xl font-bold">
              残り {90 - selectedNumbers.length} 個
            </span>
          </div>
          <div className="w-full h-5 bg-orange-100 rounded-full overflow-hidden border border-orange-500">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500"
              style={{ width: `${(selectedNumbers.length / 90) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {Object.entries(columns).map(([letter, _]) => (
            <div key={letter} className="text-center font-bold text-3xl text-white bg-orange-500 rounded-lg py-1 border border-orange-600">
              {letter}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Object.entries(columns).map(([letter, numbers]) => (
            <div key={letter} className="flex flex-col gap-2">
              {numbers.map((num) => (
                <motion.div
                  key={num}
                  initial={selectedNumbers.includes(num) ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.7 }}
                  animate={selectedNumbers.includes(num) ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0.7 }}
                  className={`rounded-lg p-2 text-center font-bold text-xl border ${
                    selectedNumbers.includes(num)
                      ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white border-orange-600 shadow-[0_0_10px_rgba(255,107,53,0.10)]"
                      : "bg-orange-50 text-orange-400 border-orange-500"
                  }`}
                >
                  {num}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


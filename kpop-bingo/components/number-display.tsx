"use client"

import { cn } from "@/lib/utils"

import { motion, AnimatePresence } from "framer-motion"

interface NumberDisplayProps {
  currentNumber: number | null
  isSelecting: boolean
}

export default function NumberDisplay({ currentNumber, isSelecting }: NumberDisplayProps) {
  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      {/* Decorative background circles */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-200/40 to-orange-400/30 blur-md border-4 border-orange-600"></div>
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-100/30 to-orange-300/20 animate-pulse border-2 border-orange-500"></div>

      {/* Spinning outer ring when selecting */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-4 border-orange-600",
          isSelecting ? "border-t-orange-400 border-r-orange-300 border-b-orange-400 border-l-orange-300 animate-spin" : "",
        )}
      ></div>

      {/* Number display */}
      <div className="relative bg-white w-[500px] h-[500px] rounded-full flex items-center justify-center border-4 border-orange-600 shadow-[0_0_15px_rgba(255,107,53,0.15)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNumber || "empty"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            {currentNumber ? (
              <span className="text-[16rem] md:text-[16rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-700 drop-shadow-[0_0_10px_rgba(255,107,53,0.3)]">
                {currentNumber}
              </span>
            ) : (
              <span className="text-6xl md:text-6xl text-orange-600 opacity-90 drop-shadow-[0_0_10px_rgba(255,107,53,0.2)]">BINGO</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}


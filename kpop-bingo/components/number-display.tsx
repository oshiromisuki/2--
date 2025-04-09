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
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-600/30 to-orange-400/30 blur-md"></div>
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-300/20 animate-pulse"></div>

      {/* Spinning outer ring when selecting */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-4 border-transparent",
          isSelecting ? "border-t-orange-400 border-r-orange-300 border-b-orange-400 border-l-orange-300 animate-spin" : "",
        )}
      ></div>

      {/* Number display */}
      <div className="relative bg-black/50 backdrop-blur-sm w-[500px] h-[500px] rounded-full flex items-center justify-center border-2 border-orange-500/50 shadow-[0_0_15px_rgba(255,153,0,0.5)]">
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
              <span className="text-[16rem] md:text-[16rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-yellow-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {currentNumber}
              </span>
            ) : (
              <span className="text-6xl md:text-6xl text-orange-200 opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Ready to draw</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}


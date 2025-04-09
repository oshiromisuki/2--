"use client"

import { cn } from "@/lib/utils"

import { motion, AnimatePresence } from "framer-motion"

interface NumberDisplayProps {
  currentNumber: number | null
  isSelecting: boolean
}

export default function NumberDisplay({ currentNumber, isSelecting }: NumberDisplayProps) {
  return (
    <div className="relative w-[576px] h-[576px] flex items-center justify-center">
      {/* Decorative background circles */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-md"></div>
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse"></div>

      {/* Spinning outer ring when selecting */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-4 border-transparent",
          isSelecting ? "border-t-pink-400 border-r-purple-400 border-b-blue-400 border-l-cyan-400 animate-spin" : "",
        )}
      ></div>

      {/* Number display */}
      <div className="relative bg-black/30 backdrop-blur-sm w-[480px] h-[480px] rounded-full flex items-center justify-center border-2 border-pink-500/50 shadow-[0_0_15px_rgba(219,39,119,0.5)]">
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
              <span className="text-[12rem] md:text-[14rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                {currentNumber}
              </span>
            ) : (
              <span className="text-4xl text-pink-300 opacity-70">Ready to draw</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}


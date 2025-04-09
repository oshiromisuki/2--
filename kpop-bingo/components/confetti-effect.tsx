"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

export default function ConfettiEffect() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Create a confetti cannon
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff44cc", "#9900ff", "#00ccff", "#ff0066"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff44cc", "#9900ff", "#00ccff", "#ff0066"],
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  // Only render on client to avoid SSR issues
  if (!isClient) return null

  return null // This component doesn't render anything visible
}


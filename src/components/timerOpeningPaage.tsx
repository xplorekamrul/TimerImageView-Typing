"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function HomePage() {
  // 9 seconds countdown
  const [timeLeft, setTimeLeft] = useState(9)
  // controls whether the timer overlay is shown
  const [showTimer, setShowTimer] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else {
      // When the countdown finishes, hide the timer overlay
      setShowTimer(false)
    }

    return () => clearInterval(interval)
  }, [timeLeft])

  // Calculate progress and circle values for the timer animation
  const progress = timeLeft / 9
  const radius = 120
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  // Timer overlay component
  const timerOverlay = (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* SVG for the circular progress indicator */}
        <svg className="absolute w-full h-full" viewBox="0 0 256 256">
          <circle
            cx="128"
            cy="128"
            r={radius}
            fill="transparent"
            stroke="#0f172a"
            strokeWidth="8"
          />
          <motion.circle
            cx="128"
            cy="128"
            r={radius}
            fill="transparent"
            stroke="#2563eb"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: 0 }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "linear" }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>

        {/* Timer number */}
        <motion.div
          className="text-white text-8xl font-bold z-10"
          key={timeLeft}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {timeLeft > 0 ? timeLeft : "Go!"}
        </motion.div>
      </div>
    </div>
  )

  return (
    <>
      {showTimer && timerOverlay}
      <></>
    </>
  )
}

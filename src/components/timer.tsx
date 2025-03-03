"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds = 1 minute
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const resetTimer = () => {
    setTimeLeft(60)
    setIsRunning(false)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  // Calculate the progress for the circle (from 0 to 1)
  const progress = timeLeft / 60

  // Calculate the circumference of the circle
  const radius = 120
  const circumference = 2 * Math.PI * radius

  // Calculate the stroke-dashoffset based on the progress
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* SVG for the circular progress indicator */}
        <svg className="absolute w-full h-full" viewBox="0 0 256 256">
          <circle cx="128" cy="128" r={radius} fill="transparent" stroke="#0f172a" strokeWidth="8" />
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
          {timeLeft}
        </motion.div>
      </div>
    </div>
  )
}


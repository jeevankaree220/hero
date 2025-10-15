import React, { useEffect, useState } from 'react'

interface CircularTimerProps {
  initialSeconds: number
  onComplete?: () => void
}

export const CircularTimer: React.FC<CircularTimerProps> = ({ initialSeconds, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  
  useEffect(() => {
    if (seconds <= 0) {
      onComplete?.()
      return
    }
    
    const timer = setInterval(() => {
      setSeconds(prev => prev - 1)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [seconds, onComplete])
  
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const progress = ((initialSeconds - seconds) / initialSeconds) * 283 // 283 is circumference
  
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="45"
          stroke="#E9E9EB"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="96"
          cy="96"
          r="45"
          stroke="#48C479"
          strokeWidth="8"
          fill="none"
          strokeDasharray="283"
          strokeDashoffset={progress}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      
      {/* Timer text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-[#282C3F]">
          {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
        </div>
        <div className="text-sm text-[#7E808C] mt-1">mins remaining</div>
      </div>
    </div>
  )
}


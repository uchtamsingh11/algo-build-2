"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressiveBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'left' | 'right' | 'top' | 'bottom'
  blurIntensity?: number
}

export function ProgressiveBlur({
  direction = 'right',
  blurIntensity = 0.5,
  className,
  ...props
}: ProgressiveBlurProps) {
  // Calculate gradient direction based on the direction prop
  const getGradient = () => {
    switch (direction) {
      case 'left':
        return 'to left'
      case 'right':
        return 'to right'
      case 'top':
        return 'to top'
      case 'bottom':
        return 'to bottom'
      default:
        return 'to right'
    }
  }

  // Generate blur values for 10 steps
  const steps = 10
  const blurSteps = Array.from({ length: steps }, (_, i) => {
    // Calculate the percentage for this step
    const percent = Math.round((i / (steps - 1)) * 100)
    // Calculate the blur value based on the intensity
    const blurValue = (i * blurIntensity) / 2
    return `rgba(255, 255, 255, 0.01) ${percent}%`
  }).join(', ')

  return (
    <div
      className={cn(className)}
      style={{
        backgroundImage: `linear-gradient(${getGradient()}, ${blurSteps})`,
        maskImage: `linear-gradient(${getGradient()}, transparent, black)`,
        WebkitMaskImage: `linear-gradient(${getGradient()}, transparent, black)`,
      }}
      {...props}
    />
  )
} 
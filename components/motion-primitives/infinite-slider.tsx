"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion'

interface InfiniteSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  gap?: number
  speed?: number
  speedOnHover?: number
  reverse?: boolean
}

export function InfiniteSlider({
  children,
  gap = 32,
  speed = 15,
  speedOnHover = 0,
  reverse = false,
  className,
  ...props
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)

  const [wrapperWidth, setWrapperWidth] = useState<number>(0)
  const [scrollerWidth, setScrollerWidth] = useState<number>(0)
  const [duplicatedItems, setDuplicatedItems] = useState<React.ReactNode[]>([])

  // Create a motion value for the x position of the slider
  const x = useMotionValue(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      setWrapperWidth(containerRef.current.offsetWidth)
      setScrollerWidth(scrollerRef.current.scrollWidth)
    }

    // Duplicate the children if necessary to fill the slider
    const childrenArray = React.Children.toArray(children)
    setDuplicatedItems([...childrenArray, ...childrenArray, ...childrenArray])
  }, [children])

  // Use a motion frame animation to animate the slider
  useAnimationFrame((time, delta) => {
    if (!containerRef.current || !scrollerRef.current || wrapperWidth === 0 || scrollerWidth === 0) {
      return
    }

    // Calculate the target speed based on hover state
    const targetSpeed = hovered ? speedOnHover : speed
    const speedToUse = targetSpeed * (delta / 1000)
    
    // Apply direction based on reverse prop
    const direction = reverse ? 1 : -1
    let newX = x.get() + (speedToUse * direction)
    
    // Handle looping differently based on direction
    if (reverse) {
      if (newX > scrollerWidth / 3) {
        newX = 0
      }
    } else {
      if (newX < -scrollerWidth / 3) {
        newX = 0
      }
    }

    x.set(newX)
  })

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ overflow: 'hidden' }}
      {...props}
    >
      <motion.ul
        ref={scrollerRef}
        style={{ x, gap: `${gap}px` }}
        className="flex w-max flex-nowrap whitespace-nowrap"
      >
        {duplicatedItems.map((child, idx) => (
          <li key={idx} className="flex-none">
            {child}
          </li>
        ))}
      </motion.ul>
    </div>
  )
} 
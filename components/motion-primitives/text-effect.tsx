"use client"

import React, { HTMLAttributes, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"
import { motion, useAnimation, useInView, Variants } from 'framer-motion'

interface TextEffectProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  children: React.ReactNode
  delay?: number
  duration?: number
  per?: 'character' | 'word' | 'line'
  preset?: 'fade-in' | 'fade-in-blur' | 'slide-in-right' | 'slide-in-left' | 'slide-in-bottom' | 'zoom-in'
  speedSegment?: number
}

const presets = {
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'fade-in-blur': {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  'slide-in-right': {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-in-left': {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-in-bottom': {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
}

export function TextEffect({
  as: Component = 'div',
  children,
  delay = 0,
  duration = 0.5,
  className,
  per = 'word',
  preset = 'fade-in',
  speedSegment = 0.05,
  ...props
}: TextEffectProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isInView) {
      timer = setTimeout(() => {
        controls.start('visible')
      }, delay * 1000)
    }
    return () => clearTimeout(timer)
  }, [isInView, controls, delay])

  const getVariants = (index: number): Variants => {
    const baseVariant = presets[preset]
    return {
      hidden: baseVariant.hidden,
      visible: {
        ...baseVariant.visible,
        transition: {
          duration,
          delay: speedSegment * index,
          ease: [0.33, 1, 0.68, 1],
        },
      },
    }
  }

  const renderCharacters = (text: string) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={getVariants(index)}
        className="inline-block"
        style={{
          whiteSpace: char === ' ' ? 'pre' : 'normal',
        }}
      >
        {char}
      </motion.span>
    ))
  }

  const renderWords = (text: string) => {
    return text.split(' ').map((word, index) => (
      <React.Fragment key={index}>
        <motion.span
          variants={getVariants(index)}
          className="inline-block"
        >
          {word}
        </motion.span>
        {index !== text.split(' ').length - 1 && ' '}
      </React.Fragment>
    ))
  }

  const renderLines = (content: React.ReactNode) => {
    if (typeof content === 'string') {
      return content.split('\n').map((line, index) => {
        const MotionElement = Component === 'p' ? motion.span : motion.div
        return (
          <MotionElement
            key={index}
            variants={getVariants(index)}
            className={Component === 'p' ? "inline" : "block"}
          >
            {line}
          </MotionElement>
        )
      })
    }

    if (Array.isArray(content)) {
      return content.map((item, index) => {
        const MotionElement = Component === 'p' ? motion.span : motion.div
        return (
          <MotionElement
            key={index}
            variants={getVariants(index)}
            className={Component === 'p' ? "inline" : "block"}
          >
            {item}
          </MotionElement>
        )
      })
    }

    const MotionElement = Component === 'p' ? motion.span : motion.div
    return (
      <MotionElement
        variants={getVariants(0)}
        className={Component === 'p' ? "inline" : "block"}
      >
        {content}
      </MotionElement>
    )
  }

  const renderContent = (content: React.ReactNode) => {
    if (typeof content !== 'string') {
      const MotionElement = Component === 'p' ? motion.span : motion.div
      return (
        <MotionElement
          variants={getVariants(0)}
          className={Component === 'p' ? "inline" : "block"}
        >
          {content}
        </MotionElement>
      )
    }

    switch (per) {
      case 'character':
        return renderCharacters(content)
      case 'word':
        return renderWords(content)
      case 'line':
        return renderLines(content)
      default:
        return content
    }
  }

  // Use motion.div for the wrapper only if the component is not a p tag
  const MotionWrapper = Component === 'p' ? motion.span : motion.div
  
  return (
    <Component
      ref={ref}
      className={cn(className)}
      {...props}
    >
      <MotionWrapper
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            transition: {
              staggerChildren: speedSegment,
            },
          },
        }}
        className={Component === 'p' ? "inline" : "contents"}
      >
        {renderContent(children)}
      </MotionWrapper>
    </Component>
  )
} 
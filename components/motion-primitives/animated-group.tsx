"use client"

import React, { HTMLAttributes, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"
import { motion, useAnimation, useInView, Variants } from 'framer-motion'

interface AnimatedGroupProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  children: React.ReactNode
  delay?: number
  variants?: {
    container?: Variants
    item?: Variants
  }
}

export function AnimatedGroup({
  as: Component = 'div',
  children,
  className,
  delay = 0,
  variants,
  ...props
}: AnimatedGroupProps) {
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

  const defaultVariants = {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.33, 1, 0.68, 1],
        },
      },
    },
  }

  const containerVariants = variants?.container || defaultVariants.container
  const itemVariants = variants?.item || defaultVariants.item

  return (
    <Component
      ref={ref}
      className={cn(className)}
      {...props}
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="contents"
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Create a wrapped version with motion.div
            return (
              <motion.div variants={itemVariants}>
                {React.cloneElement(child, {})}
              </motion.div>
            )
          }
          return child
        })}
      </motion.div>
    </Component>
  )
} 
"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BackButton() {
  return (
    <div className="absolute top-28 left-8 md:left-12 lg:left-16">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10 bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:bg-gray-800"
      >
        <Link href="/">
          <ArrowLeft className="h-5 w-5 text-gray-300" />
          <span className="sr-only">Back to home</span>
        </Link>
      </Button>
    </div>
  )
} 
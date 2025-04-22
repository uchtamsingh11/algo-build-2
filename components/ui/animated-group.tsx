'use client';
import { ReactNode } from 'react';
import * as React from 'react';
import { cn } from '@/lib/utils';

// Since we're having issues with the motion library, let's create a simpler AnimatedGroup
// that uses CSS animations instead

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'zoom';

export type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  preset?: PresetType;
};

// CSS class mappings for animations
const presetClasses: Record<PresetType, string> = {
  fade: 'animate-fade-in',
  slide: 'animate-slide-in',
  scale: 'animate-scale-in',
  blur: 'animate-blur-in',
  zoom: 'animate-zoom-in',
};

function AnimatedGroup({
  children,
  className,
  preset = 'fade',
}: AnimatedGroupProps) {
  const animationClass = presetClasses[preset] || '';

  return (
    <div className={cn('transition-all', className)}>
      {React.Children.map(children, (child, index) => (
        <div 
          key={index} 
          className={cn(
            animationClass,
            'transition-all'
          )}
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export { AnimatedGroup };

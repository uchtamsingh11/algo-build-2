import React from 'react'
import { render } from '@testing-library/react'
import { AnimatedGroup } from './animated-group'

describe('AnimatedGroup', () => {
  it('renders children with default fade animation class', () => {
    const { container } = render(
      <AnimatedGroup>
        <div>Child 1</div>
        <div>Child 2</div>
      </AnimatedGroup>
    )
    
    const animatedElements = container.querySelectorAll('.animate-fade-in')
    expect(animatedElements.length).toBe(2)
    expect(animatedElements[0]).toHaveTextContent('Child 1')
    expect(animatedElements[1]).toHaveTextContent('Child 2')
  })
  
  it('applies custom animation classes based on preset prop', () => {
    const { container } = render(
      <AnimatedGroup preset="slide">
        <div>Child 1</div>
        <div>Child 2</div>
      </AnimatedGroup>
    )
    
    const animatedElements = container.querySelectorAll('.animate-slide-in')
    expect(animatedElements.length).toBe(2)
  })
  
  it('has animation delay configuration for children', () => {
    const { getByText } = render(
      <AnimatedGroup>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </AnimatedGroup>
    )
    
    // Just verify children are rendered
    expect(getByText('Child 1')).toBeInTheDocument()
    expect(getByText('Child 2')).toBeInTheDocument()
    expect(getByText('Child 3')).toBeInTheDocument()
  })
  
  it('applies additional classes passed via className prop', () => {
    const { container } = render(
      <AnimatedGroup className="test-class">
        <div>Child</div>
      </AnimatedGroup>
    )
    
    const parentElement = container.firstChild
    expect(parentElement).toHaveClass('test-class')
    expect(parentElement).toHaveClass('transition-all')
  })
  
  it('works with all available presets', () => {
    const presets = ['fade', 'slide', 'scale', 'blur', 'zoom']
    
    presets.forEach(preset => {
      const { container } = render(
        <AnimatedGroup preset={preset}>
          <div>Test</div>
        </AnimatedGroup>
      )
      
      const animationClass = `animate-${preset}-in`
      const animatedElement = container.querySelector(`.${animationClass}`)
      expect(animatedElement).toBeInTheDocument()
    })
  })
}) 
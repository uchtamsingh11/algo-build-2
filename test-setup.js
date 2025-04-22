// Jest setup file
import '@testing-library/jest-dom'
import { jest } from '@jest/globals'

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn((param) => {
      if (param === 'error') return 'test-error'
      if (param === 'signup') return 'success'
      return null
    }),
  }),
}))

// Mock notification hook
jest.mock('@/lib/notification', () => ({
  useNotification: () => ({
    showNotification: jest.fn(),
  }),
}))

// Set up window.matchMedia for CSS animations testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}) 
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { useNotification } from '@/lib/notification'

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children, className }) => <div data-testid="card-title" className={className}>{children}</div>,
}))

jest.mock('@/lib/notification', () => ({
  useNotification: jest.fn().mockReturnValue({
    showNotification: jest.fn()
  })
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn((param) => {
      if (param === 'error') return 'test-error'
      return null
    }),
  }),
}))

describe('Error Page', () => {
  it('renders the error page with Suspense boundary', async () => {
    render(<Page />)
    
    // Error content should be rendered
    await waitFor(() => {
      expect(screen.getByText('Sorry, something went wrong.')).toBeInTheDocument()
    })
  })
  
  it('shows error notification with specific error when error param is present', async () => {
    const mockShowNotification = jest.fn()
    useNotification.mockReturnValue({
      showNotification: mockShowNotification
    })
    
    render(<Page />)
    
    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        title: 'Authentication Error',
        description: 'test-error',
        type: 'error'
      })
    })
  })
  
  it('displays the error code when error param is present', async () => {
    render(<Page />)
    
    await waitFor(() => {
      expect(screen.getByText(/Code error: test-error/)).toBeInTheDocument()
    })
  })
}) 
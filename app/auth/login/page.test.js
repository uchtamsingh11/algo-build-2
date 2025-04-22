import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { useNotification } from '@/lib/notification'

jest.mock('@/components/login-form', () => ({
  LoginForm: () => <div data-testid="login-form">Mocked Login Form</div>
}))

jest.mock('@/lib/notification', () => ({
  useNotification: jest.fn().mockReturnValue({
    showNotification: jest.fn()
  })
}))

describe('Login Page', () => {
  it('renders the login page with Suspense boundary', async () => {
    render(<Page />)
    
    // The form should be rendered eventually
    await waitFor(() => {
      expect(screen.getByTestId('login-form')).toBeInTheDocument()
    })
  })
  
  it('shows success notification when signup=success param is present', async () => {
    const mockShowNotification = jest.fn()
    useNotification.mockReturnValue({
      showNotification: mockShowNotification
    })
    
    render(<Page />)
    
    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        title: 'Thank you for signing up!',
        description: 'Check your email to confirm your account before signing in.',
        type: 'success'
      })
    })
  })
  
  it('correctly imports and uses LoginForm component', async () => {
    render(<Page />)
    
    await waitFor(() => {
      const formElement = screen.getByTestId('login-form')
      expect(formElement).toBeInTheDocument()
      expect(formElement).toHaveTextContent('Mocked Login Form')
    })
  })
}) 
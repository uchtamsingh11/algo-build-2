import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { useNotification } from '@/lib/notification'

jest.mock('@/components/sign-up-form', () => ({
  SignUpForm: () => <div data-testid="signup-form">Mocked SignUp Form</div>
}))

jest.mock('@/lib/notification', () => ({
  useNotification: jest.fn().mockReturnValue({
    showNotification: jest.fn()
  })
}))

describe('Signup Page', () => {
  it('renders the signup page with Suspense boundary', async () => {
    render(<Page />)
    
    // Then the form should be rendered eventually
    await waitFor(() => {
      expect(screen.getByTestId('signup-form')).toBeInTheDocument()
    })
  })
  
  it('shows error notification when error param is present', async () => {
    const mockShowNotification = jest.fn()
    useNotification.mockReturnValue({
      showNotification: mockShowNotification
    })
    
    render(<Page />)
    
    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        title: 'Signup Error',
        description: 'test-error',
        type: 'error'
      })
    })
  })
  
  it('correctly imports and uses SignUpForm from sign-up-form component', async () => {
    render(<Page />)
    
    await waitFor(() => {
      const formElement = screen.getByTestId('signup-form')
      expect(formElement).toBeInTheDocument()
      expect(formElement).toHaveTextContent('Mocked SignUp Form')
    })
  })
}) 
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NotFound from '@/app/not-found'

// Mock window.history.back
const mockBack = jest.fn()
Object.defineProperty(window, 'history', {
  value: {
    back: mockBack,
  },
  writable: true,
})

describe('NotFound Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders 404 page with correct content', () => {
    render(<NotFound />)

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
    expect(screen.getByText(/The page you're looking for doesn't exist or has been moved/)).toBeInTheDocument()
  })

  it('renders FileX icon', () => {
    render(<NotFound />)

    // The FileX icon should be present (lucide-react icon)
    // Check that the icon container exists by looking for the icon container div
    const iconContainer = screen.getByText('404').closest('div')?.parentElement?.parentElement?.parentElement
    expect(iconContainer).toBeInTheDocument()
  })

  it('has Go Home button with correct link', () => {
    render(<NotFound />)

    const goHomeButton = screen.getByRole('link', { name: /go home/i })
    expect(goHomeButton).toHaveAttribute('href', '/')
    expect(goHomeButton).toHaveTextContent('Go Home')
  })

  it('has Go Back button that calls window.history.back', async () => {
    const user = userEvent.setup()
    render(<NotFound />)

    const goBackButton = screen.getByRole('button', { name: /go back/i })
    await user.click(goBackButton)

    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  it('renders both Home and ArrowLeft icons', () => {
    render(<NotFound />)

    // Both icons should be present as SVG elements
    const homeIcon = screen.getByText('Go Home').querySelector('.lucide-house')
    const backIcon = screen.getByText('Go Back').querySelector('.lucide-arrow-left')
    expect(homeIcon).toBeInTheDocument()
    expect(backIcon).toBeInTheDocument()
  })

  it('has proper responsive layout classes', () => {
    render(<NotFound />)

    // Check that the main container has proper classes
    const mainContainer = screen.getByText('404').closest('div')?.parentElement?.parentElement?.parentElement?.parentElement
    expect(mainContainer).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center')
  })

  it('has proper card styling', () => {
    render(<NotFound />)

    const card = screen.getByText('404').closest('[data-slot="card"]')
    expect(card).toHaveClass('glass-effect', 'border-0', 'shadow-2xl')
  })

  it('has proper button styling', () => {
    render(<NotFound />)

    const goHomeButton = screen.getByRole('link', { name: /go home/i })
    const goBackButton = screen.getByRole('button', { name: /go back/i })

    // Check that buttons exist and have some styling
    expect(goHomeButton).toBeInTheDocument()
    expect(goBackButton).toBeInTheDocument()
  })

  it('has proper text hierarchy', () => {
    render(<NotFound />)

    const heading1 = screen.getByRole('heading', { level: 1 })
    const heading2 = screen.getByRole('heading', { level: 2 })

    expect(heading1).toHaveTextContent('404')
    expect(heading2).toHaveTextContent('Page Not Found')
  })

  it('has proper dark mode classes', () => {
    render(<NotFound />)

    const heading1 = screen.getByRole('heading', { level: 1 })
    expect(heading1).toHaveClass('dark:text-white')
  })

  it('has proper spacing and layout', () => {
    render(<NotFound />)

    // Check that the card has proper spacing
    const card = screen.getByText('404').closest('[data-slot="card"]')
    expect(card).toHaveClass('space-y-6')
  })
})

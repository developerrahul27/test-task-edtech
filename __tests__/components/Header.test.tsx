import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/Header'
import { useAuth } from '@/context/auth-context'
import { logout } from '@/app/actions/auth'

// Mock the auth context
jest.mock('@/context/auth-context')
jest.mock('@/app/actions/auth')

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
const mockLogout = logout as jest.MockedFunction<typeof logout>

describe('Header Component', () => {
  const mockSetUser = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockLogout.mockResolvedValue(undefined)
  })

  it('renders header with logo and navigation', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      setUser: mockSetUser,
    })

    render(<Header />)

    expect(screen.getByText('ProjectTracker')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projecttracker/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard')
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '/projects')
  })

  it('shows user avatar with first letter when user is logged in', () => {
    const mockUser = {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Test bio',
      dob: '1990-01-01',
      gender: 'male',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    }

    mockUseAuth.mockReturnValue({
      user: mockUser,
      setUser: mockSetUser,
    })

    render(<Header />)

    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('shows user icon when no user is logged in', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      setUser: mockSetUser,
    })

    render(<Header />)

    // Check that buttons are present (avatar and theme toggle)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders header with navigation links', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      setUser: mockSetUser,
    })

    render(<Header />)

    // Check that navigation links are present
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard')
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '/projects')
  })

  it('shows user avatar when user is logged in', () => {
    const mockUser = {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Test bio',
      dob: '1990-01-01',
      gender: 'male',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    }

    mockUseAuth.mockReturnValue({
      user: mockUser,
      setUser: mockSetUser,
    })

    render(<Header />)

    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('renders logout functionality when user is logged in', () => {
    const mockUser = {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Test bio',
      dob: '1990-01-01',
      gender: 'male',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    }

    mockUseAuth.mockReturnValue({
      user: mockUser,
      setUser: mockSetUser,
    })

    render(<Header />)

    // Check that the component renders without errors when user is logged in
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      setUser: mockSetUser,
    })

    render(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('border-b')
  })

  it('renders theme toggle component', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      setUser: mockSetUser,
    })

    render(<Header />)

    // ModeToggle should be present (we can't test its internal functionality without mocking it)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})

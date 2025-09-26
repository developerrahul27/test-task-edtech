import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileEditForm from '@/components/ProfileEditForm'

// Mock the toast function
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

const mockUser = {
  _id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Software developer',
  dob: '1990-01-01T00:00:00.000Z',
  gender: 'male',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
}

describe('ProfileEditForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
  })

  it('renders user information correctly', () => {
    render(<ProfileEditForm user={mockUser} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Software developer')).toBeInTheDocument()
  })

  it('enters edit mode when edit button is clicked', async () => {
    const user = userEvent.setup()
    render(<ProfileEditForm user={mockUser} />)
    
    const editButton = screen.getByRole('button', { name: /edit profile/i })
    await user.click(editButton)
    
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('validates form fields', async () => {
    const user = userEvent.setup()
    render(<ProfileEditForm user={mockUser} />)
    
    // Enter edit mode
    await user.click(screen.getByRole('button', { name: /edit profile/i }))
    
    // Clear name field
    const nameInput = screen.getByDisplayValue('John Doe')
    await user.clear(nameInput)
    
    // Try to submit
    await user.click(screen.getByRole('button', { name: /save changes/i }))
    
    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
    })
  })

  it('cancels edit mode and resets form', async () => {
    const user = userEvent.setup()
    render(<ProfileEditForm user={mockUser} />)
    
    // Enter edit mode
    await user.click(screen.getByRole('button', { name: /edit profile/i }))
    
    // Modify name
    const nameInput = screen.getByDisplayValue('John Doe')
    await user.clear(nameInput)
    await user.type(nameInput, 'Jane Doe')
    
    // Cancel
    await user.click(screen.getByRole('button', { name: /cancel/i }))
    
    // Should reset to original value
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { ...mockUser, name: 'Jane Doe' } }),
    } as Response)
    
    render(<ProfileEditForm user={mockUser} />)
    
    // Enter edit mode
    await user.click(screen.getByRole('button', { name: /edit profile/i }))
    
    // Modify name
    const nameInput = screen.getByDisplayValue('John Doe')
    await user.clear(nameInput)
    await user.type(nameInput, 'Jane Doe')
    
    // Submit
    await user.click(screen.getByRole('button', { name: /save changes/i }))
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('Jane Doe'),
      })
    })
  })

  it('handles API errors', async () => {
    const user = userEvent.setup()
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Update failed' }),
    } as Response)
    
    render(<ProfileEditForm user={mockUser} />)
    
    // Enter edit mode and submit
    await user.click(screen.getByRole('button', { name: /edit profile/i }))
    await user.click(screen.getByRole('button', { name: /save changes/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Update failed')).toBeInTheDocument()
    })
  })

  it('shows delete confirmation modal', async () => {
    const user = userEvent.setup()
    render(<ProfileEditForm user={mockUser} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete account/i })
    await user.click(deleteButton)
    
    expect(screen.getByText(/confirm account deletion/i)).toBeInTheDocument()
    expect(screen.getByText(/are you absolutely sure/i)).toBeInTheDocument()
  })
})

import { logout } from '@/app/actions/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Mock next/headers and next/navigation
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

const mockCookies = cookies as jest.MockedFunction<typeof cookies>
const mockRedirect = redirect as jest.MockedFunction<typeof redirect>

describe('Auth Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('logout', () => {
    it('deletes token cookie and redirects to login', async () => {
      const mockCookieStore = {
        delete: jest.fn(),
      }
      
      mockCookies.mockResolvedValue(mockCookieStore as any)
      mockRedirect.mockImplementation(() => {
        throw new Error('NEXT_REDIRECT')
      })

      await expect(logout()).rejects.toThrow('NEXT_REDIRECT')

      expect(mockCookieStore.delete).toHaveBeenCalledWith('token')
      expect(mockRedirect).toHaveBeenCalledWith('/login')
    })

    it('handles cookie store errors gracefully', async () => {
      const mockCookieStore = {
        delete: jest.fn().mockImplementation(() => {
          throw new Error('Cookie deletion failed')
        }),
      }
      
      mockCookies.mockResolvedValue(mockCookieStore as any)

      await expect(logout()).rejects.toThrow('Cookie deletion failed')
    })

    it('handles redirect errors', async () => {
      const mockCookieStore = {
        delete: jest.fn(),
      }
      
      mockCookies.mockResolvedValue(mockCookieStore as any)
      mockRedirect.mockImplementation(() => {
        throw new Error('Redirect failed')
      })

      await expect(logout()).rejects.toThrow('Redirect failed')
    })
  })
})

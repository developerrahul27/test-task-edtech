import { beforeAll, afterAll, beforeEach } from '@jest/globals'
import { connect, disconnect } from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'

// Test database setup
export const setupTestDatabase = () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(async () => {
    await disconnect()
  })

  beforeEach(async () => {
    // Clean up test data before each test
    await User.deleteMany({ email: /test.*@example\.com/ })
    await Project.deleteMany({ title: /Test Project/ })
  })
}

// Mock data generators
export const generateMockUser = (overrides = {}) => ({
  name: 'Test User',
  email: 'test@example.com',
  password: 'hashed-password',
  bio: 'Test bio',
  dob: new Date('1990-01-01'),
  gender: 'male',
  ...overrides,
})

export const generateMockProject = (overrides = {}) => ({
  title: 'Test Project',
  description: 'Test project description',
  status: 'draft',
  owner: 'user123',
  dueDate: new Date('2024-12-31'),
  ...overrides,
})

// Test utilities
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockFetch = (response: any, status = 200) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(response),
  })
}

export const mockFetchError = (error: string) => {
  global.fetch = jest.fn().mockRejectedValue(new Error(error))
}

// Environment setup
export const setupTestEnvironment = () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test'
  process.env.JWT_SECRET = 'test-jwt-secret'
  process.env.MONGODB_URI = 'mongodb://localhost:27017/test'
  process.env.OPENAI_API_KEY = 'test-openai-key'

  // Mock console methods to reduce noise in tests
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }
}

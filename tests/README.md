# 🧪 Testing Documentation

This document provides comprehensive information about the testing strategy and implementation for the Project Tracker application.

## 📋 Testing Overview

Our testing strategy includes multiple layers of testing to ensure code quality, functionality, and user experience:

- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test the interaction between different parts of the application
- **End-to-End Tests**: Test complete user workflows from start to finish
- **API Tests**: Test API endpoints and data flow
- **Accessibility Tests**: Ensure the application is accessible to all users
- **Performance Tests**: Verify application performance under various conditions

## 🏗️ Test Structure

```
tests/
├── __tests__/                    # Unit and integration tests
│   ├── components/              # Component unit tests
│   ├── lib/                     # Utility function tests
│   ├── api/                     # API route tests
│   ├── integration/             # Integration tests
│   └── setup/                   # Test setup and utilities
├── e2e/                         # End-to-end tests
│   ├── auth.spec.ts            # Authentication tests
│   ├── projects.spec.ts        # Project management tests
│   ├── ai-features.spec.ts     # AI functionality tests
│   ├── responsive.spec.ts      # Responsive design tests
│   └── complete-user-journey.spec.ts # Full workflow tests
├── utils/                       # Test utilities and helpers
└── coverage/                    # Coverage configuration
```

## 🚀 Running Tests

### Unit Tests (Jest + React Testing Library)

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Button"
```

### End-to-End Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test auth.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
```

### All Tests

```bash
# Run both unit and E2E tests
npm run test:all
```

## 📊 Test Coverage

Our test coverage targets:

- **Global Coverage**: 80% minimum
- **Components**: 85% minimum
- **Utilities**: 90% minimum
- **API Routes**: 85% minimum

### Coverage Reports

Coverage reports are generated in multiple formats:

- **HTML Report**: `coverage/index.html` - Interactive coverage report
- **LCOV Report**: `coverage/lcov.info` - For CI/CD integration
- **JSON Report**: `coverage/coverage-final.json` - Machine-readable format
- **Text Report**: Console output during test runs

## 🧩 Test Categories

### 1. Unit Tests

Test individual components and functions in isolation:

```typescript
// Example: Button component test
describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

**Coverage:**
- ✅ Button component
- ✅ ProfileEditForm component
- ✅ AISuggestions component
- ✅ Auth utilities
- ✅ Utility functions

### 2. Integration Tests

Test the interaction between different parts:

```typescript
// Example: Database integration test
describe('Database Integration', () => {
  it('should create and retrieve projects', async () => {
    const project = await Project.create(projectData)
    const retrieved = await Project.findById(project._id)
    expect(retrieved.title).toBe(projectData.title)
  })
})
```

**Coverage:**
- ✅ Database operations
- ✅ API route integration
- ✅ Authentication flow
- ✅ User-Project relationships

### 3. End-to-End Tests

Test complete user workflows:

```typescript
// Example: Complete user journey
test('complete user registration to project management workflow', async ({ page }) => {
  await helpers.registerUser(userData)
  await helpers.createProject(projectData)
  await helpers.editProject(projectData.title, updates)
  // ... more steps
})
```

**Coverage:**
- ✅ Authentication flow
- ✅ Project management
- ✅ AI features
- ✅ Responsive design
- ✅ Accessibility
- ✅ Complete user journeys

### 4. API Tests

Test API endpoints and data flow:

```typescript
// Example: API route test
describe('/api/projects', () => {
  it('creates a new project successfully', async () => {
    const response = await POST(mockRequest)
    expect(response.status).toBe(201)
  })
})
```

**Coverage:**
- ✅ Authentication endpoints
- ✅ Project CRUD operations
- ✅ AI suggestions endpoint
- ✅ Error handling
- ✅ Validation

## 🛠️ Test Utilities

### TestHelpers Class

The `TestHelpers` class provides reusable methods for common test operations:

```typescript
const helpers = new TestHelpers(page)

// User management
await helpers.registerUser(userData)
await helpers.loginUser(email, password)
await helpers.logout()

// Project management
await helpers.createProject(projectData)
await helpers.editProject(title, updates)
await helpers.deleteProject(title)

// AI features
await helpers.getAISuggestions(title)
await helpers.applyAISuggestion(type)

// Utility methods
await helpers.checkAccessibility()
await helpers.checkResponsiveDesign()
```

### Mock Data Generators

```typescript
// Generate test data
const mockUser = generateMockUser({ name: 'Custom Name' })
const mockProject = generateMockProject({ status: 'active' })
```

## 🔧 Test Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
  ],
}
```

### Playwright Configuration

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})
```

## 🎯 Testing Best Practices

### 1. Test Organization

- Group related tests in `describe` blocks
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Keep tests independent and isolated

### 2. Mocking Strategy

- Mock external dependencies (APIs, databases)
- Use realistic mock data
- Clean up mocks between tests
- Mock at the right level (not too high, not too low)

### 3. Assertions

- Use specific assertions
- Test both positive and negative cases
- Verify error handling
- Check accessibility attributes

### 4. Performance

- Use `waitFor` for async operations
- Avoid unnecessary waits
- Use `toBeVisible()` instead of `toBeInTheDocument()` when possible
- Run tests in parallel when possible

## 🐛 Debugging Tests

### Unit Tests

```bash
# Run specific test with verbose output
npm test -- --verbose Button.test.tsx

# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

### E2E Tests

```bash
# Run tests in debug mode
npm run test:e2e:debug

# Run specific test in headed mode
npx playwright test auth.spec.ts --headed

# Generate test report
npx playwright show-report
```

### Common Issues

1. **Timing Issues**: Use `waitFor` for async operations
2. **Element Not Found**: Check selectors and wait for elements to be visible
3. **Mock Issues**: Ensure mocks are properly set up and cleaned up
4. **Database Issues**: Clean up test data between tests

## 📈 Continuous Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run test:e2e
```

### Coverage Reporting

- Coverage reports are generated for each test run
- Coverage thresholds are enforced
- Coverage reports are uploaded to CI/CD systems
- Coverage badges are displayed in README

## 🎉 Test Results

### Success Criteria

- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ All E2E tests pass
- ✅ Coverage thresholds met
- ✅ No accessibility violations
- ✅ Performance benchmarks met

### Reporting

- **Unit Tests**: Jest HTML reporter
- **E2E Tests**: Playwright HTML reporter
- **Coverage**: Istanbul HTML reporter
- **Accessibility**: axe-core reports
- **Performance**: Lighthouse reports

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://www.w3.org/WAI/test-evaluate/)

---

**Happy Testing! 🚀**

For questions or issues with testing, please refer to the test files or create an issue in the repository.
# 🚀 Project Tracker - AI-Powered Project Management

A modern, full-stack project management application built with Next.js 15, featuring AI-powered suggestions, secure authentication, and a beautiful user interface.

![Project Tracker](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?style=for-the-badge&logo=mongodb)
![AI](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge&logo=openai)

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based authentication** with HttpOnly cookies
- **Secure password hashing** using bcryptjs
- **User profile management** with edit and delete functionality
- **Account deletion** with confirmation modal
- **Form validation** with Zod schemas
- **Protected routes** and API endpoints

### 📊 Project Management
- **Full CRUD operations** for projects
- **Status management** (Draft, Active, Completed)
- **Due date tracking** with date picker
- **Project details** with comprehensive information
- **Real-time updates** and state management
- **Search and filtering** capabilities

### 🤖 AI-Powered Features
- **Smart project suggestions** using OpenAI GPT-3.5-turbo
- **Enhanced descriptions** based on project titles
- **Intelligent status recommendations**
- **Due date suggestions** with reasoning
- **Actionable next steps** for project completion

### 🎨 User Experience
- **Responsive design** for all devices
- **Dark mode support** with theme switching
- **Loading states** and error handling
- **Accessibility features** (ARIA labels, keyboard navigation)
- **Modern UI components** with Radix UI and Tailwind CSS

### 🛠️ Technical Features
- **Server-side rendering** (SSR) with Next.js 15
- **Type-safe development** with TypeScript
- **Database integration** with MongoDB and Mongoose
- **API routes** with proper error handling
- **Code optimization** and performance enhancements

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- OpenAI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/project-tracker
   JWT_SECRET=your-super-secret-jwt-key-here
   OPENAI_API_KEY=your-openai-api-key-here
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
project-tracker/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── projects/      # Project CRUD operations
│   │   └── ai/            # AI-powered features
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Project pages
│   │   └── [id]/         # Dynamic project detail pages
│   ├── profile/           # User profile page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── AISuggestions.tsx # AI suggestions component
│   ├── ProjectForm.tsx   # Project form component
│   ├── ProjectDetailsClient.tsx
│   ├── ProjectsClient.tsx
│   └── DashboardClient.tsx
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication utilities
│   ├── mongodb.ts       # Database connection
│   └── utils.ts         # General utilities
├── models/              # MongoDB models
│   ├── User.ts          # User model
│   └── Project.ts       # Project model
├── context/             # React context
│   └── auth-context.tsx # Authentication context
├── types/               # TypeScript type definitions
├── tests/               # Playwright E2E tests
│   └── basic.spec.ts    # Basic functionality tests
└── __tests__/           # Jest unit tests
    ├── components/      # Component tests
    └── setup/          # Test setup and mocks
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Profile
- `GET /api/profile` - Get user profile
- `PATCH /api/profile` - Update user profile
- `DELETE /api/profile` - Delete user account

### Projects
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### AI Features
- `POST /api/ai/suggestions` - Get AI project suggestions

## 🎯 Usage

### Creating a Project
1. Navigate to the Dashboard
2. Fill in the project form with title and description
3. Use AI suggestions to enhance your project details
4. Set status and due date
5. Click "Add Project"

### AI Suggestions
1. Enter a project title
2. Click "Get AI Suggestions"
3. Review the AI-generated recommendations
4. Apply suggestions to enhance your project

### Managing Projects
- **View all projects** on the Projects page
- **Edit projects** by clicking on individual project cards
- **Change status** using the status buttons
- **Delete projects** when no longer needed

## 🧪 Testing

### End-to-End Testing with Playwright

The project includes essential end-to-end tests using Playwright to ensure core functionality works correctly.

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI for debugging
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Run E2E tests in debug mode
npm run test:e2e:debug
```

### Unit Testing with Jest

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

- **Basic App Functionality**: Homepage, login, and register page loading
- **Authentication Tests**: Login, register, logout, validation
- **Project Management Tests**: CRUD operations, search, filtering
- **Component Tests**: Individual component functionality

## 🛡️ Security Features

- **JWT tokens** stored in HttpOnly cookies
- **Password hashing** with bcryptjs
- **Input validation** using Zod schemas
- **CSRF protection** through Next.js
- **Environment variables** for sensitive data
- **Protected API routes** with authentication middleware

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on every push

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
OPENAI_API_KEY=your-openai-api-key
NODE_ENV=production
```

### Other Platforms

The application can be deployed on any platform that supports Node.js:
- **Netlify** (with serverless functions)
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run Jest unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
npm run test:e2e:headed # Run E2E tests in headed mode
npm run test:e2e:debug  # Run E2E tests in debug mode

# Code Quality
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Full-Stack Developer**
- GitHub: [@your-github](https://github.com/developerrahul27)
- LinkedIn: [@your-linkedin](https://www.linkedin.com/in/rahul-rawattw-788b14368))
- Email: rahulrawattw@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [OpenAI](https://openai.com/) for AI capabilities
- [MongoDB](https://mongodb.com/) for the database
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://radix-ui.com/) for accessible components
- [Playwright](https://playwright.dev/) for E2E testing
- [Jest](https://jestjs.io/) for unit testing

---

**Built with ❤️ using Next.js 15, MongoDB, and AI**

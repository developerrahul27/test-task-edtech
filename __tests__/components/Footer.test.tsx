import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/Footer'

describe('Footer Component', () => {
  it('renders footer with all sections', () => {
    render(<Footer />)

    // Check main sections
    expect(screen.getByText('Project Tracker')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('displays project description', () => {
    render(<Footer />)

    expect(screen.getByText(/A modern, AI-powered project management application/)).toBeInTheDocument()
    expect(screen.getByText(/built with Next.js 15, MongoDB, and cutting-edge web technologies/)).toBeInTheDocument()
  })

  it('lists all features', () => {
    render(<Footer />)

    expect(screen.getByText('• AI-powered project suggestions')).toBeInTheDocument()
    expect(screen.getByText('• Secure JWT authentication')).toBeInTheDocument()
    expect(screen.getByText('• Real-time project management')).toBeInTheDocument()
    expect(screen.getByText('• Responsive design')).toBeInTheDocument()
    expect(screen.getByText('• Dark mode support')).toBeInTheDocument()
  })

  it('displays developer information', () => {
    render(<Footer />)

    expect(screen.getByText(/Full-stack developer passionate about creating innovative web applications/)).toBeInTheDocument()
    expect(screen.getByText(/with modern technologies and AI integration/)).toBeInTheDocument()
  })

  it('renders social media links with correct attributes', () => {
    render(<Footer />)

    const githubLink = screen.getAllByRole('link')[0]
    const linkedinLink = screen.getAllByRole('link')[1]
    const emailLink = screen.getAllByRole('link')[2]

    expect(githubLink).toHaveAttribute('href', 'https://github.com/your-github')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/your-linkedin')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')

    expect(emailLink).toHaveAttribute('href', 'mailto:your-email@example.com')
  })

  it('displays current year in copyright', () => {
    render(<Footer />)

    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Project Tracker. All rights reserved.`)).toBeInTheDocument()
  })

  it('shows technology stack information', () => {
    render(<Footer />)

    expect(screen.getByText('Built with ❤️ using Next.js 15, MongoDB, and AI')).toBeInTheDocument()
  })

  it('has proper responsive grid layout classes', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('w-full', 'border-t', 'py-8', 'mt-12')
  })

  it('renders all icons correctly', () => {
    render(<Footer />)

    // Check that icons are present (they should be rendered as SVG elements)
    const githubIcon = screen.getAllByRole('link')[0]?.querySelector('.lucide-github')
    const linkedinIcon = screen.getAllByRole('link')[1]?.querySelector('.lucide-linkedin')
    const mailIcon = screen.getAllByRole('link')[2]?.querySelector('.lucide-mail')
    
    expect(githubIcon).toBeInTheDocument()
    expect(linkedinIcon).toBeInTheDocument()
    expect(mailIcon).toBeInTheDocument()
  })

  it('has proper dark mode classes', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('dark:border-gray-700/50')
  })

  it('displays proper text hierarchy', () => {
    render(<Footer />)

    // Check that headings are properly structured
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(3)
    expect(headings[0]).toHaveTextContent('Project Tracker')
    expect(headings[1]).toHaveTextContent('Features')
    expect(headings[2]).toHaveTextContent('Developer')
  })
})

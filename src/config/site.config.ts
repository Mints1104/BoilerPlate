// Site Configuration - Customize this file to rebrand the entire application

interface NavItem {
  label: string
  path: string
  ariaLabel: string
  external?: boolean
}

interface FooterLink {
  label: string
  path: string
}

interface SiteConfig {
  name: string
  shortName: string
  description: string
  author: string
  email: string
  url: string
  logo: {
    text: string
    emoji?: string
  }
  nav: NavItem[]
  seo: {
    keywords: string
    ogImage: string
    twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player'
    twitterHandle?: string
  }
  footer: {
    copyright: string
    links: FooterLink[]
  }
  features: string[]
}

export const siteConfig: SiteConfig = {
  // Site Identity
  name: 'Vite + React + TS',
  shortName: 'VRT',
  description:
    'A production-ready boilerplate for building modern web applications with Vite, React, and TypeScript',
  author: 'Your Name',
  email: 'your.email@example.com',
  url: 'https://yourdomain.com',

  // Branding
  logo: {
    text: 'Vite + React + TS',
    emoji: '🚀', // Optional emoji
  },

  // Navigation
  nav: [
    { label: 'Home', path: '/', ariaLabel: 'Navigate to Home page' },
    { label: 'About', path: '/about', ariaLabel: 'Navigate to About page' },
    {
      label: 'Contact',
      path: '/contact',
      ariaLabel: 'Navigate to Contact page',
    },
    {
      label: 'Demo',
      path: '/demo',
      ariaLabel: 'Navigate to Feature Demo page',
    },
  ],

  // SEO & Social
  seo: {
    keywords: 'vite, react, typescript, boilerplate, spa, frontend',
    ogImage: '/og-image.png',
    twitterCard: 'summary_large_image' as const,
    twitterHandle: '@yourusername', // Optional
  },

  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} {{siteName}} Boilerplate`,
    links: [
      // Add footer links here if needed
      // { label: 'Privacy', path: '/privacy' },
      // { label: 'Terms', path: '/terms' },
    ],
  },

  // Features to showcase (edit or remove as needed)
  features: [
    '✅ Vite for lightning-fast development',
    '✅ React 18 with TypeScript',
    '✅ React Router for navigation',
    '✅ Path aliases configured (@components, @hooks, etc.)',
    '✅ ESLint & Prettier for code quality',
    '✅ CSS Modules for scoped styling',
    '✅ Custom hooks and utilities',
    '✅ Reusable UI components',
  ],
}

// Helper function to replace placeholders
export const getSiteValue = (value: string): string => {
  return value.replace('{{siteName}}', siteConfig.name)
}

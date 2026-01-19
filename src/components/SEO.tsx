import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  author?: string
  ogType?: string
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  canonicalUrl?: string
}

const SEO = ({
  title = 'Vite + React + TypeScript',
  description = 'A production-ready boilerplate for building modern web applications with Vite, React, and TypeScript',
  keywords = 'vite, react, typescript, boilerplate, spa, frontend',
  author = 'Your Name',
  ogType = 'website',
  ogImage = '/og-image.png',
  twitterCard = 'summary_large_image',
  canonicalUrl,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title

    // Helper to set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)

      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }

      element.setAttribute('content', content)
    }

    // Standard meta tags
    setMetaTag('description', description)
    setMetaTag('keywords', keywords)
    setMetaTag('author', author)

    // Open Graph tags
    setMetaTag('og:title', title, true)
    setMetaTag('og:description', description, true)
    setMetaTag('og:type', ogType, true)
    setMetaTag('og:image', ogImage, true)
    if (canonicalUrl) {
      setMetaTag('og:url', canonicalUrl, true)
    }

    // Twitter Card tags
    setMetaTag('twitter:card', twitterCard)
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', ogImage)

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonicalUrl)
    }
  }, [
    title,
    description,
    keywords,
    author,
    ogType,
    ogImage,
    twitterCard,
    canonicalUrl,
  ])

  return null
}

export default SEO

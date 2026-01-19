// Security utilities and helpers

/**
 * Sanitizes user input to prevent XSS attacks
 * Removes potentially dangerous characters and HTML tags
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return ''

  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '')

  // Encode special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')

  return sanitized.trim()
}

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates phone number format (basic)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

/**
 * Rate limiting helper for client-side form submissions
 * Prevents spam by limiting submissions per time window
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map()

  canSubmit(
    key: string,
    maxAttempts: number = 3,
    windowMs: number = 60000
  ): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []

    // Filter out old attempts outside the time window
    const recentAttempts = attempts.filter(
      (timestamp) => now - timestamp < windowMs
    )

    if (recentAttempts.length >= maxAttempts) {
      return false
    }

    // Add current attempt
    recentAttempts.push(now)
    this.attempts.set(key, recentAttempts)

    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

export const formRateLimiter = new RateLimiter()

/**
 * Generates a simple CSRF-like token for form submissions
 * Note: For production, use proper backend CSRF protection
 */
export const generateFormToken = (): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2)
  return `${timestamp}-${random}`
}

/**
 * Validates form token (basic check)
 * In production, validate on backend
 */
export const isValidFormToken = (
  token: string,
  maxAgeMs: number = 3600000
): boolean => {
  if (!token) return false

  const [timestampStr] = token.split('-')
  const timestamp = parseInt(timestampStr, 10)

  if (isNaN(timestamp)) return false

  const age = Date.now() - timestamp
  return age >= 0 && age <= maxAgeMs
}

/**
 * Checks if content contains potential security threats
 */
export const containsSuspiciousContent = (content: string): boolean => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /data:text\/html/i,
    /<iframe/i,
    /<embed/i,
    /<object/i,
  ]

  return suspiciousPatterns.some((pattern) => pattern.test(content))
}

/**
 * Validates URL to prevent open redirects
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Content Security Policy helper
 * Returns CSP meta tag content
 */
export const getCSPContent = (): string => {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'", // Vite requires unsafe-inline for dev
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')
}

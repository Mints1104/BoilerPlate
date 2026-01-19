# Security Best Practices

This document outlines the security measures implemented in this boilerplate and provides guidelines for maintaining security in your application.

## Table of Contents

- [Built-in Security Features](#built-in-security-features)
- [Contact Form Security](#contact-form-security)
- [Environment Variables](#environment-variables)
- [Content Security Policy](#content-security-policy)
- [Input Validation & Sanitization](#input-validation--sanitization)
- [Rate Limiting](#rate-limiting)
- [CSRF Protection](#csrf-protection)
- [Common Vulnerabilities](#common-vulnerabilities)
- [Security Checklist](#security-checklist)

## Built-in Security Features

### 1. XSS Prevention

The boilerplate includes comprehensive XSS (Cross-Site Scripting) prevention:

```typescript
import { sanitizeInput, containsSuspiciousContent } from '@utils/security'

// Sanitize user input
const cleanInput = sanitizeInput(userInput)

// Check for malicious patterns
if (containsSuspiciousContent(userInput)) {
  // Handle suspicious content
}
```

**What it does:**

- Removes HTML tags and dangerous characters
- Encodes special characters (`<`, `>`, `&`, `"`, `'`)
- Detects script injections, SQL injection attempts, and file path traversal

### 2. Error Boundary

React Error Boundary prevents application crashes and information leakage:

```typescript
// src/components/ErrorBoundary.tsx
- Shows generic error message in production
- Provides detailed stack traces only in development
- Prevents sensitive error details from reaching end users
```

### 3. Secure Headers

The application implements security headers via Content Security Policy (CSP).

## Contact Form Security

The contact form implementation includes multiple security layers:

### Rate Limiting

Prevents spam and abuse by limiting submission frequency:

```typescript
import { RateLimiter } from '@utils/security'

const limiter = new RateLimiter(3, 60000) // 3 attempts per minute

if (!limiter.checkLimit('contact-form')) {
  // Too many attempts
}
```

**Configuration:**

- Default: 3 submissions per 60 seconds
- Configurable per identifier (IP, session, etc.)
- Automatic cleanup of old entries

### Input Validation

All form inputs are validated before submission:

```typescript
import { validateForm, commonRules } from '@utils/validation'

const errors = validateForm(formData, {
  email: [commonRules.required, commonRules.email],
  name: [commonRules.required, commonRules.name],
  phone: [commonRules.phone], // Optional but validated if provided
  message: [commonRules.required, commonRules.message],
})
```

**Validation Rules:**

- **Email**: RFC-compliant email format
- **Name**: 2-50 characters, letters, spaces, hyphens, apostrophes
- **Phone**: International format support (E.164)
- **Message**: 10-1000 characters, prevents excessive submissions

### Form Token Protection

Generates unique tokens to prevent automated submissions:

```typescript
import { generateFormToken } from '@utils/security'

const formToken = generateFormToken()
// Include in form submission for verification
```

## Environment Variables

### Security Guidelines

1. **Never commit `.env` files**

   ```bash
   # .gitignore already includes:
   .env
   .env.local
   .env.*.local
   ```

2. **Use `.env.example` as a template**

   ```bash
   cp .env.example .env
   # Then fill in your actual values
   ```

3. **Prefix all variables with `VITE_`**

   ```env
   # ✅ Correct - Exposed to client
   VITE_API_URL=https://api.example.com
   VITE_FORMSPREE_ID=abc123

   # ❌ Wrong - Not accessible in Vite
   API_SECRET_KEY=secret123
   ```

4. **Never expose sensitive keys**
   - API secrets
   - Database credentials
   - Private keys
   - Authentication tokens

### Contact Form Provider Secrets

Each provider requires specific environment variables:

```env
# Formspree
VITE_FORMSPREE_ID=your_form_id

# Getform
VITE_GETFORM_ENDPOINT=https://getform.io/f/your_id

# Web3Forms
VITE_WEB3FORMS_ACCESS_KEY=your_access_key

# Custom API
VITE_CUSTOM_API_ENDPOINT=https://your-api.com/contact

# reCAPTCHA (optional but recommended)
VITE_RECAPTCHA_SITE_KEY=your_site_key
```

**Security Notes:**

- These are **client-side** keys (safe to expose in browser)
- For server-side secrets, use backend environment variables
- Rotate keys regularly
- Use different keys for development/staging/production

## Content Security Policy

CSP helps prevent XSS, data injection, and other attacks:

```typescript
import { getCSPContent } from '@utils/security'

const cspHeader = getCSPContent({
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'"],
  'connect-src': ["'self'", 'https://formspree.io'],
})
```

### Implementation Options

**Option 1: Meta Tag (Current)**

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="..." />
```

**Option 2: Server Headers (Recommended for production)**

```javascript
// Netlify: netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; ..."

// Vercel: vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; ..."
        }
      ]
    }
  ]
}
```

### CSP Directives Explained

- **default-src**: Fallback for all other directives
- **script-src**: Controls JavaScript sources
- **style-src**: Controls CSS sources
- **img-src**: Controls image sources
- **connect-src**: Controls AJAX, WebSocket, EventSource
- **font-src**: Controls font sources
- **frame-src**: Controls iframe sources

## Input Validation & Sanitization

### Best Practices

1. **Validate on both client and server**

   ```typescript
   // Client-side validation (UX)
   const clientErrors = validateForm(data, rules)

   // Server-side validation (security)
   // Always validate again on your backend!
   ```

2. **Sanitize before storage**

   ```typescript
   const sanitizedData = {
     name: sanitizeInput(formData.name),
     email: sanitizeInput(formData.email),
     message: sanitizeInput(formData.message),
   }
   ```

3. **Use allow-lists, not deny-lists**

   ```typescript
   // ✅ Good: Define what's allowed
   const allowedChars = /^[a-zA-Z0-9\s\-']+$/

   // ❌ Bad: Try to block everything dangerous
   const blockedChars = /<script>|javascript:|onerror=/
   ```

4. **Context-aware encoding**
   - HTML context: Encode `<`, `>`, `&`, `"`, `'`
   - URL context: Use `encodeURIComponent()`
   - JavaScript context: Use JSON.stringify()

## Rate Limiting

### Implementation Strategies

**Client-Side (Included)**

```typescript
// Prevents accidental spam, not malicious abuse
const limiter = new RateLimiter(maxAttempts, windowMs)
```

**Server-Side (Recommended for production)**

```javascript
// Express.js example
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many requests, please try again later.',
})

app.post('/api/contact', limiter, handleContact)
```

**Cloudflare/CDN Level (Best)**

- Configure rate limiting rules in CDN
- Blocks traffic before reaching your server
- Protects against DDoS attacks

## CSRF Protection

### Form Token Strategy

The boilerplate includes basic CSRF-like protection:

```typescript
// Generate unique token
const token = generateFormToken()

// Include in form submission
const formData = {
  ...userInput,
  _token: token,
}
```

**For Production:**

1. Use server-side CSRF tokens
2. Implement SameSite cookie attribute
3. Verify referer/origin headers
4. Use frameworks' built-in CSRF protection

### CORS Configuration

```typescript
// Backend example (Express.js)
const cors = require('cors')

app.use(
  cors({
    origin: 'https://yourdomain.com', // Specific origin, not '*'
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
```

## Common Vulnerabilities

### 1. XSS (Cross-Site Scripting)

**Attack:**

```javascript
// User inputs: <script>alert('XSS')</script>
// If not sanitized, executes in browser
```

**Defense:**

```typescript
const clean = sanitizeInput(userInput) // Removes script tags
```

### 2. SQL Injection

**Attack:**

```sql
-- User inputs: admin' OR '1'='1
-- SQL becomes: SELECT * FROM users WHERE username='admin' OR '1'='1'
```

**Defense:**

```typescript
// Use parameterized queries (backend)
// Never concatenate user input into SQL
// The frontend validation helps but backend MUST validate
```

### 3. Path Traversal

**Attack:**

```
// User inputs: ../../../../etc/passwd
// Attempts to access system files
```

**Defense:**

```typescript
containsSuspiciousContent(input) // Detects ../
```

### 4. Open Redirect

**Attack:**

```javascript
// Malicious link: https://yoursite.com?redirect=https://evil.com
window.location = params.get('redirect') // Redirects to evil.com
```

**Defense:**

```typescript
// Validate redirect URLs
const allowedDomains = ['yourdomain.com', 'subdomain.yourdomain.com']
const url = new URL(redirectUrl)
if (!allowedDomains.includes(url.hostname)) {
  // Block redirect
}
```

## Security Checklist

### Before Deployment

- [ ] **Environment Variables**
  - [ ] All secrets in `.env` files
  - [ ] `.env` added to `.gitignore`
  - [ ] Production keys different from development
  - [ ] No hardcoded API keys in code

- [ ] **Headers & CSP**
  - [ ] CSP configured and tested
  - [ ] HTTPS enforced (HSTS header)
  - [ ] X-Frame-Options set to DENY or SAMEORIGIN
  - [ ] X-Content-Type-Options set to nosniff

- [ ] **Input Validation**
  - [ ] All user inputs validated
  - [ ] Validation on both client and server
  - [ ] File uploads restricted (type, size, content)
  - [ ] No eval() or dangerouslySetInnerHTML usage

- [ ] **Authentication & Authorization** (if applicable)
  - [ ] Passwords hashed (bcrypt, argon2)
  - [ ] Session tokens secure and httpOnly
  - [ ] JWT secrets properly stored
  - [ ] Account lockout after failed attempts

- [ ] **Dependencies**
  - [ ] Run `npm audit` and fix vulnerabilities
  - [ ] Keep dependencies updated
  - [ ] Remove unused packages
  - [ ] Review package permissions

- [ ] **Error Handling**
  - [ ] No stack traces in production
  - [ ] Generic error messages to users
  - [ ] Errors logged securely server-side
  - [ ] Error boundary implemented

- [ ] **Rate Limiting**
  - [ ] API endpoints rate-limited
  - [ ] Contact forms rate-limited
  - [ ] Login attempts rate-limited
  - [ ] DDoS protection via CDN

### Regular Maintenance

- [ ] Review security logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate API keys quarterly
- [ ] Security audit annually
- [ ] Monitor for breaches (Have I Been Pwned API)

## Resources

### Learning

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)

### Tools

- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Check for vulnerabilities
- [Snyk](https://snyk.io/) - Automated security scanning
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing tool
- [Mozilla Observatory](https://observatory.mozilla.org/) - Security analysis

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. Email security@yourdomain.com with details
3. Allow 48 hours for initial response
4. Do not disclose until patch is available

## License

This security documentation is part of the boilerplate project and follows the same license terms.

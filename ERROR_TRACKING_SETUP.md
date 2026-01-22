# Error Tracking Setup (Optional)

Error tracking is **optional** and disabled by default. It only runs in production when you configure it.

## Why Error Tracking?

- 📊 Monitor real-world errors users encounter
- 🔍 Get detailed stack traces and user context
- 🎯 Prioritize bug fixes based on impact
- 📈 Track error trends over time
- 🎬 Session replay to see what led to errors

## Option 1: Sentry (Recommended)

### Setup

1. **Install dependencies:**

```bash
npm install @sentry/react
```

2. **Create free Sentry account:**
   - Go to [sentry.io](https://sentry.io)
   - Create a project (choose React)
   - Copy your DSN

3. **Add to `.env`:**

```bash
VITE_SENTRY_DSN=your-sentry-dsn-here
```

4. **Initialize in your app:**

Update `src/main.tsx`:

```tsx
import { initErrorTracking } from '@services/errorTracking.service'

// Initialize error tracking (only in production)
initErrorTracking()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
```

5. **Update ErrorBoundary to log errors:**

In `src/components/ErrorBoundary.tsx`, add:

```tsx
import { logError } from '@services/errorTracking.service'

componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  logError(error, { errorInfo })
  console.error('Error caught by boundary:', error, errorInfo)
}
```

### Usage Examples

```tsx
import {
  logError,
  logMessage,
  addBreadcrumb,
  setUser,
} from '@services/errorTracking.service'

// Log errors
try {
  await fetchData()
} catch (error) {
  logError(error as Error, {
    userId: user.id,
    action: 'fetchData',
  })
}

// Log messages
logMessage('User completed checkout', 'info', {
  orderId: '123',
})

// Track user
setUser({
  id: user.id,
  email: user.email,
  username: user.name,
})

// Add breadcrumbs for debugging
addBreadcrumb('User clicked submit button')
```

### Features Included

✅ Automatic error capturing  
✅ Performance monitoring  
✅ Session replay (10% of sessions)  
✅ Breadcrumb tracking  
✅ User context  
✅ Only runs in production  
✅ Free tier: 5,000 errors/month

---

## Option 2: LogRocket

### Setup

1. **Install:**

```bash
npm install logrocket logrocket-react
```

2. **Create account:**
   - Go to [logrocket.com](https://logrocket.com)
   - Get your app ID

3. **Add to `.env`:**

```bash
VITE_LOGROCKET_ID=your-app-id
```

4. **Initialize:**

```tsx
import LogRocket from 'logrocket'

if (import.meta.env.PROD && import.meta.env.VITE_LOGROCKET_ID) {
  LogRocket.init(import.meta.env.VITE_LOGROCKET_ID)
}
```

### Features

- Session replay with DOM recording
- Network request logging
- Console log capture
- Redux state tracking
- Free tier: 1,000 sessions/month

---

## Option 3: Custom Backend Logging

Create your own endpoint:

```tsx
export const logError = async (
  error: Error,
  context?: Record<string, unknown>
) => {
  if (import.meta.env.PROD) {
    await fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    })
  }
}
```

---

## Comparison

| Feature                | Sentry       | LogRocket   | Custom   |
| ---------------------- | ------------ | ----------- | -------- |
| Error tracking         | ✅ Excellent | ✅ Good     | ⚠️ Basic |
| Session replay         | ✅ Yes       | ✅ Best     | ❌ No    |
| Performance monitoring | ✅ Yes       | ✅ Yes      | ❌ No    |
| Free tier              | 5K errors    | 1K sessions | ∞ Free   |
| Setup difficulty       | Easy         | Easy        | Hard     |
| Privacy                | Good         | Medium      | Best     |

## Recommendation

**For this boilerplate:** Start with **Sentry** - it's free, easy to set up, and provides excellent error tracking without much configuration.

**Already implemented:**

- ✅ Error tracking service ready ([errorTracking.service.ts](src/services/errorTracking.service.ts))
- ✅ Only runs in production
- ✅ Environment variable configured
- ⏳ Just needs `npm install @sentry/react` and DSN in `.env`

**Skip if:**

- You don't need production monitoring yet
- Your app is purely internal/development
- You have strict privacy requirements (use custom solution)

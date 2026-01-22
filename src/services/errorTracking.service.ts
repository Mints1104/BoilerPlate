/* eslint-disable @typescript-eslint/no-explicit-any */
// Error tracking is optional - install @sentry/react to enable
// import * as Sentry from '@sentry/react'

/**
 * Initialize error tracking with Sentry
 * Only initializes in production environment
 *
 * To enable: npm install @sentry/react and uncomment the import above
 */
export const initErrorTracking = () => {
  // Only enable in production
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    // Uncomment when @sentry/react is installed:
    /*
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, // Capture 100% of transactions in prod, adjust as needed
      // Session Replay
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
      // Filter out non-error logs
      beforeSend(event: any) {
        // Don't send events in development
        if (import.meta.env.DEV) {
          return null
        }
        return event
      },
    })
    */
    console.log('Error tracking configured but @sentry/react not installed')
  }
}

/**
 * Log an error to the error tracking service
 */
export const logError = (error: Error, context?: Record<string, any>) => {
  if (import.meta.env.PROD) {
    // Uncomment when @sentry/react is installed:
    // Sentry.captureException(error, { extra: context })
    console.error('Error (tracking not enabled):', error, context)
  } else {
    // In development, just log to console
    console.error('Error:', error, context)
  }
}

/**
 * Log a message to the error tracking service
 */
export const logMessage = (
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context?: Record<string, any>
) => {
  if (import.meta.env.PROD) {
    // Uncomment when @sentry/react is installed:
    // Sentry.captureMessage(message, { level, extra: context })
    console.log(
      `[${level.toUpperCase()}] (tracking not enabled)`,
      message,
      context
    )
  } else {
    console.log(`[${level.toUpperCase()}]`, message, context)
  }
}

/**
 * Set user context for error tracking
 */
export const setUser = (user: {
  id?: string
  email?: string
  username?: string
}) => {
  if (import.meta.env.PROD) {
    // Uncomment when @sentry/react is installed:
    // Sentry.setUser(user)
    console.log('User context set (tracking not enabled):', user)
  }
}

/**
 * Clear user context
 */
export const clearUser = () => {
  if (import.meta.env.PROD) {
    // Uncomment when @sentry/react is installed:
    // Sentry.setUser(null)
  }
}

/**
 * Add breadcrumb for debugging
 */
export const addBreadcrumb = (
  _message: string,
  _data?: Record<string, any>
) => {
  if (import.meta.env.PROD) {
    // Uncomment when @sentry/react is installed:
    // Sentry.addBreadcrumb({ message: _message, data: _data, level: 'info' })
  }
}

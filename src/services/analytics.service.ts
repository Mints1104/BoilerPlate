type AnalyticsEvent = {
  name: string
  properties?: Record<string, unknown>
}

let enabled = false

export const initAnalytics = () => {
  enabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true'

  if (import.meta.env.DEV) {
    console.log(`Analytics ${enabled ? 'enabled' : 'disabled'}`)
  }
}

export const trackEvent = ({ name, properties }: AnalyticsEvent) => {
  if (!enabled) return

  if (import.meta.env.DEV) {
    console.log('[analytics:event]', name, properties)
  }
}

export const trackPageView = (path: string) => {
  if (!enabled) return

  if (import.meta.env.DEV) {
    console.log('[analytics:pageview]', path)
  }
}

export const identifyUser = (
  userId: string,
  traits?: Record<string, unknown>
) => {
  if (!enabled) return

  if (import.meta.env.DEV) {
    console.log('[analytics:identify]', userId, traits)
  }
}

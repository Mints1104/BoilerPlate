// Theme Configuration - Customize colors, fonts, and design tokens
export const themeConfig = {
  // Color Palette - Change these to match your brand
  colors: {
    // Primary brand color (buttons, links, accents)
    primary: '#646cff',
    primaryHover: '#535bf2',

    // Background colors
    backgroundLight: '#ffffff',
    backgroundDark: '#242424',

    // Text colors
    textLight: '#213547',
    textDark: 'rgba(255, 255, 255, 0.87)',

    // Borders and dividers
    borderLight: '#ddd',
    borderDark: '#444',

    // Additional colors (customize as needed)
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#dc3545',
    info: '#3b82f6',
  },

  // Typography
  fonts: {
    // Main font stack
    primary: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    // Add more font families if needed
    // heading: 'YourHeadingFont, serif',
    // mono: 'Consolas, Monaco, monospace',
  },

  // Spacing Scale (in rem)
  spacing: {
    xs: 0.5,
    sm: 1,
    md: 1.5,
    lg: 2,
    xl: 3,
  },

  // Breakpoints (in px)
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
  },

  // Border Radius
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 24px rgba(0, 0, 0, 0.15)',
  },

  // Transitions
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
}

// Export CSS variables string for use in index.css or styled-components
export const getCSSVariables = () => `
  --primary-color: ${themeConfig.colors.primary};
  --primary-hover: ${themeConfig.colors.primaryHover};
  --background-color: ${themeConfig.colors.backgroundDark};
  --text-color: ${themeConfig.colors.textDark};
  --border-color: ${themeConfig.colors.borderDark};
  --font-family: ${themeConfig.fonts.primary};
  /* Add more CSS variables as needed */
`

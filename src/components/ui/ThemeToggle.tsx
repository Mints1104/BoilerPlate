import { useTheme } from '@/contexts/ThemeContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-theme={theme}
    >
      <span className={styles.slider}>
        <span className={styles.icon}>{theme === 'light' ? '☀️' : '🌙'}</span>
      </span>
    </button>
  )
}

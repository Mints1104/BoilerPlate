import { Link } from 'react-router-dom'
import { siteConfig } from '@config/site.config'
import ThemeToggle from './ui/ThemeToggle'
import styles from './Header.module.css'

const Header = () => {
  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <header className={styles.header} role="banner">
        <div className={styles.container}>
          <Link
            to="/"
            className={styles.logo}
            aria-label={`Home - ${siteConfig.name}`}
          >
            <h1>
              {siteConfig.logo.emoji && (
                <span role="img" aria-hidden="true">
                  {siteConfig.logo.emoji}{' '}
                </span>
              )}
              {siteConfig.logo.text}
            </h1>
          </Link>
          <div className={styles.rightSection}>
            <nav
              className={styles.nav}
              role="navigation"
              aria-label="Main navigation"
            >
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={styles.navLink}
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

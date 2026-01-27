import { useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@config/site.config'
import ThemeToggle from './ui/ThemeToggle'
import styles from './Header.module.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const logoImage = siteConfig.logo.image

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
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.logoTitle}>
              {logoImage ? (
                <img
                  className={styles.logoImage}
                  src={logoImage.src}
                  alt={logoImage.alt}
                  loading="eager"
                  decoding="async"
                />
              ) : siteConfig.logo.emoji ? (
                <span className={styles.logoEmoji} role="img" aria-hidden>
                  {siteConfig.logo.emoji}{' '}
                </span>
              ) : null}
              {siteConfig.logo.text}
            </span>
          </Link>
          <div className={styles.rightSection}>
            <button
              type="button"
              className={styles.menuButton}
              aria-label={
                isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className={styles.menuIcon} aria-hidden>
                {isMenuOpen ? '✕' : '☰'}
              </span>
            </button>
            <nav
              id="main-navigation"
              className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
              role="navigation"
              aria-label="Main navigation"
            >
              {siteConfig.nav.map((item) =>
                item.external ? (
                  <a
                    key={item.path}
                    href={item.path}
                    className={styles.navLink}
                    aria-label={item.ariaLabel}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={styles.navLink}
                    aria-label={item.ariaLabel}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

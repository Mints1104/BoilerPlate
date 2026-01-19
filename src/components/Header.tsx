import { Link } from 'react-router-dom'
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
            aria-label="Home - Vite React TypeScript"
          >
            <h1>Vite + React + TS</h1>
          </Link>
          <nav
            className={styles.nav}
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className={styles.navLink}
              aria-label="Navigate to Home page"
            >
              Home
            </Link>
            <Link
              to="/about"
              className={styles.navLink}
              aria-label="Navigate to About page"
            >
              About
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header

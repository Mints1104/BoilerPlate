import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Vite + React + TS Boilerplate</p>
        <p>Built with ❤️ using Vite, React, and TypeScript</p>
      </div>
    </footer>
  )
}

export default Footer

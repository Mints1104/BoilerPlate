import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.css'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main id="main-content" className={styles.main} role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

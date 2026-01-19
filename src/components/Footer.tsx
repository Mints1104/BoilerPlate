import { siteConfig, getSiteValue } from '@config/site.config'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>{getSiteValue(siteConfig.footer.copyright)}</p>
        {siteConfig.footer.links.length > 0 && (
          <nav aria-label="Footer navigation">
            {siteConfig.footer.links.map((link) => (
              <a key={link.path} href={link.path}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}

export default Footer

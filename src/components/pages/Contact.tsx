import ContactForm from '../ui/ContactForm'
import styles from './Contact.module.css'

export default function Contact() {
  const handleSuccess = () => {
    console.log('Form submitted successfully!')
  }

  const handleError = (error: string) => {
    console.error('Form submission error:', error)
  }

  return (
    <div className={styles.contact}>
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p className={styles.subtitle}>
          Have a question or want to work together? Send us a message!
        </p>
      </div>

      <div className={styles.content}>
        <ContactForm
          provider="formspree"
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>

      <div className={styles.info}>
        <h2>Other Ways to Reach Us</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>Email</h3>
            <p>
              <a href="mailto:hello@example.com">hello@example.com</a>
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Phone</h3>
            <p>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Address</h3>
            <p>
              123 Main Street
              <br />
              City, State 12345
              <br />
              Country
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

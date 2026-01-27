import { FormEvent, ChangeEvent } from 'react'
import { useContactForm } from '@hooks/useContactForm'
import styles from './ContactForm.module.css'
import Button from './Button'

interface ContactFormProps {
  provider?: 'formspree' | 'getform' | 'web3forms' | 'custom' | 'netlify'
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function ContactForm({
  provider = 'formspree',
  onSuccess,
  onError,
}: ContactFormProps) {
  const isNetlify = provider === 'netlify'
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
  } = useContactForm({ provider, onSuccess, onError })

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    handleChange(name as keyof typeof formData, value)
  }

  const onSubmit = async (e: FormEvent) => {
    await handleSubmit(e)
  }

  if (submitStatus.type === 'success') {
    return (
      <div className={styles.successMessage} role="alert" aria-live="polite">
        <h3>Thank you!</h3>
        <p>
          Your message has been sent successfully. We'll get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form
      className={styles.contactForm}
      onSubmit={onSubmit}
      method="POST"
      noValidate
      aria-label="Contact form"
      data-netlify={isNetlify ? 'true' : undefined}
      name={isNetlify ? 'contact' : undefined}
      data-netlify-honeypot={isNetlify ? 'bot-field' : undefined}
    >
      {isNetlify && (
        <>
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />
        </>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Name{' '}
          <span className={styles.required} aria-label="required">
            *
          </span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <span id="name-error" className={styles.errorText} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email{' '}
          <span className={styles.required} aria-label="required">
            *
          </span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span id="email-error" className={styles.errorText} role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={onChange}
          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <span id="phone-error" className={styles.errorText} role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Message{' '}
          <span className={styles.required} aria-label="required">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={onChange}
          rows={5}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.message && (
          <span id="message-error" className={styles.errorText} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      {submitStatus.type === 'error' && (
        <div className={styles.submitError} role="alert" aria-live="polite">
          {submitStatus.message}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

import styles from './Spinner.module.css'

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  containerHeight?: string
  className?: string
}

export default function Spinner({
  size = 'medium',
  text,
  containerHeight,
  className = '',
}: SpinnerProps) {
  const spinnerClass = `${styles.spinner} ${styles[`spinner${size.charAt(0).toUpperCase() + size.slice(1)}`]}`

  const content = text ? (
    <div className={styles.spinnerWithText}>
      <div className={spinnerClass} role="status" aria-label="Loading" />
      <span className={styles.spinnerText}>{text}</span>
    </div>
  ) : (
    <div className={spinnerClass} role="status" aria-label="Loading" />
  )

  return (
    <div
      className={`${styles.spinnerContainer} ${className}`}
      style={
        containerHeight
          ? ({ '--container-height': containerHeight } as React.CSSProperties)
          : undefined
      }
    >
      {content}
    </div>
  )
}

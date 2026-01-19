import { ReactNode, memo } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const Button = memo(
  ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    type = 'button',
    ariaLabel,
  }: ButtonProps) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${styles[variant]}`}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

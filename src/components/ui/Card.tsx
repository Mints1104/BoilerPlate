import { ReactNode, memo } from 'react'
import styles from './Card.module.css'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
}

const Card = memo(({ title, children, className = '' }: CardProps) => {
  return (
    <article className={`${styles.card} ${className}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </article>
  )
})

Card.displayName = 'Card'

export default Card

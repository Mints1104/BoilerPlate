import { ReactNode, useEffect, useMemo, useState } from 'react'
import styles from './Carousel.module.css'

export interface CarouselItem {
  id: string
  src?: string
  alt?: string
  content?: ReactNode
  caption?: string
}

interface CarouselProps {
  items: CarouselItem[]
  ariaLabel?: string
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
}

const Carousel = ({
  items,
  ariaLabel = 'Showcase carousel',
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  className,
}: CarouselProps) => {
  const [index, setIndex] = useState(0)
  const total = items.length

  const safeIndex = useMemo(() => {
    if (total === 0) return 0
    return Math.min(Math.max(index, 0), total - 1)
  }, [index, total])

  useEffect(() => {
    if (!autoPlay || total <= 1) return
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, total])

  useEffect(() => {
    if (index !== safeIndex) setIndex(safeIndex)
  }, [index, safeIndex])

  const handlePrevious = () => {
    setIndex((current) => (current - 1 + total) % total)
  }

  const handleNext = () => {
    setIndex((current) => (current + 1) % total)
  }

  if (total === 0) return null

  return (
    <div className={`${styles.carousel} ${className ?? ''}`.trim()}>
      <div className={styles.header}>
        <span className={styles.label}>{ariaLabel}</span>
        <span className={styles.counter}>
          {safeIndex + 1} / {total}
        </span>
      </div>
      <div className={styles.viewport} role="region" aria-label={ariaLabel}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div className={styles.slide} key={item.id}>
              {item.content ? (
                item.content
              ) : item.src ? (
                <img
                  className={styles.image}
                  src={item.src}
                  alt={item.alt ?? ''}
                />
              ) : null}
              {item.caption ? (
                <p className={styles.caption}>{item.caption}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {showArrows && total > 1 ? (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlButton}
            onClick={handlePrevious}
          >
            Prev
          </button>
          <button
            type="button"
            className={styles.controlButton}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      ) : null}
      {showDots && total > 1 ? (
        <div
          className={styles.dots}
          role="tablist"
          aria-label="Carousel slides"
        >
          {items.map((item, dotIndex) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.dot} ${dotIndex === safeIndex ? styles.dotActive : ''}`}
              aria-label={`Go to slide ${dotIndex + 1}`}
              aria-current={dotIndex === safeIndex}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Carousel

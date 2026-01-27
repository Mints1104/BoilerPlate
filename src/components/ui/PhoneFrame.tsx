import { ReactNode } from 'react'
import styles from './PhoneFrame.module.css'

export type DevicePreset = 'iphone' | 'pixel' | 'default'

interface PhoneFrameProps {
  title?: string
  children: ReactNode
  className?: string
  device?: DevicePreset
}

const PhoneFrame = ({
  title,
  children,
  className,
  device = 'iphone',
}: PhoneFrameProps) => {
  const deviceClass =
    device === 'iphone'
      ? styles.iPhone
      : device === 'pixel'
        ? styles.pixel
        : styles.default

  return (
    <div className={`${styles.frame} ${deviceClass} ${className ?? ''}`.trim()}>
      <div className={styles.notchArea} aria-hidden>
        {device === 'iphone' && (
          <div className={styles.notch}>
            <span className={styles.speaker} />
            <span className={styles.camera} />
          </div>
        )}
        {device === 'pixel' && (
          <>
            <span className={styles.cameraPunch} />
          </>
        )}
        {device === 'default' && (
          <div className={styles.topBar}>
            <span className={styles.speaker} />
            <span className={styles.camera} />
          </div>
        )}
      </div>
      {title ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.screen}>{children}</div>
      <div className={styles.homeIndicator} aria-hidden />
    </div>
  )
}

export default PhoneFrame

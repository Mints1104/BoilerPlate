import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Spinner from './Spinner'
import styles from './Spinner.module.css'

describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('displays loading text when provided', () => {
    render(<Spinner text="Loading data..." />)
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('renders different sizes', () => {
    const { container } = render(<Spinner size="large" />)
    const spinner = container.querySelector('[role="status"]')
    expect(spinner).toBeInTheDocument()
    expect(spinner?.className).toContain(styles.spinnerLarge)
  })

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})

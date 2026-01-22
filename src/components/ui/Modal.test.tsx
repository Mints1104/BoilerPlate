import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    const closeButton = screen.getByLabelText('Close modal')
    await user.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when Escape is pressed if closeOnEscape is false', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal isOpen={true} onClose={onClose} closeOnEscape={false}>
        <p>Modal content</p>
      </Modal>
    )

    await user.keyboard('{Escape}')

    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders without close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} showCloseButton={false}>
        <p>Modal content</p>
      </Modal>
    )

    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument()
  })

  it('renders different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()} size="small">
        <p>Content</p>
      </Modal>
    )

    expect(screen.getByRole('dialog').className).toContain('small')

    rerender(
      <Modal isOpen={true} onClose={vi.fn()} size="large">
        <p>Content</p>
      </Modal>
    )

    expect(screen.getByRole('dialog').className).toContain('large')
  })
})

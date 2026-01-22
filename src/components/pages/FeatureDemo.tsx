import { useState } from 'react'
import { useToast } from '@/contexts/ToastContext'
import { useApi, useApiMutation } from '@hooks/useApi'
import Modal from '@components/ui/Modal'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'

/**
 * Demo page showcasing Toast, API Client, and Modal features
 * This file is for demonstration - you can delete or modify it
 */
export default function FeatureDemo() {
  const toast = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<'small' | 'medium' | 'large'>(
    'medium'
  )

  // Example API hook usage (will fail if no API is configured)
  const { data, loading, error, refetch } = useApi('/users', {
    immediate: false,
  })
  const { mutate, loading: mutating } = useApiMutation('/users', 'post')

  const handleApiTest = async () => {
    try {
      await refetch()
      toast.success('API call successful!')
    } catch (err) {
      toast.error('API call failed - this is expected without a backend')
    }
  }

  const handleMutationTest = async () => {
    try {
      await mutate({ name: 'Test User', email: 'test@example.com' })
      toast.success('Data submitted successfully!')
    } catch (err) {
      toast.error('Submission failed - this is expected without a backend')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Feature Demonstrations</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        This page demonstrates the new features. You can delete this file after
        reviewing.
      </p>

      {/* Toast Examples */}
      <Card>
        <h2>🔔 Toast Notifications</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Click buttons to see different notification types:
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button
            onClick={() => toast.success('Operation completed successfully!')}
          >
            Success Toast
          </Button>
          <Button onClick={() => toast.error('Something went wrong!')}>
            Error Toast
          </Button>
          <Button onClick={() => toast.warning('Please review your changes')}>
            Warning Toast
          </Button>
          <Button onClick={() => toast.info('New feature available')}>
            Info Toast
          </Button>
          <Button
            onClick={() =>
              toast.success('This will stay for 10 seconds', 10000)
            }
          >
            Long Duration
          </Button>
        </div>
      </Card>

      {/* Modal Examples */}
      <Card>
        <h2>🪟 Modal Component</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Modals with different sizes and configurations:
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button
            onClick={() => {
              setModalSize('small')
              setIsModalOpen(true)
            }}
          >
            Small Modal
          </Button>
          <Button
            onClick={() => {
              setModalSize('medium')
              setIsModalOpen(true)
            }}
          >
            Medium Modal
          </Button>
          <Button
            onClick={() => {
              setModalSize('large')
              setIsModalOpen(true)
            }}
          >
            Large Modal
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`${modalSize.charAt(0).toUpperCase() + modalSize.slice(1)} Modal Example`}
          size={modalSize}
        >
          <div>
            <p style={{ marginBottom: '1rem' }}>
              This is a {modalSize} modal. Features include:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>ESC key to close</li>
              <li>Click backdrop to close</li>
              <li>Focus trap (try pressing Tab)</li>
              <li>Smooth animations</li>
              <li>Mobile responsive</li>
            </ul>
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'flex-end',
              }}
            >
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              <Button
                onClick={() => {
                  toast.success('Action confirmed!')
                  setIsModalOpen(false)
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      </Card>

      {/* API Client Examples */}
      <Card>
        <h2>🌐 API Client</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Test API calls with interceptors and error handling:
        </p>
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '1rem',
          }}
        >
          <Button onClick={handleApiTest} disabled={loading}>
            {loading ? 'Loading...' : 'Test GET Request'}
          </Button>
          <Button onClick={handleMutationTest} disabled={mutating}>
            {mutating ? 'Submitting...' : 'Test POST Request'}
          </Button>
        </div>

        {data ? (
          <div
            style={{
              padding: '1rem',
              background: 'var(--background-secondary)',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <strong>Response:</strong>
            <pre style={{ marginTop: '0.5rem', overflow: 'auto' }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        ) : null}

        {error && (
          <div
            style={{
              padding: '1rem',
              background: '#fee',
              borderRadius: '8px',
              marginTop: '1rem',
              color: '#c00',
            }}
          >
            <strong>Error:</strong> {error.message}
          </div>
        )}

        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'var(--background-secondary)',
            borderRadius: '8px',
          }}
        >
          <strong>Features:</strong>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Automatic auth token handling</li>
            <li>Request/response interceptors</li>
            <li>Retry logic for network errors</li>
            <li>401 handling with auth expiration event</li>
            <li>TypeScript support</li>
          </ul>
        </div>
      </Card>

      {/* Dark Mode Info */}
      <Card>
        <h2>🌙 Dark Mode</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Toggle in the header! Features automatic system preference detection
          and localStorage persistence. Try refreshing the page - your
          preference is saved.
        </p>
      </Card>
    </div>
  )
}

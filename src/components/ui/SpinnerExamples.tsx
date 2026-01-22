import { useState } from 'react'
import Spinner from '@components/ui/Spinner'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'
import styles from './SpinnerExamples.module.css'

/**
 * Example component demonstrating various Spinner use cases
 * This file can be deleted - it's just for reference
 */
export default function SpinnerExamples() {
  const [isLoading, setIsLoading] = useState(false)

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className={styles.container}>
      <h1>Spinner Component Examples</h1>

      {/* Example 1: Basic Spinner */}
      <Card>
        <h2>Basic Spinner</h2>
        <Spinner />
      </Card>

      {/* Example 2: Spinner with Text */}
      <Card>
        <h2>Spinner with Text</h2>
        <Spinner text="Loading data..." />
      </Card>

      {/* Example 3: Different Sizes */}
      <Card>
        <h2>Different Sizes</h2>
        <div className={styles.sizeExamples}>
          <div>
            <h3>Small</h3>
            <Spinner size="small" containerHeight="100px" />
          </div>
          <div>
            <h3>Medium (Default)</h3>
            <Spinner size="medium" containerHeight="100px" />
          </div>
          <div>
            <h3>Large</h3>
            <Spinner size="large" containerHeight="100px" />
          </div>
        </div>
      </Card>

      {/* Example 4: Conditional Loading */}
      <Card>
        <h2>Conditional Loading State</h2>
        <Button onClick={simulateLoading} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Start Loading'}
        </Button>
        {isLoading && <Spinner text="Processing..." containerHeight="150px" />}
        {!isLoading && <p>Click the button to see loading state</p>}
      </Card>

      {/* Example 5: Full Height Spinner */}
      <Card>
        <h2>Custom Height Spinner</h2>
        <Spinner text="Loading page content..." containerHeight="300px" />
      </Card>

      {/* Example 6: Inline Spinner */}
      <Card>
        <h2>Inline Spinner</h2>
        <div className={styles.inlineExample}>
          <span>Processing your request</span>
          <Spinner size="small" containerHeight="auto" />
        </div>
      </Card>
    </div>
  )
}

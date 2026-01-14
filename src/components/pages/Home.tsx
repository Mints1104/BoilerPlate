import { useState } from 'react'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'
import { useCounter } from '@hooks/useCounter'
import styles from './Home.module.css'

const Home = () => {
  const [name, setName] = useState('')
  const { count, increment, decrement, reset } = useCounter(0)

  return (
    <div className={styles.home}>
      <h1>Welcome to Vite + React + TypeScript Boilerplate! 🚀</h1>
      
      <p className={styles.description}>
        This is a production-ready boilerplate with routing, hooks, utilities,
        and component examples to help you get started quickly.
      </p>

      <div className={styles.grid}>
        <Card title="Counter Example">
          <div className={styles.counter}>
            <p className={styles.count}>Count: {count}</p>
            <div className={styles.buttons}>
              <Button onClick={decrement} variant="secondary">
                -
              </Button>
              <Button onClick={reset} variant="secondary">
                Reset
              </Button>
              <Button onClick={increment}>+</Button>
            </div>
          </div>
        </Card>

        <Card title="Form Example">
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            {name && (
              <p className={styles.greeting}>Hello, {name}! 👋</p>
            )}
          </div>
        </Card>
      </div>

      <div className={styles.features}>
        <h2>Features Included:</h2>
        <ul>
          <li>✅ Vite for lightning-fast development</li>
          <li>✅ React 18 with TypeScript</li>
          <li>✅ React Router for navigation</li>
          <li>✅ Path aliases configured (@components, @hooks, etc.)</li>
          <li>✅ ESLint & Prettier for code quality</li>
          <li>✅ CSS Modules for scoped styling</li>
          <li>✅ Custom hooks and utilities</li>
          <li>✅ Reusable UI components</li>
        </ul>
      </div>
    </div>
  )
}

export default Home

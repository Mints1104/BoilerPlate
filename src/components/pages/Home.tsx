import { useState } from 'react'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'
import SEO from '@components/SEO'
import { useCounter } from '@hooks/useCounter'
import styles from './Home.module.css'

const Home = () => {
  const [name, setName] = useState('')
  const { count, increment, decrement, reset } = useCounter(0)

  return (
    <>
      <SEO
        title="Home - Vite + React + TypeScript"
        description="Production-ready boilerplate with routing, hooks, utilities, and component examples"
      />
      <div className={styles.home}>
        <h1>Welcome to Vite + React + TypeScript Boilerplate! 🚀</h1>

        <p className={styles.description}>
          This is a production-ready boilerplate with routing, hooks, utilities,
          and component examples to help you get started quickly.
        </p>

        <section className={styles.grid} aria-label="Interactive examples">
          <Card title="Counter Example">
            <div className={styles.counter}>
              <p className={styles.count} aria-live="polite" aria-atomic="true">
                Count: {count}
              </p>
              <div className={styles.buttons}>
                <Button
                  onClick={decrement}
                  variant="secondary"
                  ariaLabel="Decrement counter"
                >
                  -
                </Button>
                <Button
                  onClick={reset}
                  variant="secondary"
                  ariaLabel="Reset counter to zero"
                >
                  Reset
                </Button>
                <Button onClick={increment} ariaLabel="Increment counter">
                  +
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Form Example">
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="name-input" className="visually-hidden">
                Enter your name
              </label>
              <input
                id="name-input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                aria-describedby={name ? 'greeting' : undefined}
              />
              {name && (
                <p
                  id="greeting"
                  className={styles.greeting}
                  role="status"
                  aria-live="polite"
                >
                  Hello, {name}! 👋
                </p>
              )}
            </form>
          </Card>
        </section>

        <section className={styles.features} aria-labelledby="features-heading">
          <h2 id="features-heading">Features Included:</h2>
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
        </section>
      </div>
    </>
  )
}

export default Home

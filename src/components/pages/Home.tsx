import { useState } from 'react'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'
import SEO from '@components/SEO'
import { siteConfig } from '@config/site.config'
import { useCounter } from '@hooks/useCounter'
import styles from './Home.module.css'

const Home = () => {
  const [name, setName] = useState('')
  const { count, increment, decrement, reset } = useCounter(0)

  return (
    <>
      <SEO
        title={`Home - ${siteConfig.name}`}
        description={siteConfig.description}
      />
      <div className={styles.home}>
        <h1>
          Welcome to {siteConfig.name}{' '}
          {siteConfig.logo.emoji && siteConfig.logo.emoji}
        </h1>

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
            {siteConfig.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default Home

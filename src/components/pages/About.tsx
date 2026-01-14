import Card from '@components/ui/Card'
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about}>
      <h1>About This Boilerplate</h1>
      
      <Card title="Purpose">
        <p>
          This boilerplate is designed to give you a head start on your next
          React project. It includes all the modern tools and best practices
          you need to build scalable applications.
        </p>
      </Card>

      <Card title="Technology Stack">
        <ul className={styles.techList}>
          <li>
            <strong>Vite:</strong> Next generation frontend tooling with
            lightning-fast HMR
          </li>
          <li>
            <strong>React 18:</strong> The latest version with concurrent
            features
          </li>
          <li>
            <strong>TypeScript:</strong> Type safety and better developer
            experience
          </li>
          <li>
            <strong>React Router:</strong> Declarative routing for React
          </li>
          <li>
            <strong>ESLint + Prettier:</strong> Consistent code style and
            quality
          </li>
        </ul>
      </Card>

      <Card title="Project Structure">
        <pre className={styles.structure}>
{`src/
├── components/       # React components
│   ├── pages/       # Page components
│   └── ui/          # Reusable UI components
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript types
├── styles/          # Global styles
└── assets/          # Static assets`}
        </pre>
      </Card>
    </div>
  )
}

export default About

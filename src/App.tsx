import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout'

// Lazy load page components for code splitting
const Home = lazy(() => import('@components/pages/Home'))
const About = lazy(() => import('@components/pages/About'))
const Contact = lazy(() => import('@components/pages/Contact'))
const NotFound = lazy(() => import('@components/pages/NotFound'))

// Loading fallback component
const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    }}
  >
    <div
      style={{
        fontSize: '1.25rem',
        color: 'var(--primary-color)',
      }}
    >
      Loading...
    </div>
  </div>
)

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout'
import Spinner from '@components/ui/Spinner'

// Lazy load page components for code splitting
const Home = lazy(() => import('@components/pages/Home'))
const About = lazy(() => import('@components/pages/About'))
const Contact = lazy(() => import('@components/pages/Contact'))
const NotFound = lazy(() => import('@components/pages/NotFound'))

function App() {
  return (
    <Suspense
      fallback={<Spinner text="Loading page..." containerHeight="50vh" />}
    >
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

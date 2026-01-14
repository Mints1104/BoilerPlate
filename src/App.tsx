import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout'
import Home from '@components/pages/Home'
import About from '@components/pages/About'
import NotFound from '@components/pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

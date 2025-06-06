import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DerivativeSolver from './components/DerivativeSolver'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <h1>Calculus Calculator</h1>
      <h3>For exponents use ** (e.g, x**2 = x^2).</h3>
      <DerivativeSolver />
    </div>
  )
}

export default App

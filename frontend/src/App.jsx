import { useState } from 'react'
import './App.css'
import DerivativeSolver from './components/DerivativeSolver'

function App() {
  return (
    <div className="container">
      <h1>Calculus Calculator</h1>
      <DerivativeSolver />
    </div>
  )
}

export default App

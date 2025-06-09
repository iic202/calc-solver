import { useState } from 'react'
import './App.css'
import DerivativeSolver from './components/DerivativeSolver'
import IntegralSolver from './components/IntegralSolver'
import LimitSolver from './components/LimitSolver'

function App() {
  const [activeCalculator, setActiveCalculator] = useState('derivative');

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'derivative':
        return <DerivativeSolver />;
      case 'integral':
        return <IntegralSolver />;
      case 'limit':
        return <LimitSolver />;
      default:
        return <DerivativeSolver />;
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1> Calculator </h1>
        <div className="tabs">
          <button 
            className={`tab-btn ${activeCalculator === 'derivative' ? 'active' : ''}`}
            onClick={() => setActiveCalculator('derivative')}
          >
            Derivative Solver
          </button>
          <button 
            className={`tab-btn ${activeCalculator === 'integral' ? 'active' : ''}`}
            onClick={() => setActiveCalculator('integral')}
          >
            Integral Solver
          </button>

          <button 
            className={`tab-btn ${activeCalculator === 'limit' ? 'active' : ''}`}
            onClick={() => setActiveCalculator('limit')}
          >
            Limit Solver
          </button>
        </div>
      </div>
      
      {renderCalculator()}

      <div className="footer">
        <p>
          © {new Date().getFullYear()} Math Solver. 
          <a href="https://github.com/iic202" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px' }}>
            GitHub
          </a>
        </p>
      </div>
    </div>
  )
}

export default App

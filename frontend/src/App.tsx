import { useState } from 'react';
import { DerivativeCalculator } from './pages/DerivativeCalculator';
import { IntegralCalculator } from './pages/IntegralCalculator';
import './App.css';

type CalculatorType = 'derivative' | 'integral';

function App() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('derivative');

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'derivative':
        return <DerivativeCalculator />;
      case 'integral':
        return <IntegralCalculator />;
      default:
        return <DerivativeCalculator />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Calculus Solver</h1>
        <p>Derivative and Integral solver with LaTeX support</p>
      </header>

      <nav className="calculator-nav">
        <button
          className={activeCalculator === 'derivative' ? 'active' : ''}
          onClick={() => setActiveCalculator('derivative')}
        >
          Derivatives
        </button>
        <button
          className={activeCalculator === 'integral' ? 'active' : ''}
          onClick={() => setActiveCalculator('integral')}
        >
          Integrals
        </button>
      </nav>

      <main className="app-main">
        {renderCalculator()}
      </main>

      <footer className="app-footer">
        <p>Made by iic202 - 2025</p>
      </footer>
    </div>
  );
}

export default App;

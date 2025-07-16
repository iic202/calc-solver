import React from 'react';
import { MathDisplay } from './MathDisplay';

interface ResultDisplayProps {
  result: any;
  error: string | null;
  type: 'derivative' | 'integral';
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error, type }) => {
  if (error) {
    return (
      <div className="result-display error">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const renderDerivativeResult = () => (
    <div className="result-content">
      <div className="result-section">
        <h4>Original Expression:</h4>
        <MathDisplay latex={result.expression_latex} />
      </div>
      
      <div className="result-section">
        <h4>{result.order === 1 ? 'Derivative' : `${result.order}${getOrdinalSuffix(result.order)} Derivative`}:</h4>
        <MathDisplay latex={result.derivative_latex} />
      </div>
      
      <div className="result-details">
        <p><strong>Variable:</strong> {result.variable}</p>
        <p><strong>Order:</strong> {result.order}</p>
        <p><strong>Symbolic Result:</strong> <code>{result.derivative_expression}</code></p>
      </div>
    </div>
  );

  const renderIntegralResult = () => (
    <div className="result-content">
      <div className="result-section">
        <h4>Original Expression:</h4>
        <MathDisplay latex={result.expression_latex} />
      </div>
      
      <div className="result-section">
        <h4>{result.definite ? 'Definite' : 'Indefinite'} Integral:</h4>
        <MathDisplay latex={result.integral_latex} />
      </div>
      
      <div className="result-details">
        <p><strong>Variable:</strong> {result.variable}</p>
        <p><strong>Type:</strong> {result.definite ? 'Definite' : 'Indefinite'}</p>
        {result.definite && result.value && (
          <p><strong>Numerical Value:</strong> <code>{result.value}</code></p>
        )}
        <p><strong>Symbolic Result:</strong> <code>{result.integral_expression}</code></p>
      </div>
    </div>
  );

  return (
    <div className="result-display success">
      <h3>Result</h3>
      {type === 'derivative' && renderDerivativeResult()}
      {type === 'integral' && renderIntegralResult()}
    </div>
  );
};

function getOrdinalSuffix(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

import React, { useState } from 'react';
import { CalculatorForm } from '../components/CalculatorForm';
import { ResultDisplay } from '../components/ResultDisplay';
import { calculusAPI } from '../services/api';
import type { DerivativeRequest, DerivativeResponse } from '../services/api';

export const DerivativeCalculator: React.FC = () => {
  const [result, setResult] = useState<DerivativeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: 'expression',
      label: 'Expression (LaTeX format)',
      type: 'text' as const,
      placeholder: 'e.g., x^2, \\sin(x), \\frac{x^2}{2}',
      required: true
    },
    {
      name: 'variable',
      label: 'Variable',
      type: 'text' as const,
      placeholder: 'e.g., x, y, t',
      required: true
    },
    {
      name: 'order',
      label: 'Derivative Order',
      type: 'number' as const,
      placeholder: '1',
      required: true
    }
  ];

  const handleSubmit = async (formData: DerivativeRequest) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await calculusAPI.calculateDerivative(formData);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred while calculating the derivative');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="derivative-calculator">
      <CalculatorForm
        title="Derivative Calculator"
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
      />
      
      <ResultDisplay
        result={result}
        error={error}
        type="derivative"
      />
    </div>
  );
};

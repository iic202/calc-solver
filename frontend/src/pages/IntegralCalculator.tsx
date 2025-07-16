import React, { useState } from 'react';
import { CalculatorForm } from '../components/CalculatorForm';
import { ResultDisplay } from '../components/ResultDisplay';
import { calculusAPI } from '../services/api';
import type { IntegralRequest, IntegralResponse } from '../services/api';

export const IntegralCalculator: React.FC = () => {
  const [result, setResult] = useState<IntegralResponse | null>(null);
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
      name: 'lower_bound',
      label: 'Lower Bound (optional, for definite integral)',
      type: 'text' as const,
      placeholder: 'e.g., 0, -\\infty, a',
      required: false
    },
    {
      name: 'upper_bound',
      label: 'Upper Bound (optional, for definite integral)',
      type: 'text' as const,
      placeholder: 'e.g., 1, \\infty, b',
      required: false
    }
  ];

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Clean up the form data - remove empty bounds
    const cleanedData: IntegralRequest = {
      expression: formData.expression,
      variable: formData.variable,
    };

    if (formData.lower_bound && formData.upper_bound) {
      cleanedData.lower_bound = formData.lower_bound;
      cleanedData.upper_bound = formData.upper_bound;
      cleanedData.definite = true;
    }

    try {
      const response = await calculusAPI.calculateIntegral(cleanedData);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred while calculating the integral');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="integral-calculator">
      <CalculatorForm
        title="Integral Calculator"
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
      />
      
      <ResultDisplay
        result={result}
        error={error}
        type="integral"
      />
    </div>
  );
};

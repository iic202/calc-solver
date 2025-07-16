import React, { useState } from 'react';
import { MathDisplay } from './MathDisplay';

interface CalculatorFormProps {
  title: string;
  onSubmit: (data: any) => void;
  loading: boolean;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'select' | 'number';
    options?: string[];
    placeholder?: string;
    required?: boolean;
  }[];
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  title,
  onSubmit,
  loading,
  fields
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const expressionField = fields.find(field => field.name === 'expression');
  const expression = formData.expression || '';

  return (
    <div className="calculator-form">
      <h2>{title}</h2>
      
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            
            {field.type === 'select' ? (
              <select
                id={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
              >
                <option value="">Select...</option>
                {field.options?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, 
                  field.type === 'number' ? Number(e.target.value) : e.target.value
                )}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}

        {expressionField && expression && (
          <div className="form-group">
            <div className="preview-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={showPreview}
                  onChange={(e) => setShowPreview(e.target.checked)}
                />
                Preview
              </label>
            </div>
            
            {showPreview && (
              <div className="expression-preview">
                <h4>Expression Preview:</h4>
                <MathDisplay latex={expression} />
              </div>
            )}
          </div>
        )}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>
    </div>
  );
};

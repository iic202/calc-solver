import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathDisplayProps {
  latex: string;
  inline?: boolean;
  className?: string;
}

export const MathDisplay: React.FC<MathDisplayProps> = ({ 
  latex, 
  inline = false, 
  className = '' 
}) => {
  try {
    if (inline) {
      return (
        <span className={className}>
          <InlineMath math={latex} />
        </span>
      );
    } else {
      return (
        <div className={className}>
          <BlockMath math={latex} />
        </div>
      );
    }
  } catch (error) {
    // Fallback for invalid LaTeX
    return (
      <span className={`math-error ${className}`}>
        Invalid LaTeX: {latex}
      </span>
    );
  }
};

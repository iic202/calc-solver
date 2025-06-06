import React, {useState} from "react";
import api from "../api";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from "react-katex";

function DerivativeSolver() {
    const [expression, setExpression] = useState("");
    const [variable, setVariable] = useState("x");
    const [order, setOrder] = useState(1);
    const [result, setResult] = useState("");
    const [latexResult, setLatexResult] = useState("");
    const [expressionLatex, setExpressionLatex] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/calculus/derivative", { 
                expression: expression,
                variable: variable,
                order: parseInt(order as any)
            });
            setResult(response.data.derivative_expression);
            setLatexResult(response.data.derivative_latex);
            setExpressionLatex(response.data.expression_latex);
        } catch (error) {
            console.error("Error calculating derivative:", error);
            setResult("Error calculating derivative");
        }
    };

    return (
        <div className="solver-container">
            <div className="form_area">
                <p className="title">DERIVATIVE SOLVER</p>
                <p className="notes">
                    This tool calculates the derivative of a given expression with respect to a specified variable.
                    <br />
                    You can specify the order of the derivative (default is 1).
                    <br />
                    <br />
                    <strong>Note:</strong> Ensure the expression is in a valid format (e.g., x**2 + 3*x = x^2 + 3x) .
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="sub_title" htmlFor="expression">Expression</label>
                        <input
                            id="expression"
                            type="text"
                            value={expression}
                            onChange={(e) => setExpression(e.target.value)}
                            placeholder="Enter expression (e.g., x**2 + 3*x)"
                            className="form_style"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="sub_title" htmlFor="variable">Variable</label>
                        <input
                            id="variable"
                            type="text"
                            value={variable}
                            onChange={(e) => setVariable(e.target.value)}
                            placeholder="Variable (default: x)"
                            className="form_style"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="sub_title" htmlFor="order">Order</label>
                        <input
                            id="order"
                            type="number"
                            min="1"
                            max="10"
                            value={order}
                            onChange={(e) => setOrder(e.target.valueAsNumber)}
                            className="form_style"
                        />
                    </div>
                    
                    <button className="btn liquid" type="submit">Calculate Derivative</button>
                </form>
                
                {result && latexResult && expressionLatex && (
                    <div className="form-group">
                        <div className="latex-result">
                            <BlockMath math={`\\frac{d${order > 1 ? `^${order}` : ''}}{d${variable}${order > 1 ? `^${order}` : ''}}\\left(${expressionLatex}\\right) = ${latexResult}`} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DerivativeSolver;
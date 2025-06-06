import React, {useState} from "react";
import api from "../api";

function DerivativeSolver() {
    const [expression, setExpression] = useState("");
    const [variable, setVariable] = useState("x");
    const [order, setOrder] = useState(1);
    const [result, setResult] = useState("");
    const [latexResult, setLatexResult] = useState("");

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
        } catch (error) {
            console.error("Error calculating derivative:", error);
            setResult("Error calculating derivative");
        }
    };

    return (
        <div className="solver-container">
            <h2>Derivative Solver</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="expression">Expression:</label>
                    <input
                        id="expression"
                        type="text"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        placeholder="Enter expression (e.g., x**2 + 3*x)"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="variable">Variable:</label>
                    <input
                        id="variable"
                        type="text"
                        value={variable}
                        onChange={(e) => setVariable(e.target.value)}
                        placeholder="Variable (default: x)"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="order">Order:</label>
                    <input
                        id="order"
                        type="number"
                        min="1"
                        max="10"
                        value={order}
                        onChange={(e) => setOrder(e.target.valueAsNumber)}
                    />
                </div>
                
                <button type="submit">Calculate Derivative</button>
            </form>
            
            {result && (
                <div className="result">
                    <h3>Result:</h3>
                    <div className="result-box">
                        <p>{result}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DerivativeSolver;
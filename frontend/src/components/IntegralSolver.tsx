import React, {useState} from "react";
import api from "../api";
import 'katex/dist/katex.min.css';
import { BlockMath } from "react-katex";

function IntegralSolver() {
    const [expression, setExpression] = useState("");
    const [variable, setVariable] = useState("x");
    const [lowerBound, setLowerBound] = useState("");
    const [upperBound, setUpperBound] = useState("");
    const [result, setResult] = useState("");
    const [latexResult, setLatexResult] = useState("");
    const [expressionLatex, setExpressionLatex] = useState("");
    const [value, setValue] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const lowerBoundValue = lowerBound.trim() === "" ? null : lowerBound;
            const upperBoundValue = upperBound.trim() === "" ? null : upperBound;
            
            const response = await api.post("/calculus/integral", { 
                expression: expression,
                variable: variable,
                lower_bound: lowerBoundValue,
                upper_bound: upperBoundValue
            });
            
            console.log("Response received:", response.data);
            
            setResult(response.data.integral_expression);
            setLatexResult(response.data.integral_latex);
            setExpressionLatex(response.data.expression_latex);
            setValue(response.data.value);
        } catch (error) {
            console.error("Error calculating integral:", error);
            setResult("Error calculating integral");
        }
    };

    return (
        <div className="solver-container">
            <div className="form_area">
                <p className="title">INTEGRAL SOLVER</p>
                <p className="notes">
                    This tool calculates the integral of a given expression with respect to a specified variable.
                    <br />
                    You can specify bounds for definite integration (leave empty for indefinite integral).
                    <br />
                    <br />
                    <strong>Note:</strong> Ensure the expression is in a valid format (e.g., x**2 + 3*x = x^2 + 3x).
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
                        <label className="sub_title" htmlFor="lowerBound">Lower Bound (optional)</label>
                        <input
                            id="lowerBound"
                            type="text"
                            value={lowerBound}
                            onChange={(e) => setLowerBound(e.target.value)}
                            placeholder="Lower bound (leave empty for indefinite integral)"
                            className="form_style"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="sub_title" htmlFor="upperBound">Upper Bound (optional)</label>
                        <input
                            id="upperBound"
                            type="text"
                            value={upperBound}
                            onChange={(e) => setUpperBound(e.target.value)}
                            placeholder="Upper bound (leave empty for indefinite integral)"
                            className="form_style"
                        />
                    </div>
                    
                    <button className="btn liquid" type="submit">Calculate Integral</button>
                </form>
                
                {result && latexResult && expressionLatex && (
                    <div className="form-group">
                        <div className="latex-result">
                            {upperBound && lowerBound ? (
                                <BlockMath math={`\\int_{${lowerBound}}^{${upperBound}} ${expressionLatex} \\, d${variable} = ${latexResult} = ${value}`} />
                            ) : (
                                <BlockMath math={`\\int ${expressionLatex} \\, d${variable} = ${latexResult} + C`} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default IntegralSolver;
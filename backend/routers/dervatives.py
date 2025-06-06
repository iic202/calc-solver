from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sympy import symbols, diff, latex, sympify
from typing import Optional

router = APIRouter()

class DerivativeRequest(BaseModel):
    expression: str
    variable: str
    order : int


class DerivativeResponse(BaseModel):
    original_expression: str
    derivative_expression: str
    derivative_latex: str
    variable: str
    order: int

@router.post("/derivative", response_model=DerivativeResponse)
def calculate_derivative(request: DerivativeRequest):
    try:
        # Parse the expression
        # expr = sympify(request.expression)
        expr = request.expression
        var = symbols(request.variable)

        # Calculate the derivative
        derivative = diff(expr, var, request.order)

        return DerivativeResponse(
            original_expression=str(expr),
            derivative_expression=str(derivative),
            derivative_latex=latex(derivative),
            variable=request.variable,
            order=request.order
        )
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing expression: {e}")
    
@router.get("/examples")
def get_examples():
    return {
        "basic": ["x**2", "3*x + 1", "sin(x)", "exp(x)"],
        "intermediate": ["x**2 * sin(x)", "log(x**2 + 1)", "x**3 * exp(x)"],
        "advanced": ["sin(x**2)", "x**(1/2)", "tan(x)/x"]
    }

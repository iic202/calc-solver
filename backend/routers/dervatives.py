from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, validator
from sympy import symbols, diff, latex, sympify
from typing import Optional

router = APIRouter()

class DerivativeRequest(BaseModel):
    expression: str
    variable: str
    order: int
    
    @validator('order')
    def validate_order(cls, v):
        if v <= 0:
            raise ValueError('Order must be a positive integer')
        return v


class DerivativeResponse(BaseModel):
    original_expression: str
    derivative_expression: str
    derivative_latex: str
    expression_latex: str
    variable: str
    order: int

@router.post("/derivative", response_model=DerivativeResponse)
def calculate_derivative(request: DerivativeRequest):
    try:
        # Parse the expression
        expr = sympify(request.expression)
        var = symbols(request.variable)

        # Calculate the derivative
        derivative = diff(expr, var, request.order)

        return DerivativeResponse(
            original_expression=str(expr),
            derivative_expression=str(derivative),
            derivative_latex=latex(derivative),
            expression_latex=latex(expr),
            variable=request.variable,
            order=request.order
        )
    
    except ValueError as ve:
        # Handle validation errors (like invalid order)
        raise HTTPException(status_code=400, detail=f"Validation error: {ve}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing expression: {e}")
    
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from typing import Optional
from sympy import symbols, integrate, latex, sympify

router = APIRouter()

class IntegralRequest(BaseModel):
    expression: str
    variable: str
    definite: bool = False
    lower_bound: Optional[str] = None
    upper_bound: Optional[str] = None

class IntegralResponse(BaseModel):
    original_expression: str
    integral_expression: str
    integral_latex: str
    expression_latex: str
    variable: str
    definite: bool = False
    value: Optional[str] = None


@router.post("/integral", response_model=IntegralResponse)
def calculate_integral(request: IntegralRequest):
    try:
        expr = sympify(request.expression)
        var = symbols(request.variable)
        
        indefinite_integral = integrate(expr, var)
        
        # Determine if this is a definite integral based on bounds presence
        is_definite = request.lower_bound is not None and request.upper_bound is not None
        result_value = None
        definite_result = None
        
        if is_definite:
            try:
                lower = sympify(request.lower_bound)
                upper = sympify(request.upper_bound)
                
                definite_result = integrate(expr, (var, lower, upper))
                result_value = str(definite_result)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Error calculating definite integral: {e}")
        
        # Choose the appropriate result for display
        display_result = definite_result if is_definite else indefinite_integral
        
        return IntegralResponse(
            original_expression=str(expr),
            integral_expression=str(display_result),
            integral_latex=latex(display_result),
            expression_latex=latex(expr),
            variable=request.variable,
            definite=is_definite,
            value=result_value
        )
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing function: {e}")
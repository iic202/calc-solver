from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from typing import Optional
from sympy import symbols, integrate, latex, sympify

router = APIRouter()

class IntergralRequest(BaseModel):
    function: str
    variable: str
    lower_limit: Optional[float] = None
    upper_limit: Optional[float] = None

class IntergralRespones(BaseModel):
    original_function: str
    integral_expression: str
    integral_latex: str
    function_latex: str
    variable: str
    lower_limit: Optional[float] = None
    upper_limit: Optional[float] = None


@router.post("/integral", response_model=IntergralRespones)
def calculate_integral(request: IntergralRequest):
    try:
        # Parse the function and variable
        func = sympify(request.function)
        print(f"Parsed function: {func}")
        var = symbols(request.variable)
        print(f"Parsed variable: {var}")
        print(f"Lower limit: {request.lower_limit}, Upper limit: {request.upper_limit}")

        # Calculate the integral and check if limits are in request.
        if request.lower_limit is not None and request.upper_limit is not None:
            integral = integrate(func, (var, request.lower_limit, request.upper_limit))
        else:
            integral = integrate(func, var)

        return IntergralRespones(
            original_function=str(func),
            integral_expression=str(integral),
            integral_latex=latex(integral),
            function_latex=latex(func),
            variable=request.variable,
            lower_limit=request.lower_limit,
            upper_limit=request.upper_limit
        )
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing function: {e}")
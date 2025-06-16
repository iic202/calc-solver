from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from typing import Optional
from sympy import symbols, limit, latex, sympify

router = APIRouter()

class LimitRequest(BaseModel):
    expression: str
    variable: str
    point: str
    direction: Optional[str] = None

class LimitResponse(BaseModel):
    original_expression: str
    limit_latex: str
    expression_latex: str
    variable: str
    direction: bool = False
    point: Optional[str] = None
    direction: Optional[str] = None
    value: Optional[str] = None
    

@router.post("/limit", response_model=LimitResponse)
def calculate_limit(request: LimitRequest):
    try:
        expr = sympify(request.expression)
        var = symbols(request.variable)
        point = sympify(request.point)
        direction = request.direction

        if direction is not None:
            if direction.lower() == 'left' or direction == '-':
                limit_value = limit(expr, var, point, dir='-')
            elif direction.lower() == 'right' or direction == '+':
                limit_value = limit(expr, var, point, dir='+')
            else:
                raise HTTPException(status_code=400, detail="Direction must be 'left(-)' or 'right(+)'.")
        else:
            limit_value = limit(expr, var, point)

        return LimitResponse(
            original_expression=str(expr),
            limit_latex=latex(limit_value),
            expression_latex=latex(expr),
            variable=request.variable,
            direction=direction is not None,
            point=str(point),
            value=str(limit_value) if limit_value is not None else None
        )

    
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing limit: {e}")
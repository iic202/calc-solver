# Derivative & Integral Solver

A modern web application for solving calculus problems including derivatives and integrals with LaTeX support.

## Features

- **Derivative Calculator**: Compute derivatives of any order for mathematical expressions
- **Integral Calculator**: Calculate both definite and indefinite integrals
- **LaTeX Support**: Input expressions using LaTeX notation (e.g., `\frac{x^2}{2}`, `\sin(x)`)
- **Real-time Computation**: Instant results with symbolic and numerical outputs
- **Interactive UI**: Clean, modern React interface with mathematical rendering
- **API Documentation**: Comprehensive REST API with Swagger/OpenAPI documentation

## Technology Stack

### Backend
- **Python 3.8+** - Core runtime
- **FastAPI** - Modern, fast web framework
- **SymPy** - Symbolic mathematics library
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling

## Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn package manager

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server:**
   ```bash
   python3 main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## API Usage

### Interactive Documentation
Visit `http://localhost:8000/docs` for the complete Swagger UI documentation.

### Example API Calls

#### Calculate Derivative
```bash
curl -X 'POST' \
  'http://localhost:8000/calculus/derivative' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "expression": "x^2 + 2x",
  "variable": "x",
  "order": 1
}'
```

#### Calculate Integral
```bash
curl -X 'POST' \
  'http://localhost:8000/calculus/integral' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "expression": "2x",
  "variable": "x",
  "lower_bound": "0",
  "upper_bound": "5"
}'
```

## Supported Expression Formats

The application supports both standard mathematical notation and LaTeX:

### Standard Notation
- `x**2` (powers)
- `sin(x)`, `cos(x)`, `tan(x)` (trigonometric functions)
- `log(x)`, `exp(x)` (logarithmic and exponential)
- `2*x + 3` (arithmetic operations)

### LaTeX Notation
- `x^2` or `x^{2}` (powers)
- `\frac{x^2}{2}` (fractions)
- `\sin(x)`, `\cos(x)`, `\tan(x)` (trigonometric functions)
- `\ln(x)`, `\exp(x)` (logarithmic and exponential)
- `2x` (implicit multiplication)

## Project Structure

```
calc-solver/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── requirements.txt     # Python dependencies
│   ├── routers/
│      ├── __init__.py
│      ├── derivatives.py   # Derivative calculation endpoints
│      └── integrals.py     # Integral calculation endpoints
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Calculator page components
│   │   ├── services/       # API service layer
│   │   └── App.tsx         # Main application component
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

##  Development Workflow

1. **Start the backend** (runs on port 8000)
2. **Start the frontend** (runs on port 5173)
3. **Open your browser** to `http://localhost:5173`
4. **Begin calculating** derivatives and integrals

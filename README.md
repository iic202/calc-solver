# Solver (Derivative & Integral)

This is a simple derivative and integral calculator developed using
- Pyhton, FastAPI, SymPy for the backend
- React for the frontend

### Backend

For the backend you can start it by running the following command.
```
python3 backend/main.py
```
After starting the backend, you can test it independently from the frontend by going to the following website. You can see the specifics on why is this on backend/main.py.
```
http://localhost:8000/docs
```
You can also make requests to the backend using curl. Underneath you can see an example of a curl request to solve a derivative.
```
curl -X 'POST' \
  'http://localhost:8000/calculus/derivative' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "expression": "x**2",
  "variable": "x",
  "order": 1
}'
```

### Frontend
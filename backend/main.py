import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import dervatives
from routers import integrals
from routers import limits

app = FastAPI()

# Since I am running the front end using Vite on port 5173
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dervatives.router, prefix="/calculus", tags=["derivatives"])
app.include_router(integrals.router, prefix="/calculus", tags=["integrals"])
app.include_router(limits.router, prefix="/calculus", tags=["limits"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Solver API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)




from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from crud import get_cafes, create_cafe, update_cafe_details, get_employees, create_employee, update_employee_details, remove_cafe, remove_employee
from models import Cafe, Employee, UpdateEmployee

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

"""
GET endpoints
"""
@app.get("/")
async def read_root():
    return {"Hello": "World"}

# Get cafes in a particular location
@app.get("/cafes")
async def read_cafes(location: str = None):
    return await get_cafes(location)

# Get employees in a particular cafe
@app.get("/employees")
async def read_employees(cafe_id: str = None):
    return await get_employees(cafe_id)

"""
POST endpoints
"""
# Create a new cafe
@app.post("/cafe")
async def add_cafe(cafe: Cafe):
    return await create_cafe(cafe)

# Create a new employee
@app.post("/employee")
async def add_employee(employee: Employee):
    try:
        output = await create_employee(employee)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return output

"""
PUT endpoints
"""
# Update cafe details
@app.put("/cafe")
async def update_cafe(cafe: Cafe):
    return await update_cafe_details(cafe)

# Update employees details
@app.put("/employee")
async def update_employee(employee: UpdateEmployee):
    try:
        output = await update_employee_details(employee)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return output

"""
Delete endpoints
"""
@app.delete("/cafe")
async def delete_cafe(cafe_id: str):
    return await remove_cafe(cafe_id)

@app.delete("/employee")
async def delete_employee(employee_id: str):
    return await remove_employee(employee_id)

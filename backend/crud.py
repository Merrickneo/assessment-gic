from database import cafes_collection, employees_collection
from models import Cafe, Employee
from datetime import datetime

def object_id_to_str(document):
    """Helper function to convert ObjectId to string."""
    document["_id"] = str(document["_id"])
    return document

def process_days_worked(document):
    """Helper function to process days worked."""
    for item in document:
        item["days_worked"] = datetime.utcnow().day - item["start_date"].day
    return document


'''
GET endpoints
'''
# Get cafes in a particular location
# if invalid location is provided, return empty list
async def get_cafes(location: str = None):
    if location:
        cafes = await cafes_collection.find({"location": location}).to_list(100)
    else:
        cafes = await cafes_collection.find().to_list(100)
    return [object_id_to_str(cafe) for cafe in cafes]

# Get employees in a particular cafe
async def get_employees(cafe_id: str = None):
    if cafe_id:
        employees = await employees_collection.find({"cafe_id": cafe_id}).to_list(100)
    else:
        employees = await employees_collection.find().to_list(100)
    process_days_worked(employees)
    return [object_id_to_str(employee) for employee in employees]

"""
POST endpoints
"""
# Create a new cafe
async def create_cafe(cafe: Cafe):
    # cafe is a Pydantic model, so we need to convert it to a dictionary
    cafe = await cafes_collection.insert_one(cafe.dict())
    new_cafe = await cafes_collection.find_one({"_id": cafe.inserted_id})
    return [object_id_to_str(new_cafe)]

# Create a new employee
async def create_employee(employee: Employee):
    # Check if the employee is already working in a cafe
    existing_employee = await employees_collection.find_one({"_id": employee.id})
    if existing_employee and existing_employee["cafe_id"]:
        raise ValueError("This employee is already assigned to a café.")
    
    # if the employee is not assigned to a cafe, check if the cafe exists
    cafe = await cafes_collection.find_one({"id": employee.cafe_id})
    if not cafe:
        raise ValueError("The café you are trying to assign this employee to does not exist.")
    
    # If no existing employee or no café assignment, proceed with creation
    employee = await employees_collection.insert_one(employee.dict())
    new_employee = await employees_collection.find_one({"_id": employee.inserted_id})
    return [object_id_to_str(new_employee)]

"""
PUT endpoints
"""
async def update_cafe_details(cafe: Cafe):
    await cafes_collection.update_one({"id": cafe.id}, {"$set": cafe.dict()})
    updated_cafe = await cafes_collection.find_one({"id": cafe.id})
    return updated_cafe

async def update_employee_details(employee: Employee):
    # Check if the employee is already assigned to a different cafe
    existing_employee = await employees_collection.find_one({"id": employee.id})
    if existing_employee and existing_employee["cafe_id"] != employee.cafe_id:
        raise ValueError("This employee is already assigned to a different café.")
    
    # Proceed with updating the employee's information
    await employees_collection.update_one({"_id": employee.id}, {"$set": employee.dict()})
    updated_employee = await employees_collection.find_one({"_id": employee.id})


"""
DELETE endpoints
"""
# Delete a cafe based on its id
async def delete_cafe(cafe_id: str):
    await cafes_collection.delete_one({"_id": cafe.id})
    # delete all employees associated with the cafe
    await employees_collection.delete_many({"cafe_id": cafe.id})
    return True

# Delete an employee based on their id
async def delete_employee(employee_id: str):
    await employees_collection.delete_one({"_id": employee.id})
    return True

# print(create_cafe(Cafe(id="UI100000", name="Cafe 1", description="A nice cafe", location="Singapore")))

from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional
from datetime import datetime

class Cafe(BaseModel):
    id: str
    name: str
    description: str
    location: str
    logo: Optional[str] = None

class Employee(BaseModel):
    id: str
    name: str
    email_address: str
    phone_number: str
    email_address: str
    days_worked: Optional[int] = Field(default=None)
    cafe_id: str
    cafe: str = ""
    gender: str
    start_date: datetime = Field(default_factory=datetime.utcnow)

class UpdateEmployee(BaseModel):
    _id: str
    id: str
    name: str
    email_address: str
    phone_number: str
    cafe_id: str
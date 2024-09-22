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
    days_worked: int
    cafe_id: str = ""
    start_date: datetime = Field(default_factory=datetime.utcnow)

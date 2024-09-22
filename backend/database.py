from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

client = AsyncIOMotorClient(DATABASE_URL)
database = client["gic"]

# Access collections
cafes_collection = database.get_collection("cafe")
employees_collection = database.get_collection("employees")

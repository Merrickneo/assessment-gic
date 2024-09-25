# Use an official Python runtime as a base image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install any dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose the port your FastAPI app will run on
EXPOSE 8000

# Start the Uvicorn server
CMD ["uvicorn", "routes:app", "--host", "0.0.0.0", "--port", "8000"]

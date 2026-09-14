# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install uv and use pyproject.toml for dependencies
COPY pyproject.toml .
COPY uv.lock .
RUN pip install --no-cache-dir uv && uv sync

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Command to run the application
CMD [".venv/bin/python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
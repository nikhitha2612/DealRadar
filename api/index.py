import os
import sys

# Add the backend directory to the path so main can be imported
backend_dir = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.append(backend_dir)

from main import app

# Export the FastAPI instance as 'app' for Vercel
# The serverless function will handle routing for /api/*

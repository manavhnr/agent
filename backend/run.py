import uvicorn
import sys
import os

# Add the correct path to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

if __name__ == "__main__":
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True) 
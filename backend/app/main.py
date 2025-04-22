from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .agent import ResearcherAgent

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Researcher Agent
agent = ResearcherAgent()

class Query(BaseModel):
    text: str
    context: str = ""

@app.post("/api/query")
async def process_query(query: Query):
    try:
        response = await agent.process_query(query.text, query.context)
        return {"response": response}
    except Exception as e:
        print(f"Error in API: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"} 
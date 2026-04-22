"""
Jimi (FastAPI)

This file handles:
- receiving requests from frontend
- sending messages to AI logic module (Jacob)
- returning structured responses
"""
import sys
import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Add project root to Python path so we can import AI module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import your AI logic (ensure folder names match your project structure)
from Jacob_AI_Logic.ai_logic import handle_message

app = FastAPI()

# CORS Middleware (Allows React to talk to FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model (Matches frontend body payload)
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    """
    Receives message from frontend, sends it to AI logic, returns response.
    """
    # request.message extracts the string from the JSON object
    result = handle_message(request.message)
    return result

@app.get("/")
def root():
    return {
        "status": "Backend is running",
        "message": "Use /chat endpoint to talk to the bot"
    }

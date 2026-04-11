"""
Jimi (FastAPI)

This file handles:
- receiving requests from frontend
- sending messages to AI logic module (Jacob)
- returning structured responses
"""


# FIX: allow sibling folder imports


import sys
import os

# Add project root to Python path so we can import AI module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))



# FastAPI setup


from fastapi import FastAPI
from pydantic import BaseModel

# Import Jacob's AI logic 
from Jacob_AI_Logic.ai_logic import handle_message


app = FastAPI()



# Request model (from frontend)

class ChatRequest(BaseModel):
    message: str



# Main chat endpoint


@app.post("/chat")
def chat(request: ChatRequest):
    """
    Receives message from frontend,
    sends it to AI logic,
    returns response.
    """
    result = handle_message(request.message)
    return result



# Basic test route


@app.get("/")
def root():
    return {
        "status": "Backend is running",
        "message": "Use /chat endpoint to talk to the bot"
    }

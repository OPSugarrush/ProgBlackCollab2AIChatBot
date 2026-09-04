"""FastAPI entry point for the chatbot.

The frontend sends a message to ``POST /chat``.  This module validates the
request, passes the message to ``AI_Logic``, and returns a JSON response.
"""

import sys
from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Allow ``uvicorn main:app --reload`` to work when started inside Backend.
PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# The package name matches the folder in this repository.
from AI_Logic.ai_logic import handle_message

app = FastAPI(title="AI Chatbot API", version="1.0.0")

# Permit the Vite development server to call the local API.  Keeping this
# list explicit is safer than allowing arbitrary websites to make requests.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:2999", "http://127.0.0.1:2999"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    """The JSON body accepted by the chat endpoint."""

    message: str


@app.post("/chat")
def chat(request: ChatRequest) -> dict[str, str]:
    """Generate a chatbot reply for a non-empty user message."""
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="A message is required.")

    return handle_message(request.message)


@app.get("/")
def root() -> dict[str, str]:
    """Provide a small health-check response for local development."""
    return {
        "status": "Backend is running",
        "message": "Use /chat endpoint to talk to the bot"
    }

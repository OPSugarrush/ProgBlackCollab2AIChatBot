from fastapi import FastAPI
from pydantic import BaseModel
from ai_logic import handle_message

app = FastAPI()

# This defines what data we expect from frontend
class ChatRequest(BaseModel):
    message: str

# This is the endpoint frontend will call
@app.post("/chat")
def chat(request: ChatRequest):
    result = handle_message(request.message)
    return result
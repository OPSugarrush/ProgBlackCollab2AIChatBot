"""Conversation handling and Gemini integration for the chatbot.

The module keeps a short in-memory conversation history, answers a few simple
messages locally, and uses Gemini for all other questions.  ``handle_message``
is the public function used by the FastAPI application.
"""

import os
from pathlib import Path

import google.generativeai as genai
from dotenv import load_dotenv

# Look for a project-level .env file first, so the API key is available whether
# the backend is started from the repository root or from the Backend folder.
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

# This history is deliberately small because it is shared by the running local
# demo. A production app would store separate histories for each user/session.
history: list[dict[str, str]] = []
MAX_HISTORY = 3

def process_input(user_input: str) -> str:
    """Return trimmed, case-normalised text for matching and prompting."""
    if not isinstance(user_input, str):
        return ""

    return user_input.strip().lower()

def build_prompt(user_input: str) -> str:
    """Build the prompt passed to Gemini, including recent context."""
    conversation = ["You are a helpful, concise assistant."]

    for entry in history:
        conversation.extend((f"User: {entry['user']}", f"Assistant: {entry['bot']}"))

    conversation.extend((f"User: {user_input}", "Assistant:"))
    return "\n".join(conversation)

def generate_response(user_input: str) -> str:
    """Create a reply, then save the user/reply pair in short-term memory."""
    processed_input = process_input(user_input)
    prompt = build_prompt(processed_input)

    if "hello" in processed_input:
        response = "Hi! How can I help you?"
    elif "how are you" in processed_input:
        response = "I'm just a simple chatbot, but I'm working fine!"
    elif "bye" in processed_input:
        response = "Goodbye! See you later."
    elif "what did i just say" in processed_input:
        if history:
            response = f"You previously said: '{history[-1]['user']}'"
        else:
            response = "I don't have any previous messages stored yet."
    else:
        try:
            api_key = os.environ.get("GEMINI_API_KEY")
            if not api_key:
                raise ValueError("GEMINI_API_KEY is not configured")

            # Flash is a fast model that is suitable for this local chat demo.
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel("gemini-2.5-flash")
            ai_response = model.generate_content(prompt)
            response = ai_response.text or "I couldn't generate a response just now."
        except Exception as error:
            # Keep technical details in the server terminal, not the UI.
            print(f"Gemini request failed: {error}")
            response = "I'm sorry, I couldn't reach the AI service just now."

    history.append({"user": processed_input, "bot": response})
    del history[:-MAX_HISTORY]  # Retain only the most recent exchanges.

    return response

def handle_message(user_input: str) -> dict[str, str]:
    """Return a JSON-friendly response for the backend endpoint."""
    return {"response": generate_response(user_input)}

def run_chat():
    """Run a small command-line chat for testing without the web interface."""

    print("Simple Chatbot (type 'exit' to quit)\n")

    while True:
        user_message = input("You: ")

        if user_message.lower() == "exit":
            print("Bot: Goodbye!")
            break

        result = handle_message(user_message)

        print(f"Bot: {result['response']}")

if __name__ == "__main__":
    run_chat()

# Jacob Deheer-Graham
"""
This part handles the core AI logic for the chatbot system.

Role in project:
- Receives user input
- Processes it into a structured format
- Builds a prompt
- Generates a response (rule-based for now)

This file is now designed to be imported into the FastAPI backend by Jimi,
where handle_message() will be called inside the /chat endpoint.

Progression from previous version:
- Improved structure for backend integration
- Added clearer input/output handling
- Introduced basic prompt instruction structure

Future expansions:
- Add simple conversation memory (last 2–3 messages)
- Improve prompt structure using history
- Refine response logic for better coverage
"""

# 1: Input Processing

def process_input(user_input: str) -> str:
    """
    Cleans and standardises user input.

    Why this exists:
    - Separates preprocessing from response logic
    - Makes system easier to expand later

    Current behaviour:
    - Converts text to lowercase
    - Removes extra whitespace
    - Basic type safety

    Future:
    - Could remove punctuation
    - Could handle commands
    """

    if not isinstance(user_input, str):
        return ""

    cleaned = user_input.strip().lower()

    return cleaned


# 2: Prompt Building

def build_prompt(user_input: str) -> str:
    """
    Converts processed input into a structured prompt format.

    Why this exists:
    - Introduces prompt engineering concept
    - Mimics how real AI systems structure input

    Structure:
    - Basic system instruction
    - User message
    - AI response placeholder

    Example output:
    You are a helpful assistant.
    User: hello
    AI:
    """

    system_instruction = "You are a helpful assistant."

    prompt = (
        f"{system_instruction}\n"
        f"User: {user_input}\n"
        f"AI:"
    )

    return prompt


# 3: Response Generation

def generate_response(user_input: str) -> str:
    """
    Main function that generates a chatbot response.

    This function is used by:
    - FastAPI backend (via handle_message)

    Flow:
    user input → processed → prompt → response
    """

    # Step 1: Process input
    processed_input = process_input(user_input)

    # Step 2: Build prompt (structure for future expansion)
    prompt = build_prompt(processed_input)

    # DEBUG (optional)
    # print("DEBUG PROMPT:", prompt)

    # Step 3: Generate response (simple rule-based system)
    if "hello" in processed_input:
        response = "Hi! How can I help you?"

    elif "how are you" in processed_input:
        response = "I'm just a simple chatbot, but I'm working fine!"

    elif "bye" in processed_input:
        response = "Goodbye! See you later."

    else:
        response = "I'm not sure how to respond to that yet."

    return response


# 4: Backend Interface (NEW)

def handle_message(user_input: str) -> dict:
    """
    Handles a message and returns a structured response.

    Why this exists:
    - Acts as the interface between backend and AI logic
    - Returns data in JSON-friendly format

    This is the function Jimi will call in FastAPI.
    """

    response_text = generate_response(user_input)

    return {
        "response": response_text
    }


# 5: Local Test System

def run_chat():
    """
    Runs a simple terminal-based chatbot.

    Purpose:
    - Allows independent testing without backend/frontend
    - Now reflects how backend will use the system

    How to use:
    python ai_logic.py
    """

    print("Simple Chatbot (type 'exit' to quit)\n")

    while True:
        user_message = input("You: ")

        if user_message.lower() == "exit":
            print("Bot: Goodbye!")
            break

        result = handle_message(user_message)

        print(f"Bot: {result['response']}")


# Entry Point

if __name__ == "__main__":
    run_chat()
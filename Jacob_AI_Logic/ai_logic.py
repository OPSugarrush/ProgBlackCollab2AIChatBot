#Jacob Deheer-Graham
"""

This module handles the core AI logic for the chatbot system.

Role in project:
- Receives user input
- Processes it into a structured format
- Builds a prompt
- Generates a response (rule-based for now)

This file will later be imported into the FastAPI backend by Jimi,
where generate_response() will be called inside an API endpoint.

Future expansions:
- Add conversation memory
- Improve prompt structure
- Replace rule-based logic with more advanced response generation
"""


#1: Input Processing

def process_input(user_input):
    """
    Cleans and standardises user input.

    Why this exists:
    - Separates preprocessing from response logic
    - Makes system easier to expand later

    Current behaviour:
    - Converts text to lowercase

    Future:
    - Could remove punctuation
    - Could handle commands
    """
    return user_input.strip().lower()



#2: Prompt Building


def build_prompt(user_input):
    """
    Converts processed input into a structured prompt format.

    Why this exists:
    - Introduces prompt engineering concept
    - Mimics how real AI systems structure input

    Example output:
    User: hello
    AI:
    """
    prompt = f"User: {user_input}\nAI:"
    return prompt

#3: Response Generation

def generate_response(user_input):
    """
    Main function that generates a chatbot response.

    This function will be used by:
    - FastAPI backend
    - Called inside the /chat endpoint

    Flow:
    user input → processed → prompt → response
    """

    #Step 1: Process input
    processed_input = process_input(user_input)

    #Step 2: Build prompt (for structure, even if not fully used yet)
    prompt = build_prompt(processed_input)

    # Potenttial future DEBUG
    # print("DEBUG PROMPT:", prompt)

    # Step 3: Generate response (simple rule-based system for now)
    if "hello" in processed_input:
        return "Hi! How can I help you?"

    elif "how are you" in processed_input:
        return "I'm just a simple chatbot, but I'm working fine!"

    elif "bye" in processed_input:
        return "Goodbye! See you later."

    else:
        return "I'm not sure how to respond to that yet."



#4: Formatting (Might remove later)


def format_response(response):
    """
    Formats chatbot output.

    Why this exists:
    - Separates presentation from logic
    - Allows reuse in frontend/backend

    Note:
    - Frontend coder (Joshua) may override this later
    """

    return f"Bot: {response}"



#5: Local Test System

def run_chat():
    """
    Runs a simple terminal-based chatbot.

    Purpose:
    - Allows independent testing without backend/frontend
    - Demonstrates working system temp

    How to use:
    Run this file directly:
    python ai_logic.py
    """

    print("Simple Chatbot (type 'exit' to quit)\n")

    while True:
        user_message = input("You: ")

        if user_message.lower() == "exit":
            print("Bot: Goodbye!")
            break

        response = generate_response(user_message)
        formatted = format_response(response)

        print(formatted)



#Entry Point:


if __name__ == "__main__":
    run_chat()
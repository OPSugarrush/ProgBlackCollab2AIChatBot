# ProgBlackCollab2AIChatBot
JOSH FOR BACKEND TO FRONT END USE POST REQUEST TO "http://127.0.0.1:8000/chat" and use a JSON file to send msgs and data.

For things to function:

-Clone repo
-Create environment: conda create --name chatbot python=3.10
-Activate environment: conda activate chatbot
-Install FastAPI (backend framework): pip install fastapi
-Install Uvicorn (server to run FastAPI): pip install uvicorn
-Install dotenv (for API key loading): pip install python-dotenv
-Install Google Generative AI (for AI fallback): pip install -google-generativeai
-Create .env file in project root and add: -GEMINI_API_KEY=your_api_key_here
-Ensure __init__.py exists in Jacob_AI_Logic folder (for imports)
-Run backend server: uvicorn main:app --reload


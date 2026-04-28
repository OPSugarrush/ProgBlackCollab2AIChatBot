# ProgBlackCollab2AIChatBot
## For things to function:
* Clone repo

### In Anaconda command prompt:
1. Create environment: conda create --name chatbot python=3.10
2. Activate environment: conda activate chatbot
3. Install FastAPI (backend framework): pip install fastapi
4. Install Uvicorn (server to run FastAPI): pip install uvicorn
5. Install dotenv (for API key loading): pip install python-dotenv
6. Install Google Generative AI (for AI fallback): pip install -google-generativeai

### To get API key: 
* Go to Google AI Studio and create an API key

### Visual Studio code
1. Create .env file in project root and add: **GEMINI_API_KEY=your_api_key_here**
2. Ensure __init__.py exists in Jacob_AI_Logic folder (for imports)
3. Press Ctrl+Shift+P to open **Command Pallete** and search "Python: Select Interpreter" and find "chatbot". Click on **"chatbot"**
4. Run backend server in Visual Studio Code terminal (Ctrl+Shift+`): uvicorn main:app --reload **(first change directory to "Jimi_Backend" in terminal)**
5. Open new terminal, change directory to **"Joshua_AI_Interface"** and then run server for frontend with **npm run dev**


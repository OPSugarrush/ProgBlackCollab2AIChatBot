# AI Chatbot

A team-developed chatbot application combining a Python backend with a React-based web interface. The system uses the Gemini API to provide AI functionality and was developed collaboratively using Git/GitHub.

## Project Structure

The application is divided into several components covering the frontend, backend API and AI conversation logic.

Main work on each section for final project iteration: 

* **`AI_Logic`** - AI conversation logic, prompt processing and Gemini API integration
* **`Backend`** -  FastAPI backend and API integration
* **`AI_Interface`** -  React-based frontend interface

Development was carried out collaboratively, with team members contributing across different parts of the application, including frontend development and integration between system components.

## Technologies

**Python, Gemini API, FastAPI, React, JavaScript, HTML/CSS, Git/GitHub**

## Running the Project

### 1. Clone the repository

Clone the repository and open it in Visual Studio Code.

### 2. Set up the Python environment

Open the integrated Visual Studio Code terminal in the project root. Use
Python 3.10 or 3.11 for this project; the current Gemini package may not yet
support newer Python releases. Create and activate a standard virtual
environment:

```bash
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

In Visual Studio Code, select the `.venv` interpreter. The virtual
environment is local to this project and is excluded from Git. If `py -3.11`
is unavailable, install Python 3.11 and reopen the VS Code terminal first.

### 3. Configure the Gemini API

Create an API key through Google AI Studio.

Create a `.env` file in the project root and add:

```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Start the backend

The included `__init__.py` files allow the backend to import `AI_Logic`.
From the project root, run:

```bash
python -m uvicorn Backend.main:app --reload
```

### 5. Start the frontend

Open a new terminal, change directory to `AI_Interface`, and run:

```bash
cd AI_Interface
npm install
npm run dev
```

The frontend and backend can then be accessed through their locally hosted development servers.

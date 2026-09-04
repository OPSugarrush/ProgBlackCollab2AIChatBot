# AI Chatbot

A team-developed chatbot application combining a Python backend with a React-based web interface. The system uses the Gemini API to provide AI functionality and was developed collaboratively using Git/GitHub.

## Project Structure

The application is divided into several components covering the frontend, backend API and AI conversation logic.

Main work on each section for final project iteration: 

* **`Jacob_AI_Logic`** – AI conversation logic, prompt processing and Gemini API integration
* **`Jimi_Backend`** – FastAPI backend and API integration
* **`Joshua_AI_Interface`** – React-based frontend interface

Development was carried out collaboratively, with team members contributing across different parts of the application, including frontend development and integration between system components.

## Technologies

**Python, Gemini API, FastAPI, React, JavaScript, HTML/CSS, Git/GitHub**

## Running the Project

### 1. Clone the repository

Clone the repository and open it in Visual Studio Code.

### 2. Set up the Python environment

Using an Anaconda command prompt:

```bash
conda create --name chatbot python=3.10
conda activate chatbot
pip install fastapi
pip install uvicorn
pip install python-dotenv
pip install google-generativeai
```

### 3. Configure the Gemini API

Create an API key through Google AI Studio.

Create a `.env` file in the project root and add:

```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Start the backend

Ensure `__init__.py` exists in the `Jacob_AI_Logic` folder for imports.

In the Visual Studio Code terminal, change directory to `Jimi_Backend` and run:

```bash
uvicorn main:app --reload
```

### 5. Start the frontend

Open a new terminal, change directory to `Joshua_AI_Interface`, and run:

```bash
npm run dev
```

The frontend and backend can then be accessed through their locally hosted development servers.

# Step8Up Knowledge Base platform: React Frontend with Django Backend

This repository contains a full-stack application with a React frontend (built using Vite) and a Django backend. The frontend is located in the `frontend` folder, and the backend is in the `backend` folder.

Follow the steps below to set up and run the application on your local machine.

---

## Prerequisites

Make sure you have the following installed on your system:

- **Python 3.8+** (for Django)
- **Node.js 16+** and **npm** or **yarn** (for Vite)
- **pip** and **virtualenv** (Python package manager and virtual environment tool)

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/SBC-Sep24/step8up-knowledge-base.git
cd SBC-Sep24/step8up-knowledge-base
```

### Step 2: Set Up the Django Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Create a virtual environment and activate it:

```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

3. Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

4. Apply database migrations:

```bash
python manage.py migrate
```

5. Start the Django development server:

```bash
python manage.py runserver
```

The Django backend will now be running at http://127.0.0.1:8000/.

### Step 3: Set Up the React Frontend

1. Open a new terminal window and navigate to the frontend folder:

```bash
cd frontend
```

2. Install frontend dependencies using npm or yarn:

```bash
npm install  # or yarn
```

3. Start the Vite development server:

```bash
npm run dev  # or yarn dev
```

The React frontend will now be running. Vite will provide a URL, typically http://127.0.0.1:5173/ or similar.

## Running the Full Stack

- Frontend: Open the Vite server URL in your browser to view the React application.
- Backend: Ensure the Django server is running at http://127.0.0.1:8000/.

The React app can communicate with the Django backend by making API calls to http://127.0.0.1:8000/.

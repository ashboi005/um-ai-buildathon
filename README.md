# Upskill Quiz Maker

**Team:** Cracked Nerds

## Deployed Live Website: https://upskill-quiz-maker.vercel.app
## Backend API Documentation: https://um-ai-buildathon.onrender.com/apidocs

## Project Overview

Upskill Quiz Maker is an intelligent quiz generation platform designed to help users assess and improve their knowledge on various topics. Our application dynamically generates multiple-choice quizzes based on user-selected topics, difficulty levels, and the number of questions requested. The project aims to revolutionize test preparation by providing personalized and engaging quizzes.

## Team Members

- **Ashwath Soni** – Backend Developer
- **Harnoor Singh Arora** – Frontend Developer

## Technology Stack

- **Backend:** Flask  
  - Deployed on Render  
  - Features: RESTful API, SQLAlchemy ORM, Flask-CORS, and integration with external AI (Google Gemini).
- **Frontend:** Next.js  
  - Deployed on Vercel  
  - Provides a modern, responsive interface for user registration, login, and quiz generation.

## Deployment

- **Backend:** Render  
  - The Flask backend is containerized and deployed on Render using Gunicorn with a custom configuration.
- **Frontend:** Vercel  
  - The Next.js frontend is deployed on Vercel, ensuring a fast and scalable user experience.

## Features

- **User Authentication:**  
  - Basic login system with registration and secure password hashing (using Flask and Werkzeug).
- **Dynamic Quiz Generation:**  
  - Integration with the Google Gemini API to generate customized quizzes based on user input.
- **Quiz Management:**  
  - Users can view all quizzes they’ve generated.

## Getting Started

### Prerequisites

- **Backend:**  
  - Python 3.10+
  - Virtual Environment (venv)
  - Required dependencies listed in `requirements.txt`
- **Frontend:**  
  - Node.js (for Next.js)
  - Package manager (npm or yarn)

### Running the Backend Locally

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the backend directory:
   ```bash
   cd um-ai-buildathon/backend
   ```
3. Create and activate the virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the Flask app:
   ```bash
   python app.py
   ```

### Running the Frontend Locally

1. Navigate to the frontend directory (assuming it’s in a separate folder):
   ```bash
   cd <frontend-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js app:
   ```bash
   npm run dev
   ```

## Environment Variables

For the backend, create a `.env` file in the backend directory with the following variables:

```env
SQLALCHEMY_DATABASE_URI=postgresql://username:password@host:5432/dbname?sslmode=require
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## License

This project is licensed under the MIT License.

---

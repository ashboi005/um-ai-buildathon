import os
import google.generativeai as genai

def generate_test(topic, difficulty, num_questions):
    api_key = os.getenv("GOOGLE_GEMINI_API_KEY")
    if not api_key:
        raise EnvironmentError("GOOGLE_GEMINI_API_KEY is not set in the environment variables.")

    genai.configure(api_key=api_key)

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = (
            f"Generate an MCQ test on the topic '{topic}' with {num_questions} questions at a {difficulty} difficulty level. "
            "Each question should be multiple choice with 4 options. Provide the output as a JSON object with a key 'questions' that contains a list of questions. "
            "Each question should be a dictionary with the keys 'question', 'options' (a list of 4 options), and 'answer' (the correct option). "
            "Ensure the JSON is properly formatted."
        )
        response = model.generate_content(prompt)
        print(response.text)
        return response.text
    except Exception as e:
        print(f"Error during test generation: {e}")
        raise

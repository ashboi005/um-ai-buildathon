import os
import google.generativeai as genai

def demo(text):
    api_key = os.getenv("GOOGLE_GEMINI_API_KEY")
    if not api_key:
        raise EnvironmentError("GOOGLE_GEMINI_API_KEY is not set in the environment variables.")

    genai.configure(api_key=api_key)

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")  
        response = model.generate_content(f"Analyze the following text:\n\n{text}")

        return response.text
    except Exception as e:
        print(f"Error during text summarization: {e}")
        raise



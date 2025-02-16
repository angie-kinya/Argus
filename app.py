from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# Set up OpenAI API key
openai.api_key = "your-openai-key"

@app.route('/review', methods=['POST'])
def review_code():
    data = request.json
    code = data.get('code', '')
    language = data.get('language', 'python') # Default to Python
    logging.debug(f"Received code: {code}")

    if not code:
        return jsonify({'error': 'No code provided'}), 400
    
    # Call OpenAI's code review model
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use the chat model
        messages=[
            {"role": "system", "content": "You are a helpful code review assistant."},
            {"role": "user", "content": f"Review the following code and suggest improvements:\n\n{code}\n\nSuggestions:"}
        ],
        max_tokens=500,
        temperature=0.5
    )

    suggestions = response.choices[0].message['content'].strip()
    logging.debug(f"Suggestions: {suggestions}")
    return jsonify({"suggestions": suggestions})

if __name__ == '__main__':
    app.run(debug=True)
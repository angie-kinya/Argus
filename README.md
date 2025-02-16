# Argus Code Review Assistant

The **Argus Code Review Assistant** is an AI-powered tool that helps developers review their code and receive suggestions for improvements. It uses OpenAI's GPT model to analyze code and provide actionable feedback on readability, performance, security, and best practices.

---

## Features

- **Code Analysis**: Detects potential bugs, security vulnerabilities, and inefficiencies.
- **Improvement Suggestions**: Provides recommendations for refactoring, performance optimization, and adherence to coding standards.
- **Multi-Language Support**: Configured to work with Python, Java, Dart, and Golang.
- **User-Friendly Interface**: Simple and intuitive web interface for submitting code and viewing suggestions.
- **Review History**: Saves past code reviews for easy reference.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **AI Model**: OpenAI GPT-3.5 Turbo
- **Database**: Local storage (for review history)

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (for the frontend)
- Python 3.9+ (for the backend)
- OpenAI API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/angie-kinya/Argus.git
   ```

2. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
    Set up your OpenAI API key:
    - Create an account on the OpenAI website.
    - Go to the API keys page and create a new API key.
    - Set the `OPENAI_API_KEY` environment variable (.env) to your API key.- Remember to put the `.env` file to `.gitignore.`
    - You can do this by running the following command in your terminal:
    ```bash
    export OPENAI_API_KEY="YOUR_API_KEY"
    ```
    Set up the frontend:
    ```bash
    cd argus-frontend
    npm install

3. **Run the Application**:
    Start the backend:
    ```bash
    python app.py
    ```
    Start the frontend (do this in the frontend directory):
    ```bash
    npm start
    ```

## Usage

1. **Select a Language**:
   - Choose the programming language of your code from the dropdown menu.

2. **Paste Your Code**:
   - Paste your code into the code editor.

3. **Submit for Review**:
   - Click the **Review Code** button to submit your code for analysis.

4. **View Suggestions**:
   - The AI-powered suggestions will be displayed below the code editor.

5. **Review History**:
   - Past reviews are saved and can be viewed in the **Review History** section.

---

## Project Structure
```bash
code-review-assistant/
├── ├── app.py                # Flask backend
│   ├── requirements.txt      # Python dependencies
│   └── start.sh             # Script to run the backend
├── argus-frontend/
│   ├── public/               # Static assets
│   ├── src/                  # React components
│   ├── package.json          # Node.js dependencies
└── README.md                 # Project documentation
```

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your fork.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- OpenAI for providing the GPT-3.5 Turbo model.
- The React and Flask communities for their excellent documentation and tools.

---

## Contact

For questions or feedback, feel free to reach out:

- **Email** - [angiekinya670@gmail.com](mailto:your.email@example.com)
- **Project Link**: [https://argus-assistant.vercel.app/](https://argus-assistant.vercel.app/)
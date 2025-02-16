import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python'; // Python mode
import 'ace-builds/src-noconflict/mode-java'; // Java mode
import 'ace-builds/src-noconflict/mode-dart'; // Dart mode
import 'ace-builds/src-noconflict/mode-dockerfile'; // Dockerfile mode
import 'ace-builds/src-noconflict/theme-dracula'; // Dracula theme
import 'ace-builds/src-noconflict/theme-chrome'; // Light theme
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('python'); // default language
  const [history, setHistory] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Theme state

  // Load history from local storage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('codeReviewHistory')) || [];
    setHistory(savedHistory);
  }, []);

  // Save history to lacal storage whenever it changes
  useEffect(() => {
    localStorage.setItem('codeReviewHistory', JSON.stringify(history));
  }, [history]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/review', { code, language });
      const newSuggestion = response.data.suggestions;
      setSuggestions(newSuggestion);

      // Add the current review to history
      const newHistoryItem = {
        code,
        language,
        suggestions: newSuggestion,
        timestamp: new Date().toLocaleString(),
      };
      setHistory([newHistoryItem, ...history]); // Add the new item to the beginning of the history array
    } catch (err) {
      setError('An error occurred while fetching suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]); // Clear the history
    localStorage.removeItem('codeReviewHistory'); // Clear the history from local storage
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <h1>Argus Code Review Assistant</h1>
      <button onClick={toggleTheme} className="theme-toggle-button">
        {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </button>
      <div className="code-input">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-selector"
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="dart">Dart</option>
          <option value="dockerfile">Dockerfile</option>
        </select>
        <AceEditor
          mode={language} // Set the language mode
          theme={isDarkTheme ? 'dracula' : 'chrome'} // Set the theme dynamically
          value={code}
          onChange={setCode} // Update the code state
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          width="80%"
          height="400px"
          fontSize={14}
          showPrintMargin={false}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Reviewing...' : 'Review Code'}
      </button>
      {error && <p className="error">{error}</p>}
      <h2>Suggestions:</h2>
      <pre>{suggestions}</pre>

      <div className="history-section">
        <h2>Review History</h2>
        <button onClick={clearHistory} className="clear-history-button">Clear History</button>
        {history.length === 0 ? (
          <p>No history yet. Submit some code to see past reviews!</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="history-item">
              <h3>Review on {item.timestamp}</h3>
              <p><strong>Language:</strong> {item.language}</p>
              <AceEditor
                mode={item.language}
                theme={isDarkTheme ? 'dracula' : 'chrome'}
                value={item.code}
                readOnly // Make the editor read-only
                name={`history-editor-${index}`}
                editorProps={{ $blockScrolling: true }}
                width="100%"
                height="200px"
                fontSize={14}
                showPrintMargin={false}
                setOptions={{
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
              <h4>Suggestions:</h4>
              <pre>{item.suggestions}</pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
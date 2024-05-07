/* eslint-disable no-unreachable */
import React, { useState, useEffect } from 'react';
import './App.css';
const App = () => {
  const [messages, setMessages] = useState([
    { content: "You are a helpful AI assistant. Reply in markdown format." },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const modelUrl = "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q2_K.gguf";

    const downloadModel = async () => {
      try {
        setLoading(true);
        const worker = new Worker(new URL('./worker.js', import.meta.url));
        worker.postMessage(modelUrl);
        worker.onmessage = (event) => {
          console.log('Model downloaded:', event.data);
        };
      } catch (error) {
        console.error("Error downloading model:", error);
      } finally {
        setLoading(false);
      }
    };

    downloadModel();
    selectLlm();
    initMessages();
  }, []);

  const initPage = () => {
    document.title = "Personal Chatbot";
  };

  const selectLlm = () => {
    try {
      // Simulating LlamaCPP instantiation
      // Note: Replace this with actual logic using your dependencies
      return {};
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error("Error selecting LlamaCPP:", error);
      return null;
    }
  };

  const initMessages = () => {
    const initialMessages = [
      { content: "You are a helpful AI assistant. Reply in markdown format." },
    ];

    setMessages(initialMessages);
  };

  const getAnswer = (llm, messages) => {
    try {
      // Simulating LlamaCPP complete method
      return { text: 'Simulated response' };
    } catch (error) {
      console.error("Error getting answer:", error);
      return { text: 'Error in response' };
    }
  };

  const handleUserInput = (userInput) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: userInput },
      { content: 'Bot is typing ...' }, // Simulating bot typing
    ]);

    const answer = getAnswer(selectLlm(), messages);
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: answer.text },
    ]);
  };

  initPage();

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Input your question!"
        onChange={(e) => handleUserInput(e.target.value)}
      />
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`message ${index % 2 === 0 ? 'user-message' : 'bot-message'}`}
          >
            {message.content}
          </div>
        ))
      )}
    </div>
  );
};

export default App;

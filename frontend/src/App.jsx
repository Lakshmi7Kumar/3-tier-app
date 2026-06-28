import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Fetch data from backend on page load
  useEffect(() => {
    fetch('http://localhost:5000/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  // Post new data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    const res = await fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    const newData = await res.json();
    setMessages([...messages, newData]);
    setInput('');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Three-Tier Architecture Test</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message to save to Database..." 
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>Save</button>
      </form>

      <h3>Data from MongoDB:</h3>
      <ul>
        {messages.map((msg, index) => <li key={index}>{msg.text}</li>)}
      </ul>
      </div>
  );
}

export default App;

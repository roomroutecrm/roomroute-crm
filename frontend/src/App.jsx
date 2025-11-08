import React, { useState } from 'react';

const API_BASE = 'https://roomroute-crm-production.up.railway.app'; // replace with your actual backend URL if different

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Registered successfully! ID: ${data.id}`);
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Logged in successfully!');
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>RoomRoute CRM</h1>
      <p>Email:</p>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <p>Password:</p>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin} style={{ marginLeft: '1rem' }}>Login</button>
      <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>
    </div>
  );
}

export default App;

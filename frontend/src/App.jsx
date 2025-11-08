import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('https://roomroute-crm-production.up.railway.app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Registration successful!');
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://roomroute-crm-production.up.railway.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ Login successful! Welcome, ${data.email}`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Welcome to RoomRoute CRM</h1>
      <p>The frontend is now connected and ready!</p>

      <h2>Register or Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginBottom: '0.5rem', display: 'block' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginBottom: '0.5rem', display: 'block' }}
      />
      <button onClick={handleRegister} style={{ marginRight: '1rem' }}>
        Register
      </button>
      <button onClick={handleLogin}>Login</button>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default App;

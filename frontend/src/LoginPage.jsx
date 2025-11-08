// frontend/src/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle registration
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

  // Handle login
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
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
    }
  };

  // Style for Apple & Google buttons
  const socialBtnStyle = {
    display: 'block',
    margin: '0.5rem 0',
    padding: '0.6rem 1rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#eee',
    color: '#333',
    width: '250px',
    textAlign: 'center',
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

      <hr style={{ margin: '2rem 0' }} />

      <h3>Or sign in with</h3>
      <button style={socialBtnStyle}>🍎 Continue with Apple</button>
      <button
        style={{
          ...socialBtnStyle,
          backgroundColor: '#4285F4',
          color: 'white',
        }}
      >
        🟦 Continue with Google
      </button>
    </div>
  );
}

export default LoginPage;


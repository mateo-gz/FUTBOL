import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backendsn.onrender.com/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      console.log('Login exitoso 🔓');
      

      // Redirigir al admin panel
      navigate('/admin');
    } catch (err) {
      setError('Usuario o contraseña incorrecta');
      console.error('Error en login:', err);
    }
  };

  return (
    <div className='login'>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin} className='form-login'>
        <input
          className='login-input'
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='login-input'
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          className='login-input'
          type="submit">Entrar
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;

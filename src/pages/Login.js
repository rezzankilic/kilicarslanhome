import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../App';
import './Login.css';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [loggedin, setLoggedin] = useContext(LoginContext);

    const[authReady, setAuthReady] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:8000/api/token/';
    fetch(url, {
        method:'POST',
        headers: {
            'Content-Type' :'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,

        })
    })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            console.log(localStorage.access)
            
        })
        
        setLoggedin(true)
        navigate('/')

  

  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

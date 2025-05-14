"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  console.log(password);
  console.log(usernameOrEmail);
  

  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!usernameOrEmail || !password) {
      setError('Please enter both email/username and password');
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:4000/api/user/login', {
        email: usernameOrEmail, 
        password,
      });
  
      if (res.data?.message === 'Login successful') {
        alert('Login successful!');
        router.push('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid username/email or password');
    }
  };
  

  const handleCreateAccount = () => {
    router.push('/auth/signup');
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-2">
          Login
        </button>

        <button
          type="button"
          onClick={handleCreateAccount}
          className="w-full bg-gray-500 text-white py-2 rounded"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [referralId, setReferralId] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!email || !uniqueId || !referralId) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (referralId !== 'Greenindia') {
      setError('Invalid referral ID.');
      return;
    }

    setError('');

    // Send login request
    fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, uniqueId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setMessage('Login successful!');
          localStorage.setItem('uniqueId', data.user.uniqueId);
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Something went wrong!');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">
          Login to Your Account
        </h2>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        {message && <div className="text-green-600 text-sm mb-4">{message}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          {/* Unique ID / Password */}
          <div className="mb-4">
            <label htmlFor="uniqueId" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="uniqueId"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          {/* Referral ID */}
          <div className="mb-6">
            <label htmlFor="referralId" className="block text-sm font-medium text-gray-700">
              Referral ID
            </label>
            <input
              type="text"
              id="referralId"
              value={referralId}
              onChange={(e) => setReferralId(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter referral ID"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-md font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

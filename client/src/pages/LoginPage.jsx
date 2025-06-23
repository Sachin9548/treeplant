import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for email and unique ID
    if (!email || !uniqueId) {
      setError('Please fill in both fields.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
    } else {
      setError(''); // Reset error

      // Make an API call to the backend to login
      fetch('http://localhost:10000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, uniqueId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setMessage('Login successful!');
            // console.log(data.user.uniqueId);
            localStorage.setItem('uniqueId', data.user.uniqueId);

            // Redirect to the dashboard page after a successful login
            navigate('/dashboard'); 
          }
        })
        .catch((error) => {
          setError('Something went wrong!');
          console.error(error);
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">
          Login to Your Account
        </h2>

        {/* Error Message */}
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        {message && <div className="text-green-600 text-sm mb-4">{message}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Unique ID */}
          <div className="mb-6">
            <label htmlFor="uniqueId" className="block text-sm font-medium text-gray-700">Enter the Password</label>
            <input
              type="text"
              id="uniqueId"
              name="uniqueId"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              placeholder="Enter your Password"
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

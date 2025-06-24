// src/components/JoinForm.js
import React, { useState } from "react";

export default function JoinForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    branch: "",
    mobileNumber: "",
    email: "",
  });

  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const { fullName, collegeName, branch, mobileNumber, email } = formData;

  // Simple validation
  if (!fullName || !collegeName || !branch || !mobileNumber || !email) {
    setError('Please fill in all fields.');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    setError('Please enter a valid email address.');
  } else {
    setError(''); // Reset error

    // Sending data to backend
    try {
      const response = await fetch('/api/users/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, collegeName, branch, mobileNumber, email }),
      });

      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
        setFormData({
          fullName: '',
          collegeName: '',
          branch: '',
          mobileNumber: '',
          email: '',
        });
        // Save the uniqueId for later use (for certificate verification)
        // localStorage.setItem('uniqueId', data.uniqueId);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form.');
    }
  }
};

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Join Our Mission
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Join our campaign to help the environment by planting trees. Fill out
        the form below to get started!
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Error Message */}
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        {/* Full Name */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          {/* College Name */}
          <div>
            <label
              htmlFor="collegeName"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              College Name
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={formData.collegeName}
              onChange={handleChange}
              placeholder="Enter your college name"
            />
          </div>
        </div>

        {/* Branch and Mobile Number */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Branch */}
          <div>
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Branch
            </label>
            <input
              type="text"
              id="branch"
              name="branch"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Enter your branch"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

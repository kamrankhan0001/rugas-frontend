import React, { useState } from 'react';
import axios from 'axios';

const ReportIssue = () => {
  const [laptopId, setLaptopId] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare issue data
    const issueData = {
      laptopId,
      description,
      priority,
    };

    try {
      // Send issue data to the backend
      const response = await axios.post('/api/issues', issueData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if authentication is required
        },
      });

      // Handle success response
      setMessage('Issue reported successfully!');
      setLaptopId('');
      setDescription('');
      setPriority('low');
    } catch (error) {
      // Handle error response
      setMessage('Failed to report the issue. Please try again.');
      console.error('Error reporting issue:', error.response || error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>
      {message && <p className="text-sm mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Laptop ID Input */}
        <div className="mb-4">
          <label htmlFor="laptopId" className="block text-sm font-medium text-gray-700">
            Laptop ID
          </label>
          <input
            type="text"
            id="laptopId"
            value={laptopId}
            onChange={(e) => setLaptopId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            placeholder="Enter the laptop ID"
            required
          />
        </div>

        {/* Issue Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Issue Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            placeholder="Describe the issue"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Priority Dropdown */}
        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700"
          >
            Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;

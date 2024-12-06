import React, { useState } from 'react';
import axios from 'axios';

const RequestLaptop = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [laptopType, setLaptopType] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request data
    const requestData = {
      employeeId,
      laptopType,
      reason,
    };

    try {
      // Send request to the backend
      const response = await axios.post('/api/requests', requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if authentication is required
        },
      });

      // Handle success response
      setMessage('Laptop request submitted successfully!');
      setEmployeeId('');
      setLaptopType('');
      setReason('');
    } catch (error) {
      // Handle error response
      setMessage('Failed to submit the request. Please try again.');
      console.error('Error submitting request:', error.response || error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Request a Laptop</h2>
      {message && <p className="text-sm mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Employee ID Input */}
        <div className="mb-4">
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            placeholder="Enter your Employee ID"
            required
          />
        </div>

        {/* Laptop Type Input */}
        <div className="mb-4">
          <label htmlFor="laptopType" className="block text-sm font-medium text-gray-700">
            Laptop Type
          </label>
          <input
            type="text"
            id="laptopType"
            value={laptopType}
            onChange={(e) => setLaptopType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            placeholder="Enter preferred laptop type or specifications"
            required
          />
        </div>

        {/* Reason for Request */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Reason for Request
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            placeholder="Provide a reason for the laptop request"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestLaptop;

import React, { useEffect, useState } from 'react';
import { fetchAssignedLaptops } from '../../services/api';
import OverviewCard from '../Shared/OverviewCard';
import AssignedLaptops from './AssignedLaptops';
import RequestLaptop from './RequestLaptop';
import ReportIssue from './ReportIssue';

const EmployeeDashboard = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch assigned laptops for the employee
    const getAssignedLaptops = async () => {
      try {
        setLoading(true);
        const response = await fetchAssignedLaptops();
        setLaptops(response.data);
      } catch (err) {
        console.error('Error fetching assigned laptops:', err);
        setError('Failed to fetch assigned laptops.');
      } finally {
        setLoading(false);
      }
    };

    getAssignedLaptops();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <OverviewCard title="Total Assigned Laptops" value={laptops.length} />
        <OverviewCard title="Pending Requests" value="2" /> {/* Replace with real data */}
        <OverviewCard title="Issues Reported" value="1" /> {/* Replace with real data */}
      </div>

      {/* Section for Assigned Laptops */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Your Assigned Laptops</h2>
        <AssignedLaptops laptops={laptops} />
      </div>

      {/* Section for Requesting a New Laptop */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Request a New Laptop</h2>
        <RequestLaptop />
      </div>

      {/* Section for Reporting Issues */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Report an Issue</h2>
        <ReportIssue />
      </div>
    </div>
  );
};

export default EmployeeDashboard;

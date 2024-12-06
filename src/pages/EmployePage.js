import React, { useState } from 'react';
//import AssignedLaptops from '../components/Employee/AssignedLaptops';
import AssignedLaptops from '../components/Employee/AssignedLaptop';
import RequestLaptop from '../components/Employee/RequestLaptop';
import ReportIssue from '../components/Employee/ReportIssue';

const EmployeePage = () => {
  const [activeTab, setActiveTab] = useState('assignedLaptops'); // Corrected initial state

  const renderContent = () => {
    switch (activeTab) {
      case 'assignedLaptops': // Fixed case to match the state value
        return <AssignedLaptops />;
      case 'requestLaptop':
        return <RequestLaptop />;
      case 'reportIssue':
        return <ReportIssue />;
      default:
        return <AssignedLaptops />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <header className="bg-green-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Employee Portal</h1>
          <nav className="space-x-4">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === 'assignedLaptops' ? 'bg-white text-green-600' : 'bg-green-500 hover:bg-green-700'
              }`}
              onClick={() => setActiveTab('assignedLaptops')}
            >
              Assigned Laptops
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === 'requestLaptop' ? 'bg-white text-green-600' : 'bg-green-500 hover:bg-green-700'
              }`}
              onClick={() => setActiveTab('requestLaptop')}
            >
              Request Laptop
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === 'reportIssue' ? 'bg-white text-green-600' : 'bg-green-500 hover:bg-green-700'
              }`}
              onClick={() => setActiveTab('reportIssue')}
            >
              Report Issue
            </button>
          </nav>
        </div>
      </header>

      {/* Content Area */}
      <main className="container mx-auto py-6 px-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default EmployeePage;

import React, { useState } from 'react';

import AdminDashboard from '../components/Admin/AdminDashboard';

import LaptopManager from '../components/Admin/LaptopManager';

import EmployeeAssignment from '../components/Admin/EmployeeAssignment';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // Controls the active section

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'laptopManager':
        return <LaptopManager />;
      case 'employeeAssignment':
        return <EmployeeAssignment />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <nav className="space-x-4">
            <button
              className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-700'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'laptopManager' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-700'}`}
              onClick={() => setActiveTab('laptopManager')}
            >
              Laptop Manager
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'employeeAssignment' ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-700'}`}
              onClick={() => setActiveTab('employeeAssignment')}
            >
              Employee Assignment
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

export default AdminPage;

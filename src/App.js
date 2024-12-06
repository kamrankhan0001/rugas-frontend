
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

import EmployeePage from './pages/EmployePage';

const App = () => {
    return (
        <Router>
            <Navbar />
            
            <div className="container mx-auto mt-4">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/employee" element={<EmployeePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;



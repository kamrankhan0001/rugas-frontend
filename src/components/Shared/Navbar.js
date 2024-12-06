import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div>
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/admin" className="mr-4">Admin</Link>
                <Link to="/employee">Employee</Link>
            </div>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;

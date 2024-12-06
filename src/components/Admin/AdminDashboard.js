import React, { useState, useEffect } from 'react';
import { fetchLaptops, addLaptop, updateLaptop, deleteLaptop } from '../../services/api';
import OverviewCard from '../Shared/OverviewCard';

const AdminDashboard = () => {
    const [laptops, setLaptops] = useState([]);
    const [stats, setStats] = useState({ total: 0, assigned: 0, available: 0, maintenance: 0 });
    const [formData, setFormData] = useState({ brand: '', model: '', serialNumber: '', status: 'available', purchaseDate: '' });
    const [editMode, setEditMode] = useState(false);
    const [selectedLaptopId, setSelectedLaptopId] = useState(null);

    useEffect(() => {
        fetchLaptopData();
    }, []);

    const fetchLaptopData = async () => {
        const response = await fetchLaptops();
        setLaptops(response.data);

        const total = response.data.length;
        const assigned = response.data.filter((l) => l.status === 'assigned').length;
        const available = response.data.filter((l) => l.status === 'available').length;
        const maintenance = response.data.filter((l) => l.status === 'maintenance').length;
        setStats({ total, assigned, available, maintenance });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddLaptop = async () => {
        await addLaptop(formData);
        setFormData({ brand: '', model: '', serialNumber: '', status: 'available', purchaseDate: '' });
        fetchLaptopData();
    };

    const handleEditLaptop = (laptop) => {
        setEditMode(true);
        setSelectedLaptopId(laptop.id);
        setFormData({ brand: laptop.brand, model: laptop.model, serialNumber: laptop.serialNumber, status: laptop.status, purchaseDate: laptop.purchaseDate });
    };

    const handleUpdateLaptop = async () => {
        await updateLaptop(selectedLaptopId, formData);
        setFormData({ brand: '', model: '', serialNumber: '', status: 'available', purchaseDate: '' });
        setEditMode(false);
        setSelectedLaptopId(null);
        fetchLaptopData();
    };

    const handleDeleteLaptop = async (id) => {
        await deleteLaptop(id);
        fetchLaptopData();
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <OverviewCard title="Total Laptops" count={stats.total} />
                <OverviewCard title="Assigned Laptops" count={stats.assigned} />
                <OverviewCard title="Available Laptops" count={stats.available} />
                <OverviewCard title="Under Maintenance" count={stats.maintenance} />
            </div>

            {/* Laptop Management */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Manage Laptops</h2>
                <table className="table-auto w-full mb-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Brand</th>
                            <th className="px-4 py-2">Model</th>
                            <th className="px-4 py-2">Serial Number</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Purchase Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laptops.map((laptop) => (
                            <tr key={laptop.id} className="border-b">
                                <td className="px-4 py-2">{laptop.brand}</td>
                                <td className="px-4 py-2">{laptop.model}</td>
                                <td className="px-4 py-2">{laptop.serialNumber}</td>
                                <td className="px-4 py-2">{laptop.status}</td>
                                <td className="px-4 py-2">{new Date(laptop.purchaseDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleEditLaptop(laptop)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLaptop(laptop.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Laptop Form */}
            <div>
                <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Laptop' : 'Add Laptop'}</h2>
                <form className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Brand"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="Model"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleInputChange}
                        placeholder="Serial Number"
                        className="border p-2 rounded"
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    >
                        <option value="available">Available</option>
                        <option value="assigned">Assigned</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                    <input
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    />
                    <button
                        type="button"
                        onClick={editMode ? handleUpdateLaptop : handleAddLaptop}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        {editMode ? 'Update Laptop' : 'Add Laptop'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;


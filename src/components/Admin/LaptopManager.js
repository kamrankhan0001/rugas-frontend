import React, { useState, useEffect } from 'react';
import { fetchLaptops, addLaptop, updateLaptop, deleteLaptop } from '../../services/api';

const LaptopManager = () => {
  const [laptops, setLaptops] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    brand: '',
    model: '',
    serialNumber: '',
    status: 'available',
    purchaseDate: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLaptopData();
  }, []);

  const fetchLaptopData = async () => {
    const response = await fetchLaptops();
    setLaptops(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddLaptop = async () => {
    if (!formData.brand || !formData.model || !formData.serialNumber || !formData.purchaseDate) {
      alert('Please fill all required fields.');
      return;
    }

    await addLaptop(formData);
    resetForm();
    fetchLaptopData();
  };

  const handleUpdateLaptop = async () => {
    if (!formData.id) {
      alert('Invalid laptop selected for update.');
      return;
    }

    await updateLaptop(formData.id, formData);
    resetForm();
    fetchLaptopData();
    setIsEditing(false);
  };

  const handleEditLaptop = (laptop) => {
    setFormData(laptop);
    setIsEditing(true);
  };

  const handleDeleteLaptop = async (id) => {
    if (window.confirm('Are you sure you want to delete this laptop?')) {
      await deleteLaptop(id);
      fetchLaptopData();
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      brand: '',
      model: '',
      serialNumber: '',
      status: 'available',
      purchaseDate: '',
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Laptop Manager</h1>

      {/* Add/Update Form */}
      <div className="mb-6 p-4 border rounded bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Laptop' : 'Add Laptop'}</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
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
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleInputChange}
            placeholder="Purchase Date"
            className="border p-2 rounded"
          />
        </div>
        <div>
          <button
            onClick={isEditing ? handleUpdateLaptop : handleAddLaptop}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? 'Update Laptop' : 'Add Laptop'}
          </button>
          {isEditing && (
            <button
              onClick={() => {
                resetForm();
                setIsEditing(false);
              }}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Laptop Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Laptop Inventory</h2>
        <table className="table-auto w-full border">
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
                <td className="px-4 py-2">
                  {new Date(laptop.purchaseDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditLaptop(laptop)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
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
    </div>
  );
};

export default LaptopManager;

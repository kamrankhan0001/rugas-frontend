import React, { useEffect, useState } from 'react';
import { fetchAssignedLaptops } from '../../services/api'; // Assuming this API fetches assigned laptops

const AssignedLaptops = () => {
  const [assignedLaptops, setAssignedLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAssignedLaptops = async () => {
      try {
        setLoading(true);
        const laptops = await fetchAssignedLaptops();
        setAssignedLaptops(laptops);
      } catch (err) {
        setError('Failed to load assigned laptops.');
      } finally {
        setLoading(false);
      }
    };

    getAssignedLaptops();
  }, []);

  if (loading) {
    return <p>Loading assigned laptops...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Assigned Laptops</h2>
      {assignedLaptops.length === 0 ? (
        <p>No laptops have been assigned to you.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Brand</th>
              <th className="border border-gray-300 px-4 py-2">Model</th>
              <th className="border border-gray-300 px-4 py-2">Serial Number</th>
              <th className="border border-gray-300 px-4 py-2">Condition</th>
            </tr>
          </thead>
          <tbody>
            {assignedLaptops.map((laptop) => (
              <tr key={laptop.id}>
                <td className="border border-gray-300 px-4 py-2">{laptop.brand}</td>
                <td className="border border-gray-300 px-4 py-2">{laptop.model}</td>
                <td className="border border-gray-300 px-4 py-2">{laptop.serialNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{laptop.condition || 'Good'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignedLaptops;

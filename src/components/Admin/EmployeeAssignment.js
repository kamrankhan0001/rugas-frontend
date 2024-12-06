import React, { useState, useEffect } from 'react';
import {
  fetchEmployees,
  fetchAssignments,
  fetchLaptops,
  assignLaptop,
  unassignLaptop,

} from '../../services/api';


const EmployeeAssignment = () => {
  const [employees, setEmployees] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedLaptop, setSelectedLaptop] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const employeeResponse = await fetchEmployees();
    setEmployees(employeeResponse.data);

    const laptopResponse = await fetchLaptops();
    setLaptops(laptopResponse.data.filter((laptop) => laptop.status === 'available'));

    const assignmentResponse = await fetchAssignments();
    setAssignments(assignmentResponse.data);
  };

  const handleAssignLaptop = async () => {
    if (!selectedEmployee || !selectedLaptop) {
      alert('Please select both an employee and a laptop.');
      return;
    }

    await assignLaptop({ employeeId: selectedEmployee, laptopId: selectedLaptop });
    setSelectedEmployee('');
    setSelectedLaptop('');
    fetchInitialData();
  };

  const handleUnassignLaptop = async (assignmentId) => {
    await unassignLaptop(assignmentId);
    fetchInitialData();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employee Laptop Assignment</h1>

      {/* Assignment Form */}
      <div className="mb-6 p-4 border rounded bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">Assign Laptop</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} ({employee.email})
              </option>
            ))}
          </select>
          <select
            value={selectedLaptop}
            onChange={(e) => setSelectedLaptop(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Laptop</option>
            {laptops.map((laptop) => (
              <option key={laptop.id} value={laptop.id}>
                {laptop.brand} {laptop.model} (Serial: {laptop.serialNumber})
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAssignLaptop}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assign Laptop
        </button>
      </div>

      {/* Assignment Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Current Assignments</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Employee Name</th>
              <th className="px-4 py-2">Laptop</th>
              <th className="px-4 py-2">Assigned At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="border-b">
                <td className="px-4 py-2">{assignment.employeeName}</td>
                <td className="px-4 py-2">
                  {assignment.laptopBrand} {assignment.laptopModel} (Serial: {assignment.laptopSerial})
                </td>
                <td className="px-4 py-2">
                  {new Date(assignment.assignedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleUnassignLaptop(assignment.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Unassign
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

export default EmployeeAssignment;

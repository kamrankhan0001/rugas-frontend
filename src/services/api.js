// import axios from 'axios';

// const API_BASE = 'http://localhost:5000/api';

// // Fetch all laptops
// export const fetchLaptops = async () => axios.get(`${API_BASE}/laptops`);

// // Add a new laptop
// export const addLaptop = async (data) => axios.post(`${API_BASE}/laptops`, data);

// // Update laptop details
// export const updateLaptop = async (id, data) => axios.put(`${API_BASE}/laptops/${id}`, data);

// // Delete a laptop
// export const deleteLaptop = async (id) => axios.delete(`${API_BASE}/laptops/${id}`);



import axios from 'axios';


export const fetchAssignedLaptops = async () => {
  const response = await axios.get('/api/employees/assigned-laptops');
  return response.data;
};


// Assign a laptop to an employee
export const assignLaptop = async (laptopId, employeeId) => {
  const response = await axios.post('/api/assignments', { laptopId, employeeId });
  return response.data;
};

// Unassign a laptop from an employee
export const unassignLaptop = async (assignmentId) => {
  const response = await axios.delete(`/api/assignments/${assignmentId}`);
  return response.data;
};


// Existing API functions
export const fetchLaptops = async () => {
  const response = await axios.get('/api/laptops');
  return response.data;
  
};

export const addLaptop = async (laptopData) => {
  const response = await axios.post('/api/laptops', laptopData);
  return response.data;
  // try {
  //   const response = await addLaptop(laptopData);
  //   console.log('Laptop added:', response);
  // } catch (error) {
  //   console.error('Error adding laptop:', error.response || error.message);
  // }
};

export const updateLaptop = async (id, laptopData) => {
  const response = await axios.put(`/api/laptops/${id}`, laptopData);
  return response.data;
};

export const deleteLaptop = async (id) => {
  await axios.delete(`/api/laptops/${id}`);
};

// Add the missing API functions

// Fetch all employees
export const fetchEmployees = async () => {
  const response = await axios.get('/api/employees');
  return response.data;
};

// Fetch all assignments
export const fetchAssignments = async () => {
  const response = await axios.get('/api/assignments');
  return response.data;
};

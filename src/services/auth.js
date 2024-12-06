// export const login = async (email, password) => {
//     try {
//         const response = await apiClient.post('/api/auth/login', { email, password });
//         localStorage.setItem('token', response.data.token);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };




import apiClient from './apiClient';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

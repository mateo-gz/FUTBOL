import * as jwtDecode from 'jwt-decode';

export const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode.default(token); // obligatorio .default
    return decoded.role === 'admin'; // ajusta según tu token
  } catch {
    return false;
  }
};

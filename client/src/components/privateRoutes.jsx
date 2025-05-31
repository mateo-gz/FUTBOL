// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;

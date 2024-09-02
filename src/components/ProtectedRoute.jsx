// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const { token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

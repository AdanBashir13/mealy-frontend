import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = ({ element }) => {
  const { token, role } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;
  const isAdmin = role === 'admin';

  return isAuthenticated && isAdmin ? element : <Navigate to={isAuthenticated ? "/" : "/login"} replace />;
};

export default AdminProtectedRoute;

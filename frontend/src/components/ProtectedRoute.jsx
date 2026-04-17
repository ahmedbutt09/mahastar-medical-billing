import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('adminAuth');
  
  if (!isAuth) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    alert('Please log in to access this page.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
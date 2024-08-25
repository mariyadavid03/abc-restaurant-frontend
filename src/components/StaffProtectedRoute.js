import React from 'react';
import { Navigate } from 'react-router-dom';

const StaffProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    alert('Can not acess the page');
    return <Navigate to="/" />;
  }

  return children;
};

export default StaffProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import SessionManager from '../services/SessionManager';

const StaffProtectedRoute = ({ children }) => {
  const session = SessionManager.getInstance();
  const isLoggedIn = session.getIsLoggedIn();

  if (!isLoggedIn) {
    alert('Can not acess the page');
    return <Navigate to="/" />;
  }

  return children;
};

export default StaffProtectedRoute;
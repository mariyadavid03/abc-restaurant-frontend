import React from 'react';
import { Navigate } from 'react-router-dom';
import SessionManager from '../services/SessionManager';

const ProtectedRoute = ({ children }) => {

  const session = SessionManager.getInstance();
  const isLoggedIn = session.getIsLoggedIn();

  if (!isLoggedIn) {
    alert('Please log in to access this page.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
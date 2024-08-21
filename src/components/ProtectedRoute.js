import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isLoggedIn = sessionStorage.getItem('user') !== null;
    if (!isLoggedIn) {
        alert('Please log in first');
        return <Navigate to="/login" />;
      }
      return children;

}
export default ProtectedRoute;
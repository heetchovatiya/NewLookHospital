import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, profile } = useAuth();

  if (!user || !profile?.is_admin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

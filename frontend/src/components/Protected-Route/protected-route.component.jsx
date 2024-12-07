import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken } from '../../utils/cookies/cookie';
import { USER_TYPES } from '../../data/userTypes';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Check if the user's role is allowed
    if (allowedRoles.includes(userRole)) {
      return children;
    } else {
      switch (userRole) {
        case USER_TYPES.WORKER:
          return <Navigate to="/orders/prepare" replace />;
        case USER_TYPES.DELIVERY_PERSON:
          return <Navigate to="/orders/deliver" replace />;
        case USER_TYPES.CUSTOMER:
          return <Navigate to="/" replace />;
        case USER_TYPES.ADMIN:
          return <Navigate to="/admin/" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isLoaded, isSignedIn } = useAuth();
    const { user: clerkUser } = useUser();
    const { user: mongoUser } = useSelector((state) => state.auth); // Assuming this is synced
    const location = useLocation();

    if (!isLoaded) return null;

    if (!isSignedIn) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    if (adminOnly && mongoUser?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

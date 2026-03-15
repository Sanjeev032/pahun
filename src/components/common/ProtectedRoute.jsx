import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useSelector } from 'react-redux';
import { ADMIN_EMAIL } from '../../utils/constants';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isLoaded, isSignedIn } = useAuth();
    const { user: clerkUser } = useUser();
    const { user: mongoUser } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!isLoaded) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    const userEmail = clerkUser?.primaryEmailAddress?.emailAddress || mongoUser?.email;

    if (adminOnly && userEmail !== ADMIN_EMAIL) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

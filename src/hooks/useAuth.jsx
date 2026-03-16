import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../redux/slices/authSlice';
import { ADMIN_EMAIL } from '../utils/constants';

/**
 * Custom hook to manage authentication state across the application.
 * Wraps Clerk authentication and synchronizes with Redux state.
 * 
 * @returns {Object} { user, loading, isAdmin, logout }
 */
export const useAuth = () => {
    const { isLoaded, signOut } = useClerkAuth();
    const { user: clerkUser } = useUser();
    const { user: mongoUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Determine loading state
    const loading = !isLoaded;

    // Combine user data (Mongo user preferred if available for app-specific data)
    const user = mongoUser || clerkUser;

    // Check admin status
    const userEmail = clerkUser?.primaryEmailAddress?.emailAddress || mongoUser?.email;
    const isAdmin = userEmail === ADMIN_EMAIL;

    // Logout logic: Clears both Clerk session and Redux state
    const logout = async () => {
        try {
            await signOut();
            dispatch(logoutAction());
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return {
        user,
        loading,
        isAdmin,
        logout
    };
};

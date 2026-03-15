import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { authAPI } from '../api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';

const SyncUser = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { getToken } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const sync = async () => {
            if (isLoaded && isSignedIn && user) {
                try {
                    const token = await getToken();
                    
                    const userData = {
                        clerkId: user.id,
                        email: user.primaryEmailAddress?.emailAddress,
                        name: user.fullName || user.username || 'User',
                        avatar: user.imageUrl,
                    };

                    // Sync with backend
                    const { data } = await authAPI.sync(userData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (data.success) {
                        // Update Redux state with synced user and token
                        dispatch(setCredentials({
                            user: data.data,
                            token: token
                        }));
                    }
                } catch (error) {
                    console.error('Failed to sync user:', error);
                }
            }
        };

        sync();
    }, [isLoaded, isSignedIn, user, getToken, dispatch]);

    return null;
};

export default SyncUser;

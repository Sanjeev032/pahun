import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import authService from '../../services/authService';

const SyncUser = () => {
    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(() => {
        const syncUserWithBackend = async () => {
            if (isLoaded && isSignedIn && user) {
                try {
                    // Extract primary email
                    const email = user.primaryEmailAddress?.emailAddress;
                    
                    if (!email) return;

                    await authService.syncUser({
                        clerkId: user.id,
                        email: email,
                        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                        avatar: user.imageUrl,
                    });
                    
                    console.log('User synced with backend successfully');
                } catch (error) {
                    console.error('Error syncing user with backend:', error.message || error);
                }
            }
        };

        syncUserWithBackend();
    }, [isLoaded, isSignedIn, user]);

    return null;
};

export default SyncUser;

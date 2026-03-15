import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden p-8 border border-gray-50">
                <SignUp 
                    routing="path" 
                    path="/sign-up" 
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            card: "shadow-none border-none p-0",
                            headerTitle: "text-2xl font-light tracking-tight",
                            headerSubtitle: "text-gray-400 text-sm",
                            formButtonPrimary: "bg-black hover:bg-luxury-gold transition-colors text-xs uppercase tracking-widest py-3",
                            footerActionLink: "text-luxury-gold hover:text-black transition-colors"
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default SignUpPage;

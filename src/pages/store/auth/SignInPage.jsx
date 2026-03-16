import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import SEO from '../../../components/common/SEO';
import { COMPANY_NAME } from '../../../utils/constants';

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center pt-32 pb-24">
      <SEO 
        title={`Sign In | ${COMPANY_NAME}`}
        description="Sign in to your Pahun account to access your orders and wishlist."
      />
      <div className="w-full max-w-md px-4">
        <SignIn 
          routing="path" 
          path="/login" 
          signUpUrl="/signup"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none border border-gray-100 rounded-2xl",
              headerTitle: "text-2xl font-light tracking-tight text-gray-900",
              headerSubtitle: "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mt-2",
              socialButtonsBlockButton: "rounded-xl border border-gray-100 hover:bg-gray-50 transition-all",
              formButtonPrimary: "bg-black hover:bg-gray-800 rounded-xl py-3 text-[11px] font-bold uppercase tracking-widest transition-all",
              footerActionLink: "text-black hover:text-gray-600 font-bold",
              formFieldInput: "bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-black transition-all",
              formFieldLabel: "text-[10px] font-bold uppercase tracking-widest text-gray-400"
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignInPage;

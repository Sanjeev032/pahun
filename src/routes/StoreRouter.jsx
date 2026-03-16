import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { motion } from 'framer-motion';

// Lazy loading storefront pages
const Home = lazy(() => import('../pages/store/Home'));
const Shop = lazy(() => import('../pages/store/Shop'));
const ProductDetail = lazy(() => import('../pages/store/ProductDetail'));
const Cart = lazy(() => import('../pages/store/Cart'));
const Wishlist = lazy(() => import('../pages/store/Wishlist'));
const Profile = lazy(() => import('../pages/store/Profile'));
const Checkout = lazy(() => import('../pages/store/Checkout'));
const SignInPage = lazy(() => import('../pages/store/auth/SignInPage'));
const SignUpPage = lazy(() => import('../pages/store/auth/SignUpPage'));
const ForgotPassword = lazy(() => import('../pages/store/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/store/auth/ResetPassword'));

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
  >
    {children}
  </motion.div>
);

const StoreRouter = () => {
  return (
    <Routes>
      <Route index element={<PageWrapper><Home /></PageWrapper>} />
      <Route path="shop" element={<PageWrapper><Shop /></PageWrapper>} />
      <Route path="product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
      <Route path="login" element={<PageWrapper><SignInPage /></PageWrapper>} />
      <Route path="signup" element={<PageWrapper><SignUpPage /></PageWrapper>} />
      <Route path="forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />
      <Route path="reset-password" element={<PageWrapper><ResetPassword /></PageWrapper>} />
      
      {/* Protected Customer Routes */}
      <Route path="cart" element={<ProtectedRoute><PageWrapper><Cart /></PageWrapper></ProtectedRoute>} />
      <Route path="checkout" element={<ProtectedRoute><PageWrapper><Checkout /></PageWrapper></ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute><PageWrapper><Profile /></PageWrapper></ProtectedRoute>} />
      <Route path="wishlist" element={<ProtectedRoute><PageWrapper><Wishlist /></PageWrapper></ProtectedRoute>} />
    </Routes>
  );
};

export default StoreRouter;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import { COMPANY_NAME } from './utils/constants';

// Lazy loading pages for performance
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Auth = lazy(() => import('./pages/Auth'));
const Profile = lazy(() => import('./pages/Profile'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const SignInPage = lazy(() => import('./pages/auth/SignInPage'));
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage'));

// Admin Pages
const AdminLayout = lazy(() => import('./layout/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/Admin/Products'));
const AdminOrders = lazy(() => import('./pages/Admin/Orders'));

const Loading = () => (
    <div className="h-screen w-full flex items-center justify-center bg-white z-[100]">
        <div className="text-sm tracking-extra uppercase font-light animate-pulse">{COMPANY_NAME}</div>
    </div>
);


import { SignedIn, SignedOut, SignIn, SignUp, RedirectToSignIn } from '@clerk/clerk-react';
import SyncUser from './components/SyncUser';

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

function AppContent() {
    const location = useLocation();

    return (
        <>
            <SyncUser />
            <Navbar />
            <Suspense fallback={<Loading />}>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                        <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
                        <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
                        
                        {/* Clerk Auth Routes */}
                        <Route path="/sign-in/*" element={<PageWrapper><SignInPage /></PageWrapper>} />
                        <Route path="/sign-up/*" element={<PageWrapper><SignUpPage /></PageWrapper>} />

                        {/* Protected Routes */}
                        <Route path="/cart" element={
                            <SignedIn><PageWrapper><Cart /></PageWrapper></SignedIn>
                        } />
                        <Route path="/checkout" element={
                            <SignedIn><PageWrapper><Checkout /></PageWrapper></SignedIn>
                        } />
                        <Route path="/profile" element={
                            <SignedIn><PageWrapper><Profile /></PageWrapper></SignedIn>
                        } />
                        <Route path="/wishlist" element={
                            <SignedIn><PageWrapper><Wishlist /></PageWrapper></SignedIn>
                        } />

                        <Route path="/login" element={<Navigate to="/sign-in" replace />} />
                        <Route path="/register" element={<Navigate to="/sign-up" replace />} />

                        {/* Admin Routes - Protected & Wrapped in Layout */}
                        {['/admin', '/admin/products', '/admin/orders'].map((path) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <SignedIn>
                                        <ProtectedRoute adminOnly>
                                            <PageWrapper>
                                                <AdminLayout>
                                                    {path === '/admin' ? <AdminDashboard /> :
                                                        path === '/admin/products' ? <AdminProducts /> :
                                                            <AdminOrders />}
                                                </AdminLayout>
                                            </PageWrapper>
                                        </ProtectedRoute>
                                    </SignedIn>
                                }
                            />
                        ))}

                        {/* Fallback for SignedOut users on protected routes */}
                        <Route path="*" element={
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        } />
                    </Routes>
                </AnimatePresence>
            </Suspense>
            <Footer />
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


function App() {
    return (
        <Router>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/login" element={<Auth type="login" />} />
                    <Route path="/register" element={<Auth type="register" />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/checkout" element={<Checkout />} />

                    {/* Admin Routes - Protected & Wrapped in Layout */}
                    {['/admin', '/admin/products', '/admin/orders'].map((path) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <ProtectedRoute adminOnly>
                                    <AdminLayout>
                                        {path === '/admin' ? <AdminDashboard /> :
                                            path === '/admin/products' ? <AdminProducts /> :
                                                <AdminOrders />}
                                    </AdminLayout>
                                </ProtectedRoute>
                            }
                        />
                    ))}
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );
}

export default App;

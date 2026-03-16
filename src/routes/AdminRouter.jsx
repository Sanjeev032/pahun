import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Lazy loading admin pages
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('../pages/admin/Products'));
const AdminOrders = lazy(() => import('../pages/admin/Orders'));

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

const AdminRouter = () => {
  return (
    <Routes>
      <Route index element={<PageWrapper><AdminDashboard /></PageWrapper>} />
      <Route path="products" element={<PageWrapper><AdminProducts /></PageWrapper>} />
      <Route path="orders" element={<PageWrapper><AdminOrders /></PageWrapper>} />
    </Routes>
  );
};

export default AdminRouter;

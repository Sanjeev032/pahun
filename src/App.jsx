import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import ProtectedRoute from './components/common/ProtectedRoute';
import { COMPANY_NAME } from './utils/constants';
import SyncUser from './components/common/SyncUser';

// Layouts - Moved to layouts directory
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

// Modular Routers
const StoreRouter = lazy(() => import('./routes/StoreRouter'));
const AdminRouter = lazy(() => import('./routes/AdminRouter'));

const Loading = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white z-[100]">
    <div className="text-sm tracking-extra uppercase font-light animate-pulse">
      {COMPANY_NAME}
    </div>
  </div>
);

function AppContent() {
  return (
    <>
      <SyncUser />
      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Storefront Routes */}
            <Route path="/*" element={<MainLayout />}>
              <Route path="*" element={<StoreRouter />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/*" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
              <Route path="*" element={<AdminRouter />} />
            </Route>

            {/* legacy & Fallbacks */}
            <Route path="/sign-in/*" element={<Navigate to="/login" replace />} />
            <Route path="/sign-up/*" element={<Navigate to="/signup" replace />} />
            
            <Route
              path="*"
              element={(
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              )}
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
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

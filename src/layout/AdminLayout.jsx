import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-luxury-black font-sans flex">
            <AdminSidebar />
            <main className="flex-1 ml-72">
                <AdminHeader />
                <div className="p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

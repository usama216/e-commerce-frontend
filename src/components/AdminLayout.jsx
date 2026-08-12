import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminShellLayout from './AdminShellLayout';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminProductsPage from '../pages/AdminProductsPage';
import AdminBannersPage from '../pages/AdminBannersPage';
import AdminBlogsPage from '../pages/AdminBlogsPage';
import AdminReviewsPage from '../pages/AdminReviewsPage';
import AdminPromoCodesPage from '../pages/AdminPromoCodesPage';
import { isAdminLoggedIn } from '../api';

function ProtectedAdminShell() {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }
  return <AdminShellLayout />;
}

export default function AdminLayout() {
  return (
    <Routes>
      <Route index element={<AdminLoginPage />} />
      <Route element={<ProtectedAdminShell />}>
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="banners" element={<AdminBannersPage />} />
        <Route path="blogs" element={<AdminBlogsPage />} />
        <Route path="reviews" element={<AdminReviewsPage />} />
        <Route path="promo-codes" element={<AdminPromoCodesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

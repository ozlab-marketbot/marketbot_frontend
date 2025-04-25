// src/App.js - TEMPORARY FIX FOR PRESENTATION
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResponsiveDashboardLayout from './components/layout/ResponsiveDashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import { useAuth } from './contexts/AuthContext';
import ProductManagementPage from './pages/products/ProjectManagementPage';
import CustomerManagementPage from './pages/customer/CustomerManagementPage';
import OrderManagementPage from './pages/orders/OrderManagementPage';
import SalesStatisticsPage from './pages/statistics/SalesStatisticsPage';
import SettingsPage from './pages/settings/SettingsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyles />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!currentUser ? <SignupPage /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!currentUser ? <ForgotPasswordPage /> : <Navigate to="/dashboard" />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <ResponsiveDashboardLayout>
              <DashboardPage />
            </ResponsiveDashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/products" element={
          <ProtectedRoute>
            <ResponsiveDashboardLayout>
              <ProductManagementPage />
            </ResponsiveDashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/customers" element={
          <ProtectedRoute>
            <ResponsiveDashboardLayout>
              <CustomerManagementPage />
            </ResponsiveDashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/orders" element={
          <ProtectedRoute>
            <ResponsiveDashboardLayout>
              <OrderManagementPage />
            </ResponsiveDashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/statistics" element={
          <ProtectedRoute>
            <ResponsiveDashboardLayout>
              <SalesStatisticsPage />
            </ResponsiveDashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <ResponsiveDashboardLayout>
              <SettingsPage />
            </ResponsiveDashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Redirect to dashboard if logged in, otherwise to login */}
        <Route path="*" element={currentUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
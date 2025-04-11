// src/App.js - TEMPORARY FIX FOR PRESENTATION
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

const App = () => {

  // PRESENTATION MODE: Always assume not logged in for auth pages
  const currentUser = null;
  
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {/* Auth pages - will always show during presentation */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Also add routes for the /auth/ paths if they're being used */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Add a route to view the dashboard during presentation */}
          <Route path="/dashboard" element={<DashboardPage />}>
            {routes.map((route) => (
              <Route key={route.path} path={`/dashboard${route.path}`} element={route.element} />
            ))}
          </Route>

          <Route path="/products" element={<ProductManagementPage />}>
            {routes.map((route) => (
              <Route key={route.path} path={`/products${route.path}`} element={route.element} />
            ))}
          </Route>

          <Route path="/customers" element={<CustomerManagementPage />}>
            {routes.map((route) => (
              <Route key={route.path} path={`/customers${route.path}`} element={route.element} />
            ))}
          </Route>

          <Route path="/orders" element={<OrderManagementPage />}>
            {routes.map((route) => (
              <Route key={route.path} path={`/orders${route.path}`} element={route.element} />
            ))}
          </Route>

          {/* <Route path="/statistics" element={<StatisticsManagementPage />}>
            {routes.map((route) => (
              <Route key={route.path} path={`/products${route.path}`} element={route.element} />
            ))}
          </Route> */}
          
          {/* Redirect to login if no route matches */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/api/authService';
import axios from 'axios'; 

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const AuthContext = createContext(null) ;

// Temporary user data for development
const TEMP_USERS = [
  {
    email: 'test@example.com',
    password: 'password123',
    name: '사용자',
    role: 'admin'
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          // Validate that the user data has required fields
          if (userData && userData.email && userData.name) {
            setCurrentUser(userData);
          } else {
            // If user data is invalid, clear it
            clearAuth();
          }
        } catch (err) {
          // If JSON parsing fails, clear the invalid data
          clearAuth();
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    // Clear any stale data on initial load
    clearAuth();
    checkAuth();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setError(null);
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      // Check against temporary users first without setting loading
      const user = TEMP_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Only set loading for successful login attempt
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        email: user.email,
        name: user.name,
        role: user.role
      };
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (TEMP_USERS.some(u => u.email === userData.email)) {
        throw new Error('Email already exists');
      }
      
      // Add new user to temporary users
      TEMP_USERS.push(userData);
      
      const newUser = {
        email: userData.email,
        name: userData.name,
        role: 'user'
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      await authService.forgotPassword(email);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    forgotPassword,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

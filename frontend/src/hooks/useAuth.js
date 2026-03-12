import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, errorHandler } from '../utils/helpers';
import { api } from '../utils/api';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = auth.getToken();
        const userData = auth.getUser();
        
        if (token && userData) {
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        auth.removeToken();
        auth.removeUser();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.login({ email, password });
      const { token, user: userData } = response.data;
      
      // Store tokens and user data
      auth.setToken(token);
      auth.setUser(userData);
      setUser(userData);
      
      // Show success message
      console.log(SUCCESS_MESSAGES.LOGIN_SUCCESS);
      
      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.register(userData);
      const { token, user: newUser } = response.data;
      
      // Store tokens and user data
      auth.setToken(token);
      auth.setUser(newUser);
      setUser(newUser);
      
      // Show success message
      console.log(SUCCESS_MESSAGES.REGISTER_SUCCESS);
      
      return { success: true, user: newUser };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    auth.removeToken();
    auth.removeUser();
    setUser(null);
    setError(null);
    
    // Navigate to home page
    navigate('/');
    
    // You might want to call logout API here for server-side cleanup
    // api.logout().catch(console.error);
  }, [navigate]);

  // Update user profile
  const updateProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.updateProfile(profileData);
      const updatedUser = response.data;
      
      // Update stored user data
      auth.setUser(updatedUser);
      setUser(updatedUser);
      
      console.log(SUCCESS_MESSAGES.PROFILE_UPDATE_SUCCESS);
      return { success: true, user: updatedUser };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Change password
  const changePassword = useCallback(async (passwordData) => {
    setLoading(true);
    setError(null);
    
    try {
      await api.changePassword(passwordData);
      
      console.log(SUCCESS_MESSAGES.PASSWORD_CHANGE_SUCCESS);
      return { success: true };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError
  };
};

export default useAuth;
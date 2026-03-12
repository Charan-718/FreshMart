import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { auth, errorHandler } from '../utils/helpers';
import { api } from '../utils/api';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOGOUT: 'LOGOUT'
};

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
      
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
      
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
        loading: false
      };
      
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = auth.getToken();
        const userData = auth.getUser();
        
        if (token && userData) {
          dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userData });
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        auth.removeToken();
        auth.removeUser();
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.login({ email, password });
      const { token, user: userData } = response.data;
      
      // Store tokens and user data
      auth.setToken(token);
      auth.setUser(userData);
      
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userData });
      
      // Show success message (you can integrate with a notification system)
      console.log(SUCCESS_MESSAGES.LOGIN_SUCCESS);
      
      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.register(userData);
      const { token, user: newUser } = response.data;
      
      // Store tokens and user data
      auth.setToken(token);
      auth.setUser(newUser);
      
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: newUser });
      
      console.log(SUCCESS_MESSAGES.REGISTER_SUCCESS);
      return { success: true, user: newUser };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    auth.removeToken();
    auth.removeUser();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    
    // You might want to call logout API here for server-side cleanup
    // api.logout().catch(console.error);
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.updateProfile(profileData);
      const updatedUser = response.data;
      
      // Update stored user data
      auth.setUser(updatedUser);
      
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: updatedUser });
      
      console.log(SUCCESS_MESSAGES.PROFILE_UPDATE_SUCCESS);
      return { success: true, user: updatedUser };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      await api.changePassword(passwordData);
      
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      console.log(SUCCESS_MESSAGES.PASSWORD_CHANGE_SUCCESS);
      return { success: true };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // State
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';
const UPDATE_USER = 'UPDATE_USER';
const CLEAR_ERROR = 'CLEAR_ERROR';

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case UPDATE_USER:
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
        error: null
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = localStorage.getItem('user');
        
        if (user) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: JSON.parse(user)
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        dispatch({
          type: LOGOUT
        });
      }
    };

    loadUser();
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login with mock data
      if (email === 'user@example.com' && password === 'password') {
        const user = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com'
        };
        
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user
        });
        
        return true;
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: 'Invalid credentials'
        });
        
        return false;
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.message || 'Login failed'
      });
      
      return false;
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration with mock data
      const user = {
        id: Date.now().toString(),
        name,
        email
      };
      
      dispatch({
        type: REGISTER_SUCCESS,
        payload: user
      });
      
      return true;
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.message || 'Registration failed'
      });
      
      return false;
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Update user profile
  const updateUser = (userData) => {
    dispatch({
      type: UPDATE_USER,
      payload: userData
    });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        login,
        register,
        logout,
        updateUser,
        clearError
      }}
    >
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
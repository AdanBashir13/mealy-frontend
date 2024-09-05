import { createSlice } from '@reduxjs/toolkit';

// Initialize state from localStorage
const getInitialState = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  return {
    isAuthenticated: !!token,
    role: role || null,
    token: token || null,
  };
};

// Authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    // Login action
    login(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userRole', action.payload.role);
    },
    // Logout action
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    },
  },
});

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRole = (state) => state.auth.role;
export const selectToken = (state) => state.auth.token;

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

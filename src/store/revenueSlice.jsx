import { createSlice } from '@reduxjs/toolkit';

// Initial state for revenue
const initialState = {
  data: [],        // Revenue data
  status: 'idle',  // Loading status
  error: null,     // Error state
};

// Revenue slice
const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    // Set revenue data
    setRevenueData(state, action) {
      state.data = action.payload;
    },
    // Set loading status
    setLoading(state, action) {
      state.status = action.payload;
    },
    // Set error message
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { setRevenueData, setLoading, setError } = revenueSlice.actions;
export default revenueSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Meals slice
const mealsSlice = createSlice({
  name: 'meals',
  initialState: {
    mealOptions: [],  // List of meal options
    loading: false,   // Loading state
    error: null,      // Error state
  },
  reducers: {
    // Add a meal option
    addMealOption(state, action) {
      state.mealOptions.push(action.payload);
    },
    // Update a meal option
    updateMealOption(state, action) {
      const index = state.mealOptions.findIndex(meal => meal.id === action.payload.id);
      if (index !== -1) {
        state.mealOptions[index] = action.payload;
      }
    },
    // Delete a meal option
    deleteMealOption(state, action) {
      state.mealOptions = state.mealOptions.filter(meal => meal.id !== action.payload);
    },
    // Set meal options
    setMealOptions(state, action) {
      state.mealOptions = action.payload;
    },
    // Set error message
    setError(state, action) {
      state.error = action.payload;
    },
    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Export actions and reducer
export const { addMealOption, updateMealOption, deleteMealOption, setMealOptions, setError, setLoading } = mealsSlice.actions;
export default mealsSlice.reducer;

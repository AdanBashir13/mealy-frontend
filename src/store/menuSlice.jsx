import { createSlice } from '@reduxjs/toolkit';

// Menu slice
const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menus: [],         // List of all menus
    dailyMenu: [],     // Today's menu
    status: 'idle',    // Loading status
    error: null,       // Error state
  },
  reducers: {
    // Set all menus
    setMenus(state, action) {
      state.menus = action.payload;
    },
    // Set today's menu
    setDailyMenu(state, action) {
      state.dailyMenu = action.payload;
    },
    // Add a new menu
    addMenu(state, action) {
      state.menus.push(action.payload);
    },
    // Update an existing menu
    updateMenu(state, action) {
      const index = state.menus.findIndex(menu => menu.id === action.payload.id);
      if (index !== -1) {
        state.menus[index] = action.payload;
      }
    },
    // Delete a menu
    deleteMenu(state, action) {
      state.menus = state.menus.filter(menu => menu.id !== action.payload);
    },
    // Remove a meal from today's menu
    removeMealFromMenu(state, action) {
      const { mealId } = action.payload;
      state.dailyMenu = state.dailyMenu.filter(id => id !== mealId);
    },
    // Set error message
    setError(state, action) {
      state.error = action.payload;
    },
    // Set loading status
    setLoading(state, action) {
      state.status = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setMenus,
  setDailyMenu,
  addMenu,
  updateMenu,
  deleteMenu,
  removeMealFromMenu,
  setError,
  setLoading,
} = menuSlice.actions;

export default menuSlice.reducer;

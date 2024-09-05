import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mealsReducer from './mealsSlice';
import menuReducer from './menuSlice';
import ordersReducer from './ordersSlice';
import revenueReducer from './revenueSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    meals: mealsReducer,
    menu: menuReducer,
    orders: ordersReducer,
    revenue: revenueReducer,
  },
});

export default store;

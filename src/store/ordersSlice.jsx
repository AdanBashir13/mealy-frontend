import { createSlice } from '@reduxjs/toolkit';

// Initial state for orders
const initialState = {
  orders: [],        // List of orders
  status: 'idle',    // Loading status
  error: null,       // Error state
};

// Orders slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Set all orders
    setOrders(state, action) {
      state.orders = action.payload;
    },
    // Set loading status
    setLoading(state, action) {
      state.status = action.payload;
    },
    // Set error message
    setError(state, action) {
      state.error = action.payload;
    },
    // Update an order's status
    updateOrderStatus(state, action) {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex((order) => order.id === updatedOrder.id);
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
    },
    // Delete an order
    deleteOrder(state, action) {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order.id !== orderId);
    },
  },
});

// Export actions and reducer
export const { setOrders, setLoading, setError, updateOrderStatus, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;

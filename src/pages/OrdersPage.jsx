import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, selectToken } from '../store/authSlice';

const OrdersPage = () => {
  // Hooks for dispatch, token, and authentication state
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const response = await fetch('/api/orders', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Failed to fetch orders');
          const data = await response.json();
          setOrders(data.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setNotification('Error fetching orders');
          setTimeout(() => setNotification(''), 3000);
        }
      };

      fetchOrders();
    }
  }, [dispatch, isAuthenticated, token]);

  // Calculate total price of all orders
  const totalPrice = orders.reduce((total, order) => total + order.total_price, 0);

  if (!isAuthenticated) {
    return <p>You need to log in to view your orders.</p>;
  }

  return (
    <div className="orders-page">
      <header className="page-header">
        <h1>Your Orders</h1>
        <p>Here are your recent orders.</p>
      </header>

      <section className="orders-list">
        {orders.length > 0 ? (
          <>
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <span>Meal: {order.meal_name}</span>
                <span>Price: KSh {order.meal_price.toFixed(2)}</span>
                <span>Quantity: {order.quantity}</span>
                <span>Total Price: KSh {order.total_price.toFixed(2)}</span>
                <span>Status: {order.status || 'Pending'}</span>
              </div>
            ))}
            <div className="total-price">
              <h2>Total Price of All Orders: KSh {totalPrice.toFixed(2)}</h2>
            </div>
          </>
        ) : (
          <p>No orders found.</p>
        )}
      </section>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default OrdersPage;

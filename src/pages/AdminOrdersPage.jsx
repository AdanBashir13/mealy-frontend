import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setLoading } from '../store/ordersSlice';
import { selectIsAuthenticated, selectRole, selectToken } from '../store/authSlice';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const AdminOrdersPage = () => {
  // Initializes Redux hooks
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders) || [];
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  const token = useSelector(selectToken);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notification, setNotification] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetches orders when the component mounts or dependencies change
  useEffect(() => {
    if (isAuthenticated && role === 'admin') {
      const fetchOrders = async () => {
        dispatch(setLoading('loading'));
        try {
          const response = await fetch('/api/orders/admin', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Failed to fetch orders');
          const data = await response.json();
          dispatch(setOrders(data.orders));
          dispatch(setLoading('succeeded'));
        } catch (error) {
          setNotification('Error fetching orders');
          dispatch(setLoading('failed'));
        }
      };

      fetchOrders();
    }
  }, [dispatch, isAuthenticated, role, token]);

  // Calculates total revenue from orders
  useEffect(() => {
    if (Array.isArray(orders)) {
      const total = orders.reduce((acc, order) => acc + order.totalPrice, 0);
      setTotalRevenue(total);
    }
  }, [orders]);

  // Handles updating the status of an order
  const handleUpdateStatus = async (orderId, status) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update order status');
      const updatedOrder = await response.json();
      dispatch(setOrders(orders.map(order =>
        order.id === updatedOrder.id ? updatedOrder : order
      )));
      setNotification('Order status updated successfully!');
    } catch (error) {
      setNotification('Error updating order status');
    }
  };

  // Handles deleting an order
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete order');
      dispatch(setOrders(orders.filter(order => order.id !== orderId)));
      setNotification('Order deleted successfully!');
    } catch (error) {
      setNotification('Error deleting order');
    }
  };

  // Displays details of a selected order
  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };

  // Marks all orders as completed
  const handleMarkAllAsCompleted = async () => {
    try {
      const ordersToUpdate = orders
        .filter(order => order.status !== 'Completed')
        .map(order => ({
          order_id: order.id,
          status: 'Completed',
        }));

      if (ordersToUpdate.length > 0) {
        const response = await fetch('/api/orders/status', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ordersToUpdate),
        });

        if (!response.ok) throw new Error('Failed to update order statuses');
        const updatedOrders = await response.json();
        dispatch(setOrders(orders.map(order =>
          updatedOrders.find(updatedOrder => updatedOrder.id === order.id) || order
        )));
        setNotification('All orders marked as completed!');
      }
    } catch (error) {
      setNotification('Error marking orders as completed');
    }
  };

  // Deletes all completed orders
  const handleDeleteAllCompleted = async () => {
    try {
      const completedOrderIds = orders
        .filter(order => order.status === 'Completed')
        .map(order => order.id);

      if (completedOrderIds.length > 0) {
        const response = await fetch('/api/orders/admin', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_ids: completedOrderIds }),
        });

        if (!response.ok) throw new Error('Failed to delete completed orders');
        dispatch(setOrders(orders.filter(order => order.status !== 'Completed')));
        setNotification('Completed orders deleted successfully!');
      }
    } catch (error) {
      setNotification('Error deleting completed orders');
    }
  };

  // Shows message if not authorized
  if (!isAuthenticated || role !== 'admin') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className="admin-orders-page">
      <header className="page-header">
        <h1>Order Management</h1>
        <p>Manage and review user orders efficiently. Update statuses, view details, or delete orders as necessary.</p>
      </header>

      <section className="admin-intro-section">
        <h2>Welcome to the Orders Management Page</h2>
        <p>Here you can handle all aspects of user orders. Utilize the tools provided to update the order statuses, view detailed information, and delete orders if required. Use the table below to navigate through the orders list.</p>
      </section>

      <section className="orders-summary-section">
        <h2>Orders Summary</h2>
        <p>Total Orders: {orders.length}</p>
        <p>Total Revenue: KES {totalRevenue.toFixed(2)}</p>
      </section>

      <section className="orders-section">
        <h2>Orders List</h2>
        {orders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Meal</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user}</td>
                  <td>{order.meal}</td>
                  <td>{order.status}</td>
                  <td>{order.quantity}</td>
                  <td>KES {order.totalPrice}</td>
                  <td>
                    <div className="order-controls">
                      <button
                        onClick={() => handleUpdateStatus(order.id, order.status === 'Pending' ? 'Completed' : 'Pending')}
                      >
                        {order.status === 'Pending' ? <FaCheck /> : <FaTimes />}
                      </button>
                      <button onClick={() => handleDeleteOrder(order.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders available.</p>
        )}
      </section>

      {selectedOrder && (
        <section className="order-details-section">
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {selectedOrder.id}</p>
          <p><strong>User:</strong> {selectedOrder.user}</p>
          <p><strong>Meal:</strong> {selectedOrder.meal}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
          <p><strong>Total Price:</strong> KES {selectedOrder.totalPrice}</p>
          <button className="close-details-button" onClick={() => setSelectedOrder(null)}>Close Details</button>
        </section>
      )}

      {notification && <div className="notification">Error: {notification}</div>}

      <section className="orders-actions-section">
        <h2>Bulk Actions</h2>
        <button className="bulk-update-button" onClick={handleMarkAllAsCompleted}>
          Mark All as Completed
        </button>
        <button className="bulk-delete-button" onClick={handleDeleteAllCompleted}>
          Delete All Completed Orders
        </button>
      </section>
    </div>
  );
};

export default AdminOrdersPage;

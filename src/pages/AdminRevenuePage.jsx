import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRevenueData, setLoading, setError } from '../store/revenueSlice';
import { selectIsAuthenticated, selectRole, selectToken } from '../store/authSlice';

const AdminRevenuePage = () => {
  // Initialize Redux hooks
  const dispatch = useDispatch();
  const revenueData = useSelector((state) => state.revenue.data) || [];
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  const token = useSelector(selectToken);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrderCount, setTotalOrderCount] = useState(0);

  // Fetch revenue data on component mount or dependency change
  useEffect(() => {
    if (isAuthenticated && role === 'admin') {
      const fetchRevenueData = async () => {
        dispatch(setLoading('loading'));
        try {
          const response = await fetch('/api/revenue', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Failed to fetch revenue data');
          const data = await response.json();
          dispatch(setRevenueData(data.revenueData));
          dispatch(setLoading('succeeded'));
        } catch (error) {
          dispatch(setError(error.message));
          dispatch(setLoading('failed'));
        }
      };

      fetchRevenueData();
    }
  }, [dispatch, isAuthenticated, role, token]);

  // Calculate total revenue and order count
  useEffect(() => {
    const total = revenueData.reduce((acc, item) => acc + item.totalRevenue, 0);
    setTotalRevenue(total);
    const totalOrders = revenueData.reduce((acc, item) => acc + item.orderCount, 0);
    setTotalOrderCount(totalOrders);
  }, [revenueData]);

  // Display message if not authenticated or not an admin
  if (!isAuthenticated || role !== 'admin') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className="admin-revenue-page">
      <header className="revenue-page-header">
        <h1>Revenue Overview</h1>
        <p>Analyze and review the revenue generated from user orders.</p>
      </header>

      <section className="revenue-summary">
        <h2>Revenue Summary</h2>
        <div className="revenue-summary-details">
          <p><strong>Total Revenue:</strong> KES {totalRevenue.toLocaleString()}</p>
          <p><strong>Total Orders:</strong> {totalOrderCount}</p>
        </div>
      </section>

      <section className="revenue-breakdown">
        <h2>Revenue Breakdown</h2>
        <table className="revenue-breakdown-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Revenue</th>
              <th>Order Count</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(revenueData) && revenueData.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                <td>KES {item.totalRevenue.toLocaleString()}</td>
                <td>{item.orderCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="revenue-tips-analysis-container">
        <div className="revenue-tips">
          <h2>Revenue Tips</h2>
          <ul>
            <li>Regularly review your revenue data to identify trends and opportunities.</li>
            <li>Compare revenue across different periods to gauge business performance.</li>
            <li>Use detailed breakdowns to track high-performing products and areas for improvement.</li>
          </ul>
        </div>

        <div className="revenue-analysis">
          <h2>Revenue Analysis</h2>
          <p>Analyze the revenue trends over the past months to identify the highest performing periods.</p>
          <p>Evaluate the effectiveness of promotional campaigns by correlating revenue spikes with specific actions.</p>
          <p>Utilize the analysis to forecast future revenue and make informed business decisions.</p>
        </div>
      </section>
    </div>
  );
};

export default AdminRevenuePage;

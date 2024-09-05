import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDailyMenu } from '../store/menuSlice';
import { selectIsAuthenticated, selectRole, selectToken } from '../store/authSlice';

const MenuPage = () => {
  // Hooks for dispatch, token, state, and user authentication
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const dailyMenu = useSelector((state) => state.menu.dailyMenu) || [];
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);

  useEffect(() => {
    if (isAuthenticated && role === 'user') {
      const fetchDailyMenu = async () => {
        const today = new Date().toISOString().split('T')[0];
        try {
          const response = await fetch(`/api/menus/${today}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Failed to fetch daily menu');
          const data = await response.json();
          dispatch(setDailyMenu(data.meal_options));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching daily menu:', error);
          setNotification('Error fetching daily menu');
          setTimeout(() => setNotification(''), 3000);
          setLoading(false);
        }
      };

      fetchDailyMenu();
    }
  }, [dispatch, isAuthenticated, role, token]);

  // Handle quantity changes for meals
  const handleQuantityChange = (mealId, amount) => {
    setSelectedQuantities((prev) => {
      const newQuantity = (prev[mealId] || 1) + amount;
      return {
        ...prev,
        [mealId]: Math.max(1, newQuantity),
      };
    });
  };

  // Handle adding meal to order
  const handleAddToOrder = async (mealId) => {
    const quantity = selectedQuantities[mealId] || 1;

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ meal_option_id: mealId, quantity }),
      });

      if (response.ok) {
        setNotification('Meal added to your order!');
      } else {
        setNotification('Failed to add meal to your order');
      }

      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error adding meal to order:', error);
      setNotification('Error adding meal to order');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // Check user authentication and role
  if (!isAuthenticated || role !== 'user') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className="customer-menu-page">
      <header className="page-header">
        <h1>Today's Menu</h1>
        <p>Explore the menu for today with a variety of delicious meal options.</p>
      </header>

      <section className="daily-menu-section">
        <h2>Menu for Today</h2>
        <div className="daily-menu">
          {loading ? (
            <p>Loading...</p>
          ) : (
            dailyMenu.length > 0 ? (
              dailyMenu.map((meal) => (
                <div key={meal.id} className="daily-menu-item">
                  <span>{meal.name} - KSh {meal.price.toFixed(2)}</span>
                  <div className="order-controls">
                    <button onClick={() => handleQuantityChange(meal.id, -1)}>-</button>
                    <span>{selectedQuantities[meal.id] || 1}</span>
                    <button onClick={() => handleQuantityChange(meal.id, 1)}>+</button>
                    <button onClick={() => handleAddToOrder(meal.id)}>Add to Order</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No meals available for today.</p>
            )
          )}
        </div>
      </section>

      <section className="special-highlights-section">
        <h2>Special Highlights</h2>
        <p>Discover interesting facts and highlights about today's meals.</p>
        <ul>
          <li>All meals are prepared fresh daily with locally sourced ingredients.</li>
          <li>Our meals are crafted to provide a balanced and nutritious experience.</li>
          <li>We have a rotating menu to ensure variety and excitement in every meal.</li>
        </ul>
      </section>

      <section className="customer-reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews">
          <div className="review-item">
            <p>"The food here is always amazing! Highly recommend."</p>
            <span>-Raymond Korir</span>
          </div>
          <div className="review-item">
            <p>"Great service and delicious meals. Will definitely come back."</p>
            <span>- Joygladys Njeri</span>
          </div>
        </div>
      </section>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default MenuPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDailyMenu, removeMealFromMenu } from '../store/menuSlice';
import { selectIsAuthenticated, selectRole, selectToken } from '../store/authSlice';
import { FaPlus, FaTrash, FaInfoCircle } from 'react-icons/fa';

const AdminMenuPage = () => {
  // Initializes Redux hooks
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const mealOptions = useSelector((state) => state.meals.mealOptions) || [];
  const dailyMenu = useSelector((state) => state.menu.dailyMenu) || [];
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [notification, setNotification] = useState('');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);

  // Fetches meal options and daily menu when the component mounts or dependencies change
  useEffect(() => {
    if (isAuthenticated && role === 'admin') {
      const fetchMealOptions = async () => {
        try {
          const response = await fetch('/api/meal-options', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Failed to fetch meal options');
          const data = await response.json();
          dispatch({ type: 'meals/setMealOptions', payload: data });
        } catch (error) {
          console.error('Error fetching meal options:', error);
        }
      };

      const fetchDailyMenu = async () => {
        try {
          const response = await fetch('/api/menus/today', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Failed to fetch daily menu');
          const data = await response.json();
          dispatch(setDailyMenu(data));
        } catch (error) {
          console.error('Error fetching daily menu:', error);
        }
      };

      fetchMealOptions();
      fetchDailyMenu();
    }
  }, [dispatch, isAuthenticated, role, token]);

  // Handles setting the daily menu
  const handleSetMenu = async () => {
    try {
      const response = await fetch('/api/menus/setDaily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          meal_ids: selectedMeals,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to set daily menu: ${errorText}`);
      }

      const data = await response.json();
      dispatch(setDailyMenu(data));
      setSelectedMeals([]);
      setNotification('Daily menu updated successfully!');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error setting daily menu:', error);
      setNotification('Error updating daily menu');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // Handles removing a meal from the menu
  const handleRemoveMeal = async (mealId) => {
    try {
      const response = await fetch(`/api/menus/removeMeal/${mealId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to remove meal from menu');
      dispatch(removeMealFromMenu(mealId));
      setNotification('Meal removed successfully!');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error removing meal from menu:', error);
      setNotification('Error removing meal');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // Adds a meal to the selected list
  const handleAddToMenu = (mealId) => {
    const updatedSelections = [...new Set([...selectedMeals, mealId])];
    setSelectedMeals(updatedSelections);
    setNotification('Meal added to menu successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  // Returns a message if the user is not authenticated or not an admin
  if (!isAuthenticated || role !== 'admin') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className="admin-menu-page">
      <header className="page-header">
        <h1>Manage Daily Menu</h1>
        <p>Select meals to be included in today's menu.</p>
      </header>

      <section className="admin-intro-section">
        <h2>Welcome to Menu Management</h2>
        <p>
          As an admin, you can set up the daily menu, manage meal options, and keep track of meal availability. Use the sections below to guide you through the process.
        </p>
      </section>

      <section className="overview-section">
        <h2>Overview of Menu Management</h2>
        <div className="overview-cards">
          <div className="overview-card">
            <FaInfoCircle className="overview-icon" />
            <h3>Menu Management Overview</h3>
            <p>Get an overview of the daily menu and meal options.</p>
          </div>
          <div className="overview-card">
            <FaPlus className="overview-icon" />
            <h3>Add Meals to Menu</h3>
            <p>Select and add new meals to today's menu.</p>
          </div>
          <div className="overview-card">
            <FaTrash className="overview-icon" />
            <h3>Remove Meals</h3>
            <p>Remove meals from today's menu or from meal options.</p>
          </div>
        </div>
      </section>

      <section className="meal-selection-section">
        <h2>Select Meals for Today</h2>
        <div className="meal-options">
          {mealOptions.length > 0 ? (
            mealOptions.map((meal) => (
              <div key={meal.id} className="meal-option">
                <span>{meal.name} - KSh{meal.price.toFixed(2)}</span>
                <button onClick={() => handleAddToMenu(meal.id)}>
                  Add to Menu
                </button>
              </div>
            ))
          ) : (
            <p>No meal options available.</p>
          )}
        </div>
        <button className="set-menu-button" onClick={handleSetMenu}>
          Set Menu
        </button>
        {notification && <div className="notification">{notification}</div>}
      </section>

      <section className="daily-menu-section">
        <h2>Today's Menu</h2>
        <div className="daily-menu">
          {dailyMenu.length > 0 ? (
            dailyMenu.map((meal) => (
              <div key={meal.id} className="daily-menu-item">
                <span>{meal.name}</span>
                <button onClick={() => handleRemoveMeal(meal.id)}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No meals set for today.</p>
          )}
        </div>
      </section>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default AdminMenuPage;

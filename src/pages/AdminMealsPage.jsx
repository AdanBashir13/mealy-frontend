import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMealOption, updateMealOption, deleteMealOption, setError, setLoading, setMealOptions } from '../store/mealsSlice';
import { selectIsAuthenticated, selectRole, selectToken } from '../store/authSlice';
import { FaPlus, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

const AdminMealsPage = () => {
  // Initializes Redux hooks and local state
  const dispatch = useDispatch();
  const [mealName, setMealName] = useState('');
  const [mealPrice, setMealPrice] = useState('');
  const mealOptions = useSelector((state) => state.meals.mealOptions);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  const token = useSelector(selectToken);
  const loading = useSelector((state) => state.meals.loading);
  const error = useSelector((state) => state.meals.error);

  // Fetches meal options from the API when the component mounts or dependencies change
  useEffect(() => {
    const fetchMealOptions = async () => {
      if (isAuthenticated && role === 'admin' && token) {
        dispatch(setLoading(true));
        try {
          const response = await fetch('/api/meal-options', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorDetails}`);
          }

          const data = await response.json();
          dispatch(setMealOptions(data));
        } catch (error) {
          dispatch(setError(error.message));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    fetchMealOptions();
  }, [isAuthenticated, role, token, dispatch]);

  // Handles adding a new meal option
  const handleAddMeal = async () => {
    if (!token) {
      console.error('Token is missing, cannot add meal');
      return;
    }

    if (mealName.trim() && !isNaN(mealPrice) && mealPrice > 0) {
      try {
        const response = await fetch('/api/meal-options', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: mealName, price: parseFloat(mealPrice) }),
        });

        if (!response.ok) throw new Error('Failed to add meal option');

        const newMeal = await response.json();
        dispatch(addMealOption(newMeal));
        setMealName('');
        setMealPrice('');
      } catch (error) {
        dispatch(setError(error.message));
      }
    } else {
      console.error('Invalid input for meal name or price');
    }
  };

  // Handles updating an existing meal option
  const handleUpdateMeal = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/meal-options/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update meal option');

      const updatedMeal = await response.json();
      dispatch(updateMealOption(updatedMeal));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // Handles deleting a meal option
  const handleDeleteMeal = async (id) => {
    try {
      const response = await fetch(`/api/meal-options/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete meal option');

      dispatch(deleteMealOption(id));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // Returns a message if the user is not authenticated or not an admin
  if (!isAuthenticated || role !== 'admin') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className="admin-meals-page">
      <header className="page-header">
        <h1>Manage Meals</h1>
        <p>Here you can add, edit, or delete meal options for the menu.</p>
      </header>

      <section className="admin-intro-section">
        <h2>Welcome to Meal Management</h2>
        <p>
          As an admin, you have the power to manage all meal options. You can add new meals, update existing ones, or remove meals that are no longer available.
          Use the sections below to guide you through the process.
        </p>
      </section>

      <section className="overview-section">
        <h2>Overview of Meal Management</h2>
        <div className="overview-cards">
          <div className="overview-card">
            <FaInfoCircle className="overview-icon" />
            <h3>Meal Management Overview</h3>
            <p>Get a snapshot of meal options and their statuses.</p>
          </div>
          <div className="overview-card">
            <FaPlus className="overview-icon" />
            <h3>Add New Meal</h3>
            <p>Quickly add new meal options to your menu.</p>
          </div>
          <div className="overview-card">
            <FaEdit className="overview-icon" />
            <h3>Edit Existing Meals</h3>
            <p>Update details of meals already in the system.</p>
          </div>
          <div className="overview-card">
            <FaTrash className="overview-icon" />
            <h3>Delete Meals</h3>
            <p>Remove meals that are no longer available or needed.</p>
          </div>
        </div>
      </section>

      <section className="add-manage-sections">
        <div className="add-meal-section">
          <h2>Add a New Meal</h2>
          <div className="form-group">
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="Meal Name"
            />
            <input
              type="number"
              value={mealPrice}
              onChange={(e) => setMealPrice(e.target.value)}
              placeholder="Meal Price"
            />
            <button onClick={handleAddMeal}>Add Meal</button>
          </div>
        </div>

        <div className="manage-meals-section">
          <h2>Manage Existing Meals</h2>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <ul>
            {mealOptions.map((meal) => (
              <li key={meal.id}>
                {meal.name} - KSh{meal.price}
                <button onClick={() => handleUpdateMeal(meal.id, { ...meal, price: meal.price + 1 })}>Update</button>
                <button onClick={() => handleDeleteMeal(meal.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AdminMealsPage;

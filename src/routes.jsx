// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import Logout from './components/Logout';
import AdminMealsPage from './pages/AdminMealsPage';
import AdminMenuPage from './pages/AdminMenuPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminRevenuePage from './pages/AdminRevenuePage';



const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="customer/menu" element={<MenuPage />} />
      <Route path="customer/orders" element={<OrdersPage />} />
      <Route path="/admin/meals" element={<AdminMealsPage />} />
      <Route path="/admin/menu" element={<AdminMenuPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
      <Route path="/admin/revenue" element={<AdminRevenuePage />} />




    </Routes>
  );
};

export default AppRouter;

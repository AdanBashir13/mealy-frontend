// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import MenuPage from './pages/MenuPage';
// import OrdersPage from './pages/OrdersPage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import AdminMealsPage from './pages/AdminMealsPage';
// import AdminMenuPage from './pages/AdminMenuPage';
// import AdminOrdersPage from './pages/AdminOrdersPage';
// import AdminRevenuePage from './pages/AdminRevenuePage';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminProtectedRoute from './components/AdminProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/signup" element={<SignupPage />} /> */}

      {/* Protected routes */}
      {/* <Route
        path="/menu"
        element={<ProtectedRoute element={<MenuPage />} />}
      /> */}
      {/* <Route
        path="/orders"
        element={<ProtectedRoute element={<OrdersPage />} />}
      /> */}

      {/* Admin protected routes */}
      {/* <Route
        path="/admin/meals"
        element={<AdminProtectedRoute element={<AdminMealsPage />} />}
      /> */}
      {/* <Route
        path="/admin/menu"
        element={<AdminProtectedRoute element={<AdminMenuPage />} />}
      /> */}
      {/* <Route
        path="/admin/orders"
        element={<AdminProtectedRoute element={<AdminOrdersPage />} />}
      /> */}
      {/* <Route
        path="/admin/revenue"
        element={<AdminProtectedRoute element={<AdminRevenuePage />} />}
      /> */}
    </Routes>
  );
};

export default AppRouter;

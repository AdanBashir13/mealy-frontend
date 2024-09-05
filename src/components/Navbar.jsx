import React from 'react';
import { Link } from 'react-router-dom';
import MealyLogo from '../images/logo.png';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={MealyLogo} alt="Mealy Logo" />
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              {role === 'admin' ? (
                <>
                  <li><Link to="/admin/meals">Manage Meals</Link></li>
                  <li><Link to="/admin/menu">Set Up Menu</Link></li>
                  <li><Link to="/admin/orders">View Orders</Link></li>
                  <li><Link to="/admin/revenue">Daily Revenue</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/customer/menu">Menu</Link></li>
                  <li><Link to="/customer/orders">Orders</Link></li>
                </>
              )}
              <li><Logout /></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

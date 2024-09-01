import React from 'react';
import { Link } from 'react-router-dom';
import MealyLogo from '../images/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo"><img src={MealyLogo} alt="Mealy Logo" /></Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
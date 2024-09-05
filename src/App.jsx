import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRouter from './routes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      dispatch(login({ token, role }));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <AppRouter />
        <Footer />
      </div>
    </Router>
  );
};

export default App;

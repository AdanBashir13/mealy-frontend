// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRouter from './routes';

const App = () => {
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
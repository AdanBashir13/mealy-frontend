import React from 'react';
import Header from '../components/Header';
import { FaStar, FaGift, FaTruck, FaMoneyBillWave, FaShoppingCart, FaStar as FaRatingStar, FaTags } from 'react-icons/fa';

import Delicious from '../images/delicious.jpeg';
import Hearty from '../images/hearty.jpeg';
import Pasta from '../images/pasta.jpeg';
import Taco from '../images/tacos.jpeg';
import Sushi from '../images/sushi.jpeg';
import Salad from '../images/salad.jpeg';

const HomePage = () => {
  return (
    <div>
      {/* Header component */}
      <Header />

      <div className="home-page">

        {/* Introductory section */}
        <section className="intro-section">
          <h2>Discover a New Way to Manage and Order Meals</h2>
          <p>
            Mealy offers a seamless experience for food vendors and customers alike. Vendors can manage meals and set daily menus,
            while customers can easily browse and place orders.
          </p>
        </section>

        {/* Popular foods carousel */}
        <section className="top-foods-section">
          <h2>Popular Foods Customers Love</h2>
          <div className="top-foods-carousel">
            <div className="food-item">
              <img src={Delicious} alt="Delicious Pizza" />
              <h3>Delicious Pizza</h3>
              <p>Freshly made with premium ingredients.</p>
            </div>
            <div className="food-item">
              <img src={Hearty} alt="Hearty Burger" />
              <h3>Hearty Burger</h3>
              <p>Juicy and satisfying, perfect for any meal.</p>
            </div>
            <div className="food-item">
              <img src={Pasta} alt="Classic Pasta" />
              <h3>Classic Pasta</h3>
              <p>Rich and flavorful, made with the finest ingredients.</p>
            </div>
            <div className="food-item">
              <img src={Salad} alt="Refreshing Salad" />
              <h3>Refreshing Salad</h3>
              <p>A healthy and crisp choice for a light meal.</p>
            </div>
            <div className="food-item">
              <img src={Taco} alt="Spicy Tacos" />
              <h3>Spicy Tacos</h3>
              <p>Perfectly seasoned with a burst of flavor.</p>
            </div>
            <div className="food-item">
              <img src={Sushi} alt="Exotic Sushi" />
              <h3>Exotic Sushi</h3>
              <p>Freshly rolled with a variety of ingredients.</p>
            </div>
          </div>
        </section>

        {/* Why choose us section */}
        <section className="appeal-section">
          <h2>Why Choose Us?</h2>
          <div className="appeal-items">
            <div className="appeal-item">
              <FaStar className="appeal-icon" />
              <h3>Top Quality</h3>
              <p>Only the best ingredients in every meal.</p>
            </div>
            <div className="appeal-item">
              <FaGift className="appeal-icon" />
              <h3>Special Offers</h3>
              <p>Exclusive deals and discounts for our customers.</p>
            </div>
            <div className="appeal-item">
              <FaTruck className="appeal-icon" />
              <h3>Fast Delivery</h3>
              <p>Get your meals delivered quickly and efficiently.</p>
            </div>
            <div className="appeal-item">
              <FaMoneyBillWave className="appeal-icon" />
              <h3>Affordable Pricing</h3>
              <p>Great value for high-quality meals.</p>
            </div>
          </div>
        </section>

        {/* Feature cards section */}
        <section className="feature-cards-section">
          <h2>What We Offer</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <FaShoppingCart className="feature-icon" />
              <h3>Easy Ordering</h3>
              <p>Order your favorite meals in just a few clicks.</p>
            </div>
            <div className="feature-card">
              <FaRatingStar className="feature-icon" />
              <h3>High Ratings</h3>
              <p>Choose from top-rated restaurants and foods.</p>
            </div>
            <div className="feature-card">
              <FaTags className="feature-icon" />
              <h3>Exclusive Discounts</h3>
              <p>Get special deals and promotions regularly.</p>
            </div>
          </div>
        </section>

        {/* Partner section */}
        <section className="partner-section">
          <h2>How to Become a Partner</h2>
          <p>Join us and start offering your meals to a wider audience. Partner with us to expand your reach and increase sales.</p>
          <a href="/signup" className="btn-partner">Become a Partner</a>
        </section>

        {/* Testimonials and partners section */}
        <section className="testimonials-partners-section">
          <div className="testimonials-container">
            <h2>What Our Customers Say</h2>
            <div className="testimonials">
              <div className="testimonial">
                <p>"Great service and fantastic experience!"</p>
                <p>- Bruce Wayne</p>
              </div>
              <div className="testimonial">
                <p>"I love the quality and customer support!"</p>
                <p>- Mary Jane</p>
              </div>
            </div>
          </div>

          <div className="partners-container">
            <h2>What Our Partners Say</h2>
            <div className="partners">
              <div className="partner">
                <p>"Working with this company has been a pleasure."</p>
                <p>- BurgerKing</p>
              </div>
              <div className="partner">
                <p>"Their professionalism and reliability are unmatched."</p>
                <p>- Chipotle</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-action section */}
        <section className="cta-section">
          <h2>Ready to Transform Your Meal Experience?</h2>
          <div className="cta-buttons">
            <a href="/signup" className="btn">Sign Up Now</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

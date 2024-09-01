import React from 'react';
import Header from '../components/Header';
import { FaStar, FaGift, FaTruck, FaMoneyBillWave, FaShoppingCart, FaStar as FaRatingStar, FaTags } from 'react-icons/fa';
import Chipotle from '../images/chipotle.jpeg'
import Galitos from '../images/galitos.jpeg'
import Kfc from '../images/kfc.jpeg'
import Burger from '../images/burger.jpeg'
import Dominos from '../images/dominos.jpeg'
import Subway from '../images/subway.jpeg'
import Delicious from '../images/delicious.jpeg'
import Hearty from '../images/hearty.jpeg'
import Pasta from '../images/pasta.jpeg'
import Taco from '../images/tacos.jpeg'
import Sushi from '../images/sushi.jpeg'
import Salad from '../images/salad.jpeg'

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="home-page">
        <section className="intro-section">
          <h2>Discover a New Way to Manage and Order Meals</h2>
          <p>
            Mealy offers a seamless experience for food vendors and customers alike. Manage your meals, set daily menus, and track orders with ease.
          </p>
        </section>


      <section class="top-restaurants-section">
        <h2>Top Restaurants on Mealy</h2>
        <div class="top-restaurants">
          <div class="restaurant">
            <img src={Chipotle} alt="Restaurant 1" />
            <h3>Chipotle</h3>
            <p>Known for its delicious local dishes.</p>
          </div>
          <div class="restaurant">
            <img src={Galitos} alt="Restaurant 2" />
            <h3>Galitos</h3>
            <p>Famous for its gourmet international cuisine.</p>
          </div>
          <div class="restaurant">
            <img src={Kfc} alt="Restaurant 3" />
            <h3>Kfc</h3>
            <p>Specializes in exquisite fine dining experiences.</p>
          </div>
          <div class="restaurant">
            <img src={Burger} alt="Restaurant 4" />
            <h3>BurgerKing</h3>
            <p>Popular for its trendy and modern menu.</p>
          </div>
          <div class="restaurant">
            <img src={Dominos} alt="Restaurant 5" />
            <h3>Domino's Pizza</h3>
            <p>Offers a warm and inviting atmosphere with hearty meals.</p>
          </div>
          <div class="restaurant">
            <img src={Subway} alt="Restaurant 6" />
            <h3>Subway</h3>
            <p>Known for its stunning views and relaxed ambiance.</p>
          </div>

        </div>
      </section>

      <section className="top-foods-section">
        <h2>Popular Foods Customers Love</h2>
        <div className="top-foods-carousel">
          <div className="food-item">
            <img src={Delicious} alt="Food 1" />
            <h3>Delicious Pizza</h3>
            <p>Freshly made with premium ingredients.</p>
          </div>
          <div className="food-item">
            <img src={Hearty} alt="Food 2" />
            <h3>Hearty Burger</h3>
            <p>Juicy and satisfying, perfect for any meal.</p>
          </div>
          <div className="food-item">
            <img src={Pasta} alt="Food 3" />
            <h3>Classic Pasta</h3>
            <p>Rich and flavorful, made with the finest ingredients.</p>
          </div>
          <div className="food-item">
            <img src={Salad} alt="Food 4" />
            <h3>Refreshing Salad</h3>
            <p>A healthy and crisp choice for a light meal.</p>
          </div>
          <div className="food-item">
            <img src={Taco} alt="Food 5" />
            <h3>Spicy Tacos</h3>
            <p>Perfectly seasoned with a burst of flavor.</p>
          </div>
          <div className="food-item">
            <img src={Sushi} alt="Food 6" />
            <h3>Exotic Sushi</h3>
            <p>Freshly rolled with a variety of ingredients.</p>
          </div>
        </div>
      </section>

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

        <section className="partner-section">
          <h2>How to Become a Partner</h2>
          <p>Join us and start offering your meals to a wider audience. Partner with us to expand your reach and increase sales.</p>
          <a href="/become-a-partner" className="btn-partner">Become a Partner</a>
        </section>

        <section class="testimonials-partners-section">
  <div class="testimonials-container">
    <h2>What Our Customers Say</h2>
    <div class="testimonials">
      <div class="testimonial">
        <p>"Great service and fantastic experience!"</p>
        <p>- Customer 1</p>
      </div>
      <div class="testimonial">
        <p>"I love the quality and customer support!"</p>
        <p>- Customer 2</p>
      </div>
    </div>
  </div>

  <div class="partners-container">
    <h2>What Our Partners Say</h2>
    <div class="partners">
      <div class="partner">
        <p>"Working with this company has been a pleasure."</p>
        <p>- Partner 1</p>
      </div>
      <div class="partner">
        <p>"Their professionalism and reliability are unmatched."</p>
        <p>- Partner 2</p>
      </div>
    </div>
  </div>
</section>


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

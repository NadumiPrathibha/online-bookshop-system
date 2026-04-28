import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <header className="home-header">
        <nav className="navbar">
          <div className="navbar-logo">
            <div className="nav-logo">📚 BookStore</div>
          </div>
          <ul className="nav-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1><span className="gradient-text">📖Welcome to the BookStore📖</span> </h1>
            <p>Dive into a world of endless adventures, knowledge, and love for reading!</p>
            <div className="hero-buttons">
              <Link to="/BookList" className="btn-primary">Explore Now</Link>
              <Link to="/signup" className="btn-secondary">Join Us</Link>
            </div>
          </div>
        </div>
        <div className="hero-image">
  <img src="/images/Home.png" alt="Books" />
</div>
      </section>
     
      {/* Featured Section */}
      <section className="featured">
        <h2 className="featured-title">Top Picks for You</h2>
        <div className="featured-cards">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba" alt="Book 1" />
            <h3>Fictional Wonders</h3>
            <p>Explore magical stories that spark your imagination.</p>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66" alt="Book 2" />
            <h3>Learning & Growth</h3>
            <p>Expand your mind with top-rated non-fiction titles.</p>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" alt="Book 3" />
            <h3>Romantic Journeys</h3>
            <p>Fall in love with heartwarming tales and characters.</p>
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default Home;

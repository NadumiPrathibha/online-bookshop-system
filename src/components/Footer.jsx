// src/components/Footer.js
import React from 'react';
import './Navbar.css'; // Reuse styles from Navbar

const Footer = () => {
  return (
    <footer className="footer">
    <div className="nav-logo footer-logo">📚 BookStore © {new Date().getFullYear()}</div>

    </footer>
  );
};

export default Footer;

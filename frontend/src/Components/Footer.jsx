import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p> streaming the latest movies.</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-media">
            <li><a href="#facebook" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="#twitter" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="#instagram" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="#linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Shekh Akhlaque. All Rights Reserved.</p>
        <p className="admin-link" >
            <Link to="/admin-Login"  style={{color:"white"}}>Admin Access</Link>
          </p>
      </div>
    </footer>
  );
};

export default Footer;

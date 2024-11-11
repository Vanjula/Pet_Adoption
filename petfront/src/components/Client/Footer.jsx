import React from "react";
import Group from "../assets/Group.svg";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section portion1">
        <div className="footer-title">
          <img src={Group} alt="Pet Dabang Logo" className="icon-logo" />
          <p className="brand-name">Pet Dabang</p>
        </div>
        <p className="footer-description">
          Your one-stop shop for all pet needs. We provide premium pet food,
          accessories, and grooming services to keep your pets healthy and
          happy.
        </p>
        <div className="social-links">
          <FaFacebook className="social-icon" />
          <FaInstagram className="social-icon" />
          <FaTwitter className="social-icon" />
          <RiTwitterXFill className="social-icon" />
        </div>
      </div>
      <div className="footer-section">
        <h3>Company</h3>
        <ul>
          <li>About Us</li>
          <li>Blog</li>
          <li>Gift Cards</li>
          <li>Careers</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Useful Links</h3>
        <ul>
          <li>New Products</li>
          <li>Best Sellers</li>
          <li>Discount</li>
          <li>F.A.Q</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Store</h3>
        <p>8592 Fairground St. Tallahassee, FL 32303</p>
        <p>+775 378-6348</p>
        <p>contact@petdabang.com</p>
      </div>
    </div>
  );
};

export default Footer;

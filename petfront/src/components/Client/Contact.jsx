import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Shape from "../assets/Shape.svg";
import Bird from "../assets/bird.png";
import Vector from "../assets/Vector.svg";
import dog_img from "../assets/dog_img.png";

const Contact = () => {
  return (
    <div className="Contact">
      <Header />
      <div className="vallin-section">
        <div className="vallin-left">
          <h1 className="brand-title">Pet Dabang</h1>
          <div className="vallin-header">
            <h1 className="vallin-title">
              A Pet Store with Everything You Need
            </h1>
            <p className="vallin-description">
              We’re excited to help you find your new furry friend! Our team is
              here to assist you in the adoption process and answer any
              questions you may have.
            </p>
            <button className="cta-button">Shop Now</button>
          </div>
        </div>
        <div className="vallin-right">
          <h2 className="get-in-touch-title">Get in Touch</h2>
          <p className="get-in-touch-description">
            Have questions? We’d love to hear from you! Fill out our contact
            form to reach out to our team.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="ContactSection">
        <div className="ContactForm">
          <h2>Feel free to contact us</h2>
          <form>
            <div className="form-row">
              <input type="text" name="firstName" placeholder="First name" />
              <input type="text" name="lastName" placeholder="Last name" />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder="E-mail address" />
            </div>
            <div className="form-row">
              <textarea name="message" placeholder="Your message..." />
            </div>
            <button type="submit" className="SendMessageBtn">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="ContactInfo">
          <p>Find your perfect companion and start a new chapter together.</p>
          <div className="ContactDetails">
            <div>
              <i className="fas fa-map-marker-alt"></i>15, Gandhi Street, Anna
              Nagar, Chennai, Tamil Nadu 600040
            </div>
            <div>
              <i className="fas fa-envelope"></i>petdabang.gmail.com
            </div>
            <div>
              <i className="fas fa-phone"></i>+379 871-8371
            </div>
            <div>
              <i className="fas fa-clock"></i> Mon - Fri: 10AM - 10PM
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="MapSection">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.841101678776!2d-73.84512382477834!3d40.725900544946295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c26049047cfb69%3A0x2a0f8ebdf2a7e412!2sForest%20Hills%2C%20NY!5e0!3m2!1sen!2sus!4v1606782545582!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Our Location"
        ></iframe>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Contact;

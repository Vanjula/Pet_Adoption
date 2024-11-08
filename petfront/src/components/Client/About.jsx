import React from 'react';
import Header from './Header';
import Footer from './Footer'; // Assuming you already have the Footer component
import Shape from "../assets/Shape.svg";
import Bird from "../assets/bird.png";
import Vector from "../assets/Vector.svg";
import dog_img from "../assets/Fish.png";
import teamMember1 from "../assets/member1.png"; // Replace with actual images
import teamMember2 from "../assets/member1.png";
import teamMember3 from "../assets/member1.png";
import DD from "../assets/dd.jpg";
import AD from "../assets/adope.png";

const About = () => {
  return (
    <div className="About">
      <Header />

      <div className="AdoptionPage" style={{ 
        animation: 'fadeIn 2s ease' 
      }}>
        <div className="AdoptionContent" style={{ 
          animation: 'slideUp 2s ease' 
        }}>
          <h4 className="subtitle">Dabang</h4>
          <h1 className="title">Adopt a Pet</h1>
          <p className="description">
          Every pet deserves a loving home, and we’re here to make that happen. Through our adoption program, we connect animals with caring families, creating meaningful connections that enrich both lives. Adopting a pet means opening your heart and home to a loyal companion.


          </p>
          <div className="buttons">
            
          </div>
        </div>
        <div className="PetImage">
          <img src={DD} alt="Adoptable pet" className="PetImg" style={{
            animation: 'slideDown 2s ease'
          }} />
        </div>
      </div>

      {/* Additional Content Starts Here */}
      <div className="about-container" style={{ animation: 'fadeIn 2s ease' }}>
        <section className="about-details" style={{ animation: 'slideUp 2s ease' }}>
          <h2>Our Adoption Process</h2>
          <p>We offer a wide selection of products for dogs, cats, and small animals. Our goal is to provide the best for your pets.</p>
          <p>Meet Our Pets: Visit our shelter or browse our online gallery to learn about the pets looking for a home.</p>

          <p>Get to Know Them: Spend time with your potential new pet to make sure it’s a good fit for both of you.</p>

            <p>Complete the Adoption: Our staff will guide you through the easy adoption process, providing support every step of the way.</p>
          <div className="about-stats" style={{ animation: 'slideInLeft 2s ease' }}>
            <div className="stat">
              <h3>2k+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat">
              <h3>72</h3>
              <p>Products</p>
            </div>
            <div className="stat">
              <h3>1.8k+</h3>
              <p>Reviews</p>
            </div>
            <div className="stat">
              <h3>28</h3>
              <p>Years in Business</p>
            </div>
          </div>
        </section>

        <section className="team-section" style={{ animation: 'fadeIn 2s ease' }}>
          <h2>Our Team</h2>
          <div className="team-members" style={{ animation: 'slideInLeft 2s ease' }}>
            <div className="team-member">
              <img src={teamMember1} alt="Caroline Washington" />
              <h3>Caroline Washington</h3>
              <p>Founder</p>
            </div>
            <div className="team-member">
              <img src={teamMember2} alt="Gerald Ferguson" />
              <h3>Gerald Ferguson</h3>
              <p>Trainer</p>
            </div>
            <div className="team-member">
              <img src={teamMember3} alt="Avery Maddox" />
              <h3>Avery Maddox</h3>
              <p>Stylist</p>
            </div>
          </div>
        </section>
      </div>

      <section className="testimonials-section" style={{ animation: 'fadeIn 2s ease' }}>
        <h2>What people say about us</h2>
        <div className="testimonial" style={{ animation: 'slideUp 2s ease' }}>
          <div className="testimonial-content">
            <div className="stars">
              <span>★ ★ ★ ★ ★</span>
            </div>
            <p>
            “Adopting from this shelter was a wonderful experience! The staff was so helpful, and our new pet has brought so much joy to our lives.”
            </p>
            <h3>Support Our Mission</h3>
            <p className="testimonial-role">Make a Donation: If adoption isn’t right for you at the moment, consider supporting us through a donation. Your contributions help us provide food, shelter, and medical care for our animals, and every bit helps us reach more pets in need.

</p>
          </div>
          <div className="testimonial-img">
            <div className="image-frame">
              <img src={AD} alt="Gerald Ferguson" />
            </div>
          </div>
        </div>
      
      
      </section>

      <Footer />
    </div>
  );
}

export default About;

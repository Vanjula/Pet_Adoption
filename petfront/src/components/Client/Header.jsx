import React, { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import Group from "../assets/Group.svg";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Icon for the menu button

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Toggle the menu display on smaller screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="ClientHeader">
      <div className="topbar">
        <div className="phoneandemail">
          <div>
            <IoIosCall /> <p>+379 871-8371</p>
          </div>
          <div>
            <MdEmail /> <p>shyamsaran6.02.2005@gmail.com</p>
          </div>
        </div>
        <div className="address">
          <CiLocationOn />
          <p> B592 Fairlandground, Tallahassee, FL 32303 </p>
        </div>
      </div>

      <div className="Navbar">
        <div>
          <img src={Group} alt="pam" />
          <p>Dabang</p>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>

        <ul className={isMenuOpen ? "show" : ""}>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Shop" onClick={toggleMenu}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/Category" onClick={toggleMenu}>
              Adoption
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" onClick={toggleMenu}>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/Contact" onClick={toggleMenu}>
              Contact us
            </NavLink>
          </li>
          <li>
            <NavLink to="/About" onClick={toggleMenu}>
              About us
            </NavLink>
          </li>
        </ul>

        <div className="NavbarRight">
          {!token && (
            <>
              <NavLink to="/login" onClick={toggleMenu}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={toggleMenu}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

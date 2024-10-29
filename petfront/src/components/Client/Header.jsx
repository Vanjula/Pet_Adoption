import React from 'react'
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import Group from '../assets/Group.svg'
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const Header = () => {
  return (
    <div className="ClientHeader">
      <div className="topbar">
        <div className="phoneandemail">
          <div>
            <IoIosCall /> <p>+379 871-8371</p>
          </div>
          <div>
            <MdEmail /> <p>shyamsaran6.02.2005@gmail.com </p>
          </div>
        </div>
        <div className="address">
          <CiLocationOn />
          <p> B592 Fairlandground,Tallballhasse,FL 32303 </p>
        </div>
      </div>
      <div className="Navbar">
        <div>
          <img src={Group} alt="pam" />
          <p>Dabang</p>
        </div>
        <ul>
          <li>
            <NavLink to="/Home" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Shop" activeClassName="active">
              Shop
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to="/About" activeClassName="active">
              About us
            </NavLink>
          </li>{" "}
          <li>
            <NavLink to="/Category" activeClassName="active">
              Adoption
            </NavLink>
          </li>
          <li>
            <NavLink to="/Contact" activeClassName="active">
              Contact us
            </NavLink>
          </li>
        </ul>{" "}
        <div className="NavbarRight">
          <form action="">
            <input type="text" placeholder="Search ....." />
            <FaSearch />
          </form>
          <FaHeart />
          <FaShoppingCart />
        </div>
      </div>
    </div>
  );
}

export default Header
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdLeaderboard,
  MdOutlineSpaceDashboard,
  MdOutlinePets,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { GiCarrier } from "react-icons/gi";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegMessage } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import Dummy from "../assets/dummy logo.svg";

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="SidebarHeader">
        <img src={Dummy} alt="" className="SidebarLogo" />
        <h3 className="SidebarTitle">Dabang</h3>
      </div>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <MdOutlineSpaceDashboard /> <p>Dashboard</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/requests"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <MdLeaderboard /> <p>Adoption Requests</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <GiCarrier /> <p>Orders</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <MdOutlinePets /> <p>Pet Products</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/pet"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <MdOutlinePets /> <p>Pet</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/product-limits"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <MdOutlineProductionQuantityLimits /> <p>Pet Product Limits</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/messages"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaRegMessage /> <p>Messages</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/sign-out"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <PiSignOut /> <p>Sign Out</p>
          </NavLink>
        </li>
      </ul>
      <div className="DashboardCards">
        <span className="circle1"></span>
        <span className="circle2"></span>
        <img src={Dummy} alt="" />
        <h4>Dabang Pro</h4>
        <div className="SiderTexts">
          <p>Get access to all</p>
          <p>features on tetumbas</p>
        </div>
        <button>Get Pro</button>
      </div>
    </div>
  );
}

export default Sidebar;

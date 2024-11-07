import React from "react";
import { NavLink } from "react-router-dom";
import { MdLeaderboard } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GiCarrier } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegMessage } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
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
          <NavLink to="/dashboard" activeClassName="active">
            <MdOutlineSpaceDashboard /> <p>Dashboard</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/requests" activeClassName="active">
            <MdLeaderboard /> <p>Adoption Requests</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/orders" activeClassName="active">
            <GiCarrier /> <p>Orders</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/products" activeClassName="active">
            <MdOutlinePets /> <p>Pet Products</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/pet" activeClassName="active">
            <MdOutlinePets /> <p>Pet</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/product-limits" activeClassName="active">
            <MdOutlineProductionQuantityLimits /> <p>Pet Product Limits</p>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/dashboard/sales-report" activeClassName="active">
            <BsGraphUpArrow /> <p>Sales Report</p>
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/dashboard/messages" activeClassName="active">
            <FaRegMessage /> <p>Messages</p>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/dashboard/food" activeClassName="active">
            <IoSettings /> <p>Pet Food</p>
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/dashboard/sign-out" activeClassName="active">
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
          <p>feaures on tetumbas</p>
        </div>
        <button>Get Pro</button>
      </div>
    </div>
  );
}

export default Sidebar;

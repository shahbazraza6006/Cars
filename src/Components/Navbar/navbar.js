import React from "react";
import "./navbar.css";
import CarLogo from "../../assets/logo8.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import cart from "../../assets/cart.png"
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
   
    navigate("/login");
    window.location.reload();
    
  };
  return (
    <div className="mainnav">
      <div className="left-divnav">
        <img src={CarLogo} alt="logo" />
      </div>
      <div className="right-divnav">
        <ul>
          <a href="/">
            <li>Home</li>
          </a>
        
          <a href="/displaycar">
            <li>Car Inventory</li>
          </a>
          <Link path="/" onClick={handleLogout}>
          <li>Logout</li>
          </Link>
          <img src={cart}></img>
          <p>1</p>
         
           
         
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

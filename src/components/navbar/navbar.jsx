import './navbar.css';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Navbar = ({isAuthenticated, handleLogout}) => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const openNav = () => {
    setIsNavOpen(true);
};

const closeNav = () => {
    setIsNavOpen(false);
};
    
return (
        <>
 <nav> 
   {/* Hamburger-menu ikon för att öppna sidenav */}
   <span className="hamburger" onClick={openNav}>&#9776;</span>      
<ul id="sidenav" className={`sidenav ${isNavOpen ? 'open' : ''}`}>
<li>
   <a href="#!" className="closebtn" onClick={closeNav}>&times;</a>
</li>
  <li id='active-link'>
    <NavLink 
    to="/" 
    onClick={closeNav}>
      Home
    </NavLink>
  </li>
   
  <li id='active-link'>
   {!isAuthenticated ? (
    <NavLink 
    to="/login" 
    onClick={closeNav}>
      Logga in
      </NavLink> ) : (
      <NavLink 
      to="/login" onClick={(e) => {
        e.preventDefault(); // Förhindra standardlänkens beteende
        handleLogout(); // Kör utloggningslogiken
        closeNav(); // Stäng sidenav efter utloggning
    }}> <span>Logga ut</span></NavLink>
  )} 
  </li>
  <li id='active-link'>
    <NavLink 
    to="/register"
    onClick={closeNav}>
      Registrera dig 
    </NavLink>
  </li>
  {/* Visa endast om användaren är inloggad */}
  {isAuthenticated && (
  <li id='active-link'>
    <NavLink 
    to="/chat"
    onClick={closeNav}>
      Chatta
    </NavLink>
  </li>
  )}
</ul>
</nav>



  </> 
   );
};

export default Navbar;
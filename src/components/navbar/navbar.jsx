import './navbar.css';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Navbar = ({isAuthenticated, handleLogout}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
    const openNav = () => {
      setIsNavOpen(true);
      document.getElementById("main-content").classList.add("shifted"); // Knuffa innehållet åt höger
};

    const closeNav = () => {
      setIsNavOpen(false);
      document.getElementById("main-content").classList.remove("shifted"); // Återställ innehållet
};
    
return (
  <>
    <nav> 
      {/* Hamburger-meny ikon för att öppna sidenav */}
      <span className="hamburger" onClick={openNav}>&#9776;</span>      
      <ul id="sidenav" className={`sidenav ${isNavOpen ? 'open' : ''}`}>
        <li>
          <a href="#!" className="closebtn" onClick={closeNav}>&times;</a>
        </li>
        <li className='active-link' id='first-link'>
          <NavLink 
          to="/" 
          onClick={closeNav}>
          Home
          </NavLink>
        </li>
   
        <li className='active-link' >
            {!isAuthenticated ? (
          <NavLink 
          to="/Login" 
          onClick={closeNav}>
          Logga in
          </NavLink> ) : (
          <NavLink 
          to="/Login" onClick={(e) => {
          e.preventDefault(); // Förhindra standardlänkens beteende
          handleLogout(); // Kör utloggningslogiken
          closeNav(); // Stäng sidenav efter utloggning
        }}> 
          <span>Logga ut</span></NavLink>
       )} 
        </li>
        <li className='active-link' >
          <NavLink 
          to="/Register"
          onClick={closeNav}>
          Registrera dig 
          </NavLink>
        </li>
        {/* Visa endast om användaren är inloggad */}
        {isAuthenticated && (
        <li className='active-link' >
          <NavLink 
          to="/Chat"
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
import './navbar.css';
import { NavLink } from "react-router-dom";

const Navbar = ({isAuthenticated, handleLogout}) => {
    return (
        <>
 <nav>       
<ul id="sidenav" >
<li id='active-link'>
    <NavLink to="/">Home</NavLink>
    </li>
   
  <li id='active-link'>
   {!isAuthenticated ? (
   <NavLink to="/login">Logga in</NavLink> ) : (
  <NavLink to="/login"> <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logga ut</span></NavLink>
  )} 
    </li>
  <li id='active-link'>
  <NavLink to="/register">Registrera dig </NavLink>
  </li>
  {/* Visa endast om användaren är inloggad */}
  {isAuthenticated && (
  <li id='active-link'>
  <NavLink to="/chat">Chatta</NavLink>
  </li>
  )}
</ul>
</nav>

  </>  );
};

export default Navbar;
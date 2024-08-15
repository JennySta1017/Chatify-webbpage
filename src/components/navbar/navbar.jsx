import './navbar.css';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
 <nav>       
<ul id="sidenav" class="sidenav">
   
  <li>
    <NavLink to="/login">Logga in</NavLink>
    </li>
  <li>
  <NavLink to="/register">Registrera dig </NavLink>
  </li>
  <li>
  <NavLink to="/chat">Chatta</NavLink>
  </li>
  
</ul>
</nav>

  </>  );
};

export default Navbar;
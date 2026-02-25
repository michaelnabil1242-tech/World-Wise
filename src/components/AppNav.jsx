import { NavLink } from "react-router-dom";
import stlyles from "./AppNav.module.css";
function AppNav() {
  return (
    <nav className={stlyles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;

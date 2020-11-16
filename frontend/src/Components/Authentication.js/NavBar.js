import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../Utils/Firebase";
import "../../CSS/NavBar.CSS";
const NavBar = () => {
  return (
    <>
      <div>
        <nav>
          <NavLink exact to={"/"}>
            Home
          </NavLink>
          <NavLink to={"/posts"}>All posts</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/signup"}>Sign Up</NavLink>
          <NavLink to={"/users/:id"}>User</NavLink>

          <Link to="/" className="button">
            Sign Out
          </Link>
        </nav>
      </div>
    </>
  );
};
export default NavBar;

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/navbar.component";

const NavbarLayout = () => {
  return (
    <div>
      <Navbar state={'signed_in'}/>
      <Outlet />
    </div>
  );
};

export default NavbarLayout;
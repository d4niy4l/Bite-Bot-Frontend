import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/navbar.component";
import { CartProvider } from "../context/cart-context/cart-context.jsx";
import CartModal from "../components/Cart-Modal/cart-modal.jsx";

const NavbarLayout = () => {
  return (
    <CartProvider>
      <div>
        <Navbar state={'signed_in'}/>
        <CartModal />
        <Outlet />
      </div>
    </CartProvider>
  );
};

export default NavbarLayout;
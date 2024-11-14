import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/navbar.component";
import { CartProvider } from "../context/cart-context/cart-context.jsx";
import CartModal from "../components/Cart-Modal/cart-modal.jsx";
import Toast from "../components/Toast-Container/toast-container.jsx";

const NavbarLayout = () => {
  return (
    <CartProvider>
      <div>
        <Navbar state={'signed_in'}/>
        <CartModal />
        <Outlet />
        <Toast/>
      </div>
    </CartProvider>
  );
};

export default NavbarLayout;
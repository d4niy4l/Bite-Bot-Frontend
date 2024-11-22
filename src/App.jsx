import './App.css';
import { Route, Routes } from 'react-router-dom';

//layouts
import PlaneLayout from './layouts/plain-layout.component';
import NavbarLayout from './layouts/navbar-layout.component';

//pages
import Login from './pages/customer-pages/Login/login.page';
import Products from './pages/customer-pages/Products/products.page';
import ProductDetails from './pages/customer-pages/Product-Details/product-details.page';
import Chat from './pages/customer-pages/Chat/chat.page';
import TrackOrder from './pages/customer-pages/Track-Order/track-order.page';
import Checkout from './pages/customer-pages/Checkout/checkout.page';
import Orders from './pages/customer-pages/Orders/order.page';
import VerifyOTP from './pages/customer-pages/Verify-OTP/verify-otp.page';
import SidebarLayout from './layouts/sidebar-layout';
import ManageProducts from './pages/admin-pages/Manage-Product/manage-products';
function App() {
  return (
    <>
      <Routes>
        <Route element={<PlaneLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP/>} />
        </Route>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />\
          <Route path="/chat" element={<Chat />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route  element = {<SidebarLayout />} >
          <Route path="/admin/products" element={<ManageProducts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

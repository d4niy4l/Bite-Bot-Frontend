import './App.css';
import { Route, Routes } from 'react-router-dom';

//layouts
import WithoutNavbarLayout from './layouts/without-navbar-layout.component';
import NavbarLayout from './layouts/navbar-layout.component';

//pages
import Login from './pages/Login/login.page';
import Products from './pages/Products/products.page';
import ProductDetails from './pages/Product-Details/product-details.page';
import Chat from './pages/Chat/chat.page';
import TrackOrder from './pages/Track-Order/track-order.page';
import Checkout from './pages/Checkout/checkout.page';
import Orders from './pages/Orders/order.page';
import VerifyOTP from './pages/Verify-OTP/verify-otp.page';
function App() {
  return (
    <>
      <Routes>
        <Route element={<WithoutNavbarLayout />}>
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
      </Routes>
    </>
  );
}

export default App;

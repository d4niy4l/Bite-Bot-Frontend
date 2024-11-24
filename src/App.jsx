import './App.css';
import { Route, Routes } from 'react-router-dom';

//layouts
import PlaneLayout from './layouts/plain-layout.component';
import NavbarLayout from './layouts/navbar-layout.component';

//pages
//CUSTOMER PAGES
import Login from './pages/customer-pages/Login/login.page';
import Products from './pages/customer-pages/Products/products.page';
import ProductDetails from './pages/customer-pages/Product-Details/product-details.page';
import Chat from './pages/customer-pages/Chat/chat.page';
import TrackOrder from './pages/customer-pages/Track-Order/track-order.page';
import Checkout from './pages/customer-pages/Checkout/checkout.page';
import Orders from './pages/customer-pages/Orders/order.page';
import VerifyOTP from './pages/customer-pages/Verify-OTP/verify-otp.page';

//WORKER PAGES
import PrepareOrder from './pages/worker-pages/Prepare Order/prepare-order.page';

//DELIVERY MAN PAGES
import DeliverOrder from './pages/deliveryMan-pages/Deliver-Order/deliver-order.page';

//ADMIN PAGES
import SidebarLayout from './layouts/sidebar-layout';
import ManageProducts from './pages/admin-pages/Manage-Product/manage-products';
import ViewFeedback from './pages/admin-pages/View-Feedback/view-feedback.page';
import ManageWorker from './pages/admin-pages/Manage-Worker/manage-worker';
import AddWorker from './pages/admin-pages/Add-Worker/add-worker';
import UpdateWorker from './pages/admin-pages/Update-Worker/update-worker.page';
import Dashboard from './pages/admin-pages/Dashboard/dashboard.page';
function App() {
  return (
    <>
      <Routes>
        <Route element={<PlaneLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Route>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />\
          <Route path="/chat" element={<Chat />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/orders/prepare" element={<PrepareOrder />} />
        <Route path="/orders/deliver" element={<DeliverOrder />} />

        <Route element={<SidebarLayout />}>
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/feedbacks" element={<ViewFeedback />} />
          <Route path="/admin/workers" element={<ManageWorker />} />
          <Route element={<ManageWorker />}>
            <Route path="/admin/workers/add" element={<AddWorker />} />
            <Route path="/admin/workers/update" element={<UpdateWorker />} />
          </Route>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

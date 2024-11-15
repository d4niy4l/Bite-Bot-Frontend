import './App.css'
import { Route, Routes } from 'react-router-dom'
import WithoutNavbarLayout from './layouts/without-navbar-layout.component'
import NavbarLayout from './layouts/navbar-layout.component'
import Login from './pages/Login/login.component'
import Products from './pages/Products/products.component'
import ProductDetails from './pages/Product-Details/product-details.component'
import Chat from './pages/Chat/chat.component'

function App() {

  return (
    <>
      <Routes>
        <Route element = {<WithoutNavbarLayout/>}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<NavbarLayout/>} >
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />\
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

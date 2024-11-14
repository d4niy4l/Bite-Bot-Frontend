import './App.css'
import { Route, Routes } from 'react-router-dom'
import WithoutNavbarLayout from './layouts/without-navbar-layout.component'
import NavbarLayout from './layouts/navbar-layout.component'
import Login from './pages/Login/login.component'
import Products from './pages/Products/products.component'
import ProductDetails from './pages/Product-Details/product-details.component'

function App() {

  return (
    <>
      <Routes>
        <Route element = {<WithoutNavbarLayout/>}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<NavbarLayout/>} >
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

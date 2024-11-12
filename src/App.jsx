import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import WithoutNavbarLayout from './layouts/without-navbar-layout.component'
import NavbarLayout from './layouts/navbar-layout.component'
import Login from './pages/Login/login.component'
import Products from './pages/Products/products.component'

function App() {

  return (
    <>
      <Routes>
        <Route element = {<WithoutNavbarLayout/>}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<NavbarLayout/>} >
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

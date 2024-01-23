import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './styling.css';
import Home from './Components/Home/Home.jsx'
import Navbar from './Components/Navbar/Navbar.jsx';
import NewProduct from './Components/Product/NewProduct.jsx';
import About from './Components/About';
import Cart from './Components/Cart/Cart.jsx';
import Error from './Components/Error';
import Register from './Components/User/Register.jsx';
import Footer from './Components/Footer';
import Login from './Components/User/Login.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import DataProvider from './config/DataProvider.jsx';
import DetailProduct from './Components/Product/DetailProduct.jsx';
import AdminProducts from './Components/Product/AdminProducts.jsx';
// import Checkout from './Components/Checkout.jsx';
// import CheckoutSuccess from './Components/C/heckoutSuccess.jsx';


function App() {

  return (
      <Router>
        {/* Routes are starting from here */}
        <DataProvider>
        <Routes>
          <Route path={'/home'}  element={<Home />} />
          {/* <Route path={'/admin/products'} element={<AdminProducts />} /> */}
          <Route path={'/products/new'} element={<NewProduct />} />
          <Route path={'/about'} element={<About />} />
          <Route path={'/register'} element={<Register />} />
          {/* <Route path='success-checkout' element={<CheckoutSuccess/>} /> */}
          <Route path={'/login'} element={<Login />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path="/products/:productId" element={<DetailProduct/>} />
          <Route path="*" element={<Error />} />
        </Routes>
        </DataProvider>

      </Router>
  )
}

export default App

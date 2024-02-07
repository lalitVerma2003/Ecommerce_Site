import { useState } from 'react'
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
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import MyOrders from './Components/MyOrders.jsx';


function App() {

  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path={'/register'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/home'} element={<ProtectedRoute component={<Home/>} />} />
          <Route path={'/cart'} element={<ProtectedRoute component={<Cart/>} />} />
          <Route path={'/about'} element={<ProtectedRoute component={<About/>} />} />
          <Route path="/products/:productId" element={<ProtectedRoute component={<DetailProduct/>} />} />
          <Route path={'/products/new'} element={<ProtectedRoute component={<NewProduct/>} />} />
          <Route path={'/myorders'} element={<ProtectedRoute component={<MyOrders/>} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </DataProvider>
    </Router>
  )
}

export default App

import { Suspense } from 'react';
import React from 'react';
const Home = React.lazy(() => import('./Components/Home/Home.jsx'));
const NewProduct = React.lazy(() => import('./Components/Product/NewProduct.jsx'));
const Cart = React.lazy(() => import('./Components/Cart/Cart.jsx'));
const Error = React.lazy(() => import('./Components/Error.jsx'));
const Register = React.lazy(() => import('./Components/User/Register.jsx'));
const Login = React.lazy(() => import('./Components/User/Login.jsx'));
const DetailProduct = React.lazy(() => import('./Components/Product/DetailProduct.jsx'));
import ProtectedRoute from './Components/ProtectedRoute.jsx';
const MyOrders = React.lazy(() => import('./Components/Orders/MyOrders.jsx'));
const CheckoutSuccess = React.lazy(() => import('./Components/CheckoutSuccess.jsx'));
import About from './Components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Home />
          </React.Suspense>
        } />
        <Route path={'/register'} element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Register />
          </React.Suspense>
        } />
        <Route path={'/login'} element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Login />
          </React.Suspense>
        } />
        <Route path={'/cart'} element={<ProtectedRoute component={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </React.Suspense>
        } />} />
        <Route path={'/about'} element={<ProtectedRoute component={<About />} />} />
        <Route path="/products/:productId" element={
          <React.Suspense fallback={<div>Loading...</div>}>
          <DetailProduct />
        </React.Suspense>
        } />
        <Route path={'/products/new'} element={<ProtectedRoute component={
          <React.Suspense fallback={<div>Loading...</div>}>
            <NewProduct />
          </React.Suspense>
        } />} />
        <Route path={'/myorders'} element={<ProtectedRoute component={
          <React.Suspense fallback={<div>Loading...</div>}>
            <MyOrders />
          </React.Suspense>
        } />} />
        <Route path='/success-checkout' element={<CheckoutSuccess />} />
        <Route path='/orders' element={<ProtectedRoute component={<MyOrders />} />} />
        <Route path="*" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Error />
          </React.Suspense>
        } />
      </Routes>
    </Router>
  )
}

export default App;
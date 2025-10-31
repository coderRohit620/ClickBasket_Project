import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Products from './Pages/Products.jsx';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Orders from './Pages/Orders';
import ChangePassword from './Pages/ChangePassword';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar/>
          <div className="min-h-screen pt-20">
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/products' element={<Products/>}></Route>
              <Route path='/product/:id' element={<ProductDetail/>}></Route>
              <Route path='/contact' element={<Contact/>}></Route>
              <Route path='/cart' element={<Cart/>}></Route>
              <Route path='/checkout' element={<Checkout/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/orders' element={<Orders/>}></Route>
              <Route path='/change-password' element={<ChangePassword/>}></Route>
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import logo from '../assets/logo.png'
import ImageSearch from './ImageSearch'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className='bg-gray-800 text-white py-4 shadow-2xl'>
      <div className='container mx-auto px-4 flex justify-between items-center'>
        <Link to='/' className='flex items-center'>
          <img src={logo} alt="ClickBasket Logo" className="h-16 w-auto object-contain my-0" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className='hidden md:flex space-x-8'>
          <Link to='/' className='hover:text-gray-300 transition duration-300'>Home</Link>
          <Link to='/products' className='hover:text-gray-300 transition duration-300'>Products</Link>
          <Link to='/contact' className='hover:text-gray-300 transition duration-300'>Contact</Link>
        </div>
        
        {/* Search Bar */}
        <div className='hidden md:block flex-grow mx-4 max-w-md'>
          <form onSubmit={handleSearch} className='flex'>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Cart Icon and Auth */}
        <div className='hidden md:flex items-center space-x-6'>
          <ImageSearch />
          <Link to='/cart' className='flex items-center space-x-1 hover:text-gray-300 transition duration-300 relative'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-1 hover:text-gray-300 transition duration-300 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span>{user?.name?.split(' ')[0] || 'User'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-gray-300 transition duration-300">
                Sign in
              </Link>
              <Link to="/register" className="bg-white text-gray-800 px-3 py-1 rounded-md hover:bg-gray-200 transition duration-300">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className='md:hidden text-white focus:outline-none'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-gray-700 px-4 py-2'>
          {/* Mobile Search Bar */}
          <div className='py-2'>
            <form onSubmit={handleSearch} className='flex'>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
          
          <div className='flex flex-col space-y-3'>
            <Link to='/' className='block py-2 hover:text-gray-300 transition duration-300'>Home</Link>
            <Link to='/products' className='block py-2 hover:text-gray-300 transition duration-300'>Products</Link>
            <Link to='/contact' className='block py-2 hover:text-gray-300 transition duration-300'>Contact</Link>
            <div className='block py-2 hover:text-gray-300 transition duration-300'>
              <ImageSearch />
            </div>
            <Link to='/cart' className='block py-2 hover:text-gray-300 transition duration-300 flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart {totalItems > 0 && <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">{totalItems}</span>}
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-600 my-1 pt-2">
                  <div className="flex items-center space-x-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span>{user?.name || 'User'}</span>
                  </div>
                </div>
                <Link to="/profile" className='block py-2 hover:text-gray-300 transition duration-300'>Your Profile</Link>
                <Link to="/orders" className='block py-2 hover:text-gray-300 transition duration-300'>Your Orders</Link>
                <button
                  onClick={logout}
                  className="block py-2 hover:text-gray-300 transition duration-300 text-left w-full"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-600 my-1 pt-2"></div>
                <Link to="/login" className='block py-2 hover:text-gray-300 transition duration-300'>Sign in</Link>
                <Link to="/register" className='block py-2 hover:text-gray-300 transition duration-300'>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
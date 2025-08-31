import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Mock order data - in a real app, this would come from an API
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1234-5678',
      date: '2023-06-15',
      total: 124.95,
      status: 'Delivered',
      items: [
        { id: 1, name: 'Organic Apples', price: 4.99, quantity: 2, image: '/images/products/apples.jpg' },
        { id: 5, name: 'Fresh Bread', price: 3.49, quantity: 1, image: '/images/products/bread.jpg' },
        { id: 8, name: 'Organic Milk', price: 3.99, quantity: 2, image: '/images/products/milk.jpg' }
      ]
    },
    {
      id: 'ORD-8765-4321',
      date: '2023-05-28',
      total: 78.50,
      status: 'Delivered',
      items: [
        { id: 3, name: 'Chicken Breast', price: 12.99, quantity: 1, image: '/images/products/chicken.jpg' },
        { id: 7, name: 'Pasta', price: 2.49, quantity: 2, image: '/images/products/pasta.jpg' },
        { id: 12, name: 'Orange Juice', price: 4.99, quantity: 1, image: '/images/products/juice.jpg' }
      ]
    }
  ]);
  
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    // In a real app, you would fetch orders from an API here
    // Example: fetchOrders(user.id).then(data => setOrders(data));
  }, [isAuthenticated, navigate]);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to place your first order!</p>
            <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                      <p className="text-gray-600 text-sm mt-1">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} mr-4`}>
                        {order.status}
                      </span>
                      <span className="font-semibold text-lg mt-2 md:mt-0">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => toggleOrderDetails(order.id)}
                    className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center focus:outline-none"
                  >
                    {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                {expandedOrder === order.id && (
                  <div className="p-6 bg-gray-50">
                    <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <p className="mt-1 text-sm text-gray-500">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="font-medium">${(order.total * 0.9).toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <p className="text-gray-600">Shipping</p>
                        <p className="font-medium">$5.00</p>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <p className="text-gray-600">Tax</p>
                        <p className="font-medium">${(order.total * 0.1).toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                        <p className="text-base font-medium">Total</p>
                        <p className="text-base font-bold">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Track Package
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Buy Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
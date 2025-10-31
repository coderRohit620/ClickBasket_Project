import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading products from API
    setLoading(true);
    setTimeout(() => {
      setProductList(products);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Get search query from URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    
    if (searchQuery && productList.length > 0) {
      // Filter products based on search query
      const searchLower = searchQuery.toLowerCase();
      const filtered = productList.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
      
      setFilteredProducts(filtered);
      
      // Find related products based on category of searched products
      if (filtered.length > 0) {
        const categories = [...new Set(filtered.map(p => p.category))];
        const related = productList.filter(product => 
          categories.includes(product.category) && 
          !filtered.some(p => p.id === product.id)
        ).slice(0, 4); // Limit to 4 related products
        
        setRelatedProducts(related);
      } else {
        setRelatedProducts([]);
      }
    } else {
      setFilteredProducts(productList);
      setRelatedProducts([]);
    }
  }, [location.search, productList]);

  const isSearchActive = new URLSearchParams(location.search).get('search');
  const displayProducts = isSearchActive ? filteredProducts : productList;

  return (
    <div className="container mx-auto px-4 py-8">
      {isSearchActive && (
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{new URLSearchParams(location.search).get('search')}"
        </h1>
      )}
      
      {!isSearchActive && (
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading products...</p>
        </div>
      ) : (
        <>
          {isSearchActive && displayProducts.length === 0 ? (
            <div className="mb-8">
              <p className="text-xl">No products found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {displayProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {isSearchActive && relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageSearch = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (!image) return;
    
    setIsSearching(true);
    
    // In a real application, you would send the image to a backend API
    // for processing and image recognition. For this demo, we'll simulate
    // a search by redirecting to the products page after a delay.
    setTimeout(() => {
      setIsSearching(false);
      navigate('/products');
      // You could also pass search parameters: navigate('/products?imageSearch=true')
    }, 1500);
  };

  const handleClear = () => {
    setImage(null);
    setPreviewUrl('');
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
        onClick={() => document.getElementById('imageSearchInput').click()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="ml-1 hidden md:inline">Search by Image</span>
      </button>
      
      <input
        type="file"
        id="imageSearchInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      
      {previewUrl && (
        <div className="absolute right-0 top-10 z-50 bg-white rounded-lg shadow-xl p-4 w-64">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Image Search</h3>
            <button 
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-40 object-cover rounded-md"
            />
            {isSearching && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
          
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className={`mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSearching ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
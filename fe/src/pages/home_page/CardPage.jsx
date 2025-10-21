import { Link } from "react-router-dom";

import React from 'react';

/**
 * A reusable product card component for an e-commerce website.
 * @param {Object} props
 * @param {string} props.imageUrl - URL for the product image.
 * @param {string} props.name - Name of the product.
 * @param {string} props.price - Price of the product (e.g., "$49.99").
 * @param {string} props.vendorName - The name of the seller or author (e.g., "TechZone Pro"). (NEW PROP)
 * @param {string} props.description - Short description of the product.
 * @param {function} props.onAddToCart - Handler for the 'Add to Cart' button.
 * @param {function} props.onAddToWishlist - Handler for the 'Wishlist' button.
 * @param {function} props.onBuyNow - Handler for the 'Buy Now' button.
 */
const ProductCard = ({
  imageUrl,
  name,
  price,
  vendorName, // Destructured the new prop
  description,
  onAddToCart,
  onAddToWishlist,
  onBuyNow,
}) => {
  return (
    // Card container is flexible to stretch with description content
    <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.01] flex flex-col">
      
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRPzNnDH8tN_lgEu93-jYUao6ARpfk7FSCw&s'}
          alt={name || 'Product'}
        />
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col overflow-auto"> 
        
        {/* Product Name and Price Block */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight pr-2" title={name}>{name || 'Product Name'}</h3>
          <p className="text-xl font-bold text-indigo-600 shrink-0">{price || '$0.00'}</p>
        </div>

        {/* Vendor/Author Information (NEW ELEMENT) */}
        <p className="text-xs text-gray-500 mb-3 hover:text-indigo-500 transition duration-150">
          Sold by: <a href="#" className="font-medium">{vendorName || 'Unknown Seller'}</a>
        </p>

        {/* Product Description Box - Fixed size with scroll */}
        <div className="text-sm text-gray-600 mb-4 h-20 overflow-y-auto"> 
          <p>{description || 'A short description of the product. This text box provides key details to the customer.'}</p>
        </div>

        {/* Action Buttons - Pushed to the bottom */}
        <div className="flex flex-col space-y-2 mt-auto"> 
        
          {/* Buy Button */}
          <button
            onClick={onBuyNow}
            className="w-full py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer"
          >
            Message Sender
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
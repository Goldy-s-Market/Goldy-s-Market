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
 * @param {string} props.id - Product ID for linking to individual page.
 * @param {function} props.onAddToCart - Handler for the 'Add to Cart' button.
 * @param {function} props.onAddToWishlist - Handler for the 'Wishlist' button.
 * @param {function} props.onBuyNow - Handler for the 'Buy Now' button.
 */
const ProductCard = ({
  imageUrl,
  name,
  price,
  vendorName, // Destructured the new prop
  id,
  onBuyNow,
}) => {
  return (
    // Card container is fixed-width on larger screens, full-width on mobile
    <div className="w-full sm:w-[300px] md:w-[300px] lg:w-[300px] max-w-[300px] flex-shrink-0 overflow-hidden bg-white rounded-4xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.01] flex flex-col h-full min-h-[450px]">

      {/* Product Image */}
      <Link to={`/listings/${id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRPzNnDH8tN_lgEu93-jYUao6ARpfk7FSCw&s'}
            alt={name || 'Product'}
          />
        </div>
      </Link>

      {/* Card Content Area - use flex-1 so the content grows and the button can be pushed to the bottom with mt-auto */}
      <div className="p-5 flex flex-col flex-1 overflow-hidden">

        {/* Product Name and Price Block */}
        <Link to={`/listings/${id}`} className="block">
          {/* Title needs to truncate if too long. inside a flex box, set min-w-0 so it can shrink then apply truncate */}
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-800 leading-tight pr-2 hover:text-maroon-800 transition-colors flex-1 min-w-0 multiline-ellipsis-3" title={name}>{name || 'Product Name'}</h3>
            <p className="text-xl font-bold text-indigo-600 shrink-0">{price || '$0.00'}</p>
          </div>
        </Link>

        {/* Vendor/Author Information (NEW ELEMENT) */}
        <p className="text-xs text-gray-500 mb-3 hover:text-indigo-500 transition duration-150">
          Sold by: <a href="#" className="font-medium">{vendorName || 'Unknown Seller'}</a>
        </p>


        {/* Action Buttons - Pushed to the bottom */}
        <div className="flex flex-col space-y-2 mt-auto">

          <Link to={`/listings/${id}`}>
            <button
              className="w-full py-2 text-md font-medium text-[#7A0019] border-2 border-[#7A0019] bg-white rounded-2xl hover:bg-maroon-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer"
            >
              View Details
            </button>
          </Link>
          {/* Buy Button */}
          <Link to='/messages'>
            <button
              onClick={onBuyNow}
              className="w-full py-2 text-md font-medium text-white bg-[#7A0019] rounded-2xl hover:bg-maroon-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer"
            >
              Message Sender
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;

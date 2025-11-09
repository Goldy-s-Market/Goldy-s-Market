import { useState, useEffect } from "react";
import ProductCard from "../home_page/CardPage";
import HourGlassLoader from "../Goldy-market-logo/HourGlassLoader";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { listingsAPI, searchAPI } from "../../services/api";

/**
 * Custom hook for fetching listings data
 * 
 * TRANSITION STRATEGY:
 * - CURRENT: Uses fakestoreapi for development/testing
 * - FUTURE: Will use backend API via listingsAPI service
 * 
 * To switch to backend:
 * 1. Uncomment the backend API code in useEffect
 * 2. Comment out the fakestoreapi fetch code
 * 3. Update data mapping if backend structure differs
 * 4. Add categories API call for dynamic category loading
 */
const useListingsData = (selectedCategory = null, searchQuery = '') => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // CURRENT: Testing with fakestoreapi (external API for development/testing)
    const url = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : 'https://fakestoreapi.com/products';

    // FUTURE: Backend API calls using our centralized API service
    // Uncomment the code below and comment out the fakestoreapi code above when ready to use backend
    /*
    const fetchListings = async () => {
      try {
        let data;
        if (searchQuery.trim()) {
          // Search functionality
          data = await searchAPI.searchListings(searchQuery, { category: selectedCategory });
        } else if (selectedCategory) {
          // Category filtering
          data = await listingsAPI.getListingsByCategory(selectedCategory);
        } else {
          // All listings
          data = await listingsAPI.getAllListings();
        }
        setListings(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
    */

    // CURRENT: Using fakestoreapi with fetch
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // TODO: Make backend handle search filtering
        let filteredData = data;
        if (searchQuery.trim()) {
          filteredData = data.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setListings(filteredData);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Error fetching listings:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategory, searchQuery]);

  return { listings, error, loading };
};

function ListingsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { listings, error, loading } = useListingsData(selectedCategory, searchQuery);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col bg-white min-h-screen min-w-screen">
      {/* Need to add a header later */}
      
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 outline-none"
          />
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {/* Clear Search Button */}
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      {/* CURRENT: Hardcoded categories for fakestoreapi */}
      {/* FUTURE: Fetch categories from backend using listingsAPI.getCategories() */}
      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={clearCategoryFilter}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${!selectedCategory
                ? 'bg-maroon-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All Categories
          </button>
          {/* CURRENT: Hardcoded categories for fakestoreapi */}
          {/* FUTURE: Dynamic categories from backend - replace with: {categories.map(category => ...)} */}
          {['electronics', 'books', 'clothing'].map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors
                ${selectedCategory === category
                  ? 'bg-maroon-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {(selectedCategory || searchQuery) && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            {searchQuery && (
              <p>
                Search results for: <span className="font-medium">"{searchQuery}"</span>
                {selectedCategory && (
                  <span> in <span className="font-medium capitalize">{selectedCategory}</span></span>
                )}
              </p>
            )}
            {!searchQuery && selectedCategory && (
              <p>
                Showing listings in: <span className="font-medium capitalize">{selectedCategory}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Actual listings grid starts here */}
      <div className="flex-grow flex justify-center items-center w-full">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <HourGlassLoader />
          </div>
        ) : error ? (
          <div className="text-center py-12 px-4">
            <p className="text-red-600 mb-4">Error loading listings: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-maroon-700 text-white rounded-md hover:bg-maroon-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            {searchQuery ? (
              <div>
                <p className="text-gray-500 mb-2">No listings found for "{searchQuery}"</p>
                <button
                  onClick={clearSearch}
                  className="text-maroon-700 hover:text-maroon-800 underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No listings found.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ProductCard
                key={listing.id}
                // CURRENT: Mapping fakestoreapi data structure
                // FUTURE: Backend data structure may differ - adjust mapping as needed
                id={listing.id}
                imageUrl={listing.image}
                name={listing.title}
                price={`$${listing.price}`}
                vendorName={listing.category}
                description={listing.description}
                // TODO: Implement actual cart/wishlist functionality with backend
                onAddToCart={() => console.log('Add to cart:', listing.title)}
                onAddToWishlist={() => console.log('Add to wishlist:', listing.title)}
                onBuyNow={() => console.log('Buy now:', listing.title)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Link
        to="/listings/add"
        className="fixed bottom-6 right-6 bg-maroon-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-maroon-800 transition-colors z-50"
        title="Add New Listing"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
}

export default ListingsPage;

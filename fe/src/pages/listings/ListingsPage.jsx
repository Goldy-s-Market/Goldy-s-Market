import UniversalHeader from "../../components/UniversalHeader";
import { useState, useEffect } from "react";
import ProductCard from "../home_page/CardPage";
import HourGlassLoader from "../HourGlassLoader";
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
    <div className="fixed w-full max-w-7xl jusitfy-center">
      {/* Universal Header */}
      <UniversalHeader />
      
      {/* Main Content - REMOVED the white background and min-h-screen */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={clearCategoryFilter}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
                ${!selectedCategory
                  ? 'bg-[#7A0019] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'}`}
            >
              All Categories
            </button>
            {['electronics', 'jewelery', "men's clothing", "women's clothing"].map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-200
                  ${selectedCategory === category
                    ? 'bg-[#7A0019] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {(selectedCategory || searchQuery) && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFCC33]/10 border border-[#FFCC33]/30 rounded-full">
                <span className="text-sm text-gray-700">
                  {searchQuery && (
                    <>
                      Results for: <span className="font-semibold text-[#7A0019]">"{searchQuery}"</span>
                      {selectedCategory && (
                        <span> in <span className="font-semibold capitalize text-[#7A0019]">{selectedCategory}</span></span>
                      )}
                    </>
                  )}
                  {!searchQuery && selectedCategory && (
                    <>
                      Category: <span className="font-semibold capitalize text-[#7A0019]">{selectedCategory}</span>
                    </>
                  )}
                </span>
                <button
                  onClick={() => {
                    clearSearch();
                    clearCategoryFilter();
                  }}
                  className="text-gray-500 hover:text-[#7A0019] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!loading && !error && (
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-[#7A0019]">{listings.length}</span> {listings.length === 1 ? 'listing' : 'listings'}
            </p>
          </div>
        )}

        {/* Listings Grid */}
        <div className="min-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <HourGlassLoader />
            </div>
          ) : error ? (
            <div className="text-center py-16 px-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-800 font-semibold mb-2">Oops! Something went wrong</p>
                <p className="text-red-600 text-sm mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 bg-[#7A0019] text-white rounded-full font-semibold hover:bg-[#7A0019]/90 transition-colors shadow-lg"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                {searchQuery ? (
                  <div>
                    <p className="text-gray-700 font-semibold mb-2">No listings found</p>
                    <p className="text-gray-500 text-sm mb-6">
                      We couldn't find any listings matching "{searchQuery}"
                    </p>
                    <button
                      onClick={clearSearch}
                      className="text-[#7A0019] hover:text-[#7A0019]/80 font-semibold underline"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 font-semibold mb-2">No listings available</p>
                    <p className="text-gray-500 text-sm">Check back soon for new items!</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <ProductCard
                  key={listing.id}
                  id={listing.id}
                  imageUrl={listing.image}
                  name={listing.title}
                  price={`$${listing.price}`}
                  vendorName={listing.category}
                  description={listing.description}
                  onAddToCart={() => console.log('Add to cart:', listing.title)}
                  onAddToWishlist={() => console.log('Add to wishlist:', listing.title)}
                  onBuyNow={() => console.log('Buy now:', listing.title)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <Link
        to="/listings/add"
        className="fixed bottom-8 right-8 bg-[#7A0019] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-[#7A0019]/90 transition-all duration-200 hover:scale-110 active:scale-95 z-50 group"
        title="Add New Listing"
      >
        <svg className="w-7 h-7 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
}

export default ListingsPage;

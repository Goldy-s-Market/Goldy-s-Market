import { useState, useEffect } from "react";
import ProductCard from "../home_page/CardPage";
import HourGlassLoader from "../HourGlassLoader";

const useListingsData = (selectedCategory = null) => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Testing with fakestoreapi
    const url = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : 'https://fakestoreapi.com/products';
    // ? `http://localhost/8080/api/listings/category/${selectedCategory}`
    // : '/http://localhost/8080/api/listings';

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setListings(data);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Error fetching listings:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategory]);

  return { listings, error, loading };
};

function ListingsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { listings, error, loading } = useListingsData(selectedCategory);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col bg-white min-h-screen min-w-screen">
      {/* Need to add a header later */}
      {/* Category Filters */}
      {/* TODO: Get a full list of available categories from backend for the future */}
      <div className="mb-8 flex justify-center items-center">
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

        {selectedCategory && (
          <p className="mt-4 text-sm text-gray-600">
            Showing listings in: <span className="font-medium capitalize">{selectedCategory}</span>
          </p>
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
            <p className="text-gray-500">No listings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ProductCard
                key={listing.id}
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
  );
}

export default ListingsPage;

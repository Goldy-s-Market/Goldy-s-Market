import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HourGlassLoader from "../Goldy-market-logo/HourGlassLoader";
// eslint-disable-next-line no-unused-vars
import { listingsAPI } from "../../services/api";

function IndividualListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError(null);

      try {
        // TODO: Use listingsAPI.getListingById(id) when backend is ready
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching listing:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HourGlassLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Listing</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/listings" 
            className="px-4 py-2 bg-maroon-700 text-white rounded-md hover:bg-maroon-800 transition-colors"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Listing Not Found</h1>
          <p className="text-gray-500 mb-4">The listing you're looking for doesn't exist.</p>
          <Link 
            to="/listings" 
            className="px-4 py-2 bg-maroon-700 text-white rounded-md hover:bg-maroon-800 transition-colors"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/listings" 
            className="text-maroon-700 hover:text-maroon-800 font-medium"
          >
            Back to Listings
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              <p className="text-lg text-gray-600 capitalize">{listing.category}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-maroon-700">${listing.price}</span>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{listing.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-maroon-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-maroon-800 transition-colors">
                Contact Seller
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Listing Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="capitalize">{listing.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Product ID:</span>
                  <span>{listing.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seller Rating:</span>
                  <span>{listing.rating?.rate || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualListingPage;

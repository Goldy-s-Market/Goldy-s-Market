import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Bookmark, Trash2, ExternalLink } from "lucide-react";
import UniversalHeader from "../../components/UniversalHeader";
import HourGlassLoader from "../Goldy-market-logo/HourGlassLoader";

/**
 * SavedPage - Displays user's saved/bookmarked items
 * 
 * TRANSITION STRATEGY:
 * - CURRENT: Uses localStorage for saved items (client-side only)
 * - FUTURE: Will integrate with backend API for persistent saved items
 * 
 * To switch to backend:
 * 1. Create savedAPI service in api.js
 * 2. Replace localStorage calls with API calls
 * 3. Add user authentication checks
 */

function SavedPage() {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with backend API call
    // const fetchSavedItems = async () => {
    //   try {
    //     const data = await savedAPI.getUserSavedItems();
    //     setSavedItems(data);
    //   } catch (err) {
    //     console.error('Error fetching saved items:', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // CURRENT: Using localStorage for development
    const loadSavedItems = () => {
      try {
        const saved = localStorage.getItem('savedItems');
        if (saved) {
          setSavedItems(JSON.parse(saved));
        }
      } catch (err) {
        console.error('Error loading saved items:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSavedItems();
  }, []);

  const handleRemoveItem = (itemId) => {
    // TODO: Replace with backend API call
    // await savedAPI.removeSavedItem(itemId);
    
    // CURRENT: Update localStorage
    const updatedItems = savedItems.filter(item => item.id !== itemId);
    setSavedItems(updatedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <UniversalHeader />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <HourGlassLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <UniversalHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Bookmark className="w-8 h-8 text-[#7A0019]" />
            <h1 className="text-3xl font-bold text-gray-900">Saved Items</h1>
          </div>
          <p className="text-gray-600">
            You have {savedItems.length} saved {savedItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Empty State */}
        {savedItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md mx-auto">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No saved items yet</h2>
              <p className="text-gray-500 mb-6">
                Start saving items you're interested in to view them here later
              </p>
              <Link to="/listings">
                <button className="bg-[#7A0019] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#7A0019]/90 transition-all duration-200">
                  Browse Listings
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* Saved Items Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((item) => (
              <SavedItemCard 
                key={item.id} 
                item={item} 
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SavedItemCard({ item, onRemove }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        <img 
          src={item.imageUrl || item.image} 
          alt={item.name || item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 group"
          title="Remove from saved"
        >
          <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.name || item.title}
        </h3>
        
        {item.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#7A0019]">
            {item.price}
          </span>
          {item.vendorName && (
            <span className="text-sm text-gray-500 capitalize">
              {item.vendorName}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link 
            to={`/listings/${item.id}`}
            className="flex-1"
          >
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium">
              <ExternalLink className="w-4 h-4" />
              <span>View</span>
            </button>
          </Link>
          
          <Link 
            to={`/messages?user=${item.sellerId || item.vendorId}`}
            className="flex-1"
          >
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#7A0019] text-white rounded-xl hover:bg-[#7A0019]/90 transition-colors duration-200 font-medium">
              <MessageCircle className="w-4 h-4" />
              <span>Message</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SavedPage;
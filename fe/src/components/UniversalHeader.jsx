import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Plus, MessageCircle, Bookmark, Bell, ChevronDown,Grid2X2,Book,Laptop,Shirt,Sofa,User,Package,Heart, Settings, LogOut, Menu} from 'lucide-react';

function UniversalHeader() {
  const location = useLocation();
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide search bar ONLY on messages page
  const shouldShowSearch = !location.pathname.startsWith('/messages');

  // TODO: Replace with dynamic categories from backend API
  // STATIC DATA - Placeholder categories for UI development
  const categories = [
    { name: 'All Categories', icon: Grid2X2, color: 'text-blue-500' },
    { name: 'Textbooks', icon: Book, color: 'text-green-500' },
    { name: 'Electronics', icon: Laptop, color: 'text-purple-500' },
    { name: 'Clothing', icon: Shirt, color: 'text-[#7A0019]' },
    { name: 'Furniture', icon: Sofa, color: 'text-[#FFCC33]' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm p-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link to="/listings" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="w-16 h-16 bg-umn-maroon rounded-full flex items-center justify-center">
                <img src="/trans_gopher.png" alt="Goldy's Market Logo" className="w-full h-full" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-caveat font-bold text-[#7A0019] tracking-wide">Goldy's Market</h1>
              <p className="text-xs text-gray-500 font-medium">UMN Student Marketplace</p>
            </div>
          </Link>

          {/* Search Section - Hidden on mobile AND hidden on messages page */}
          {shouldShowSearch && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <div className="flex items-center bg-gray-50 rounded-full border-2 border-gray-200 focus-within:border-[#FFCC33] focus-within:bg-white transition-all duration-300 hover:shadow-md">
                  
                  {/* Category Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-[#7A0019] transition-colors duration-200"
                    >
                      <Grid2X2 className="w-4 h-4" />
                      <span className="font-medium">All</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {categoryDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-10">
                        <div className="p-2">
                          {categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                              <button
                                key={category.name}
                                className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                onClick={() => setCategoryDropdownOpen(false)}
                              >
                                <IconComponent className={`w-4 h-4 ${category.color}`} />
                                <span className="font-medium">{category.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-px h-8 bg-gray-300"></div>
                  
                  {/* TODO: Connect search to backend API */}
                  <input 
                    type="text" 
                    placeholder="Search for textbooks, electronics, furniture..." 
                    className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                  />
                  
                  <button className="px-6 py-3 bg-[#7A0019] text-white rounded-full hover:bg-[#7A0019]/90 transition-all duration-200  active:scale-95">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Actions Section - Hidden on mobile, ALWAYS VISIBLE on desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Sell Item Button - ALWAYS VISIBLE */}
            <Link to="/listings/add">
              <button className="relative overflow-hidden bg-[#7A0019] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#7A0019]/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                <span className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Sell Item</span>
                </span>
              </button>
            </Link>

            {/* Icon Actions - ALWAYS VISIBLE */}
            <div className="flex items-center space-x-3">
              <Link to="/messages">
                <button className="relative p-3 text-gray-600 hover:text-[#7A0019] hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110">
                  <MessageCircle className="w-5 h-5" />
                  {/* TODO: Replace with actual unread message count from backend */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                </button>
              </Link>

              <Link to="/saved">
                <button className="relative p-3 text-gray-600 hover:text-[#7A0019] hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110">
                  <Bookmark className="w-5 h-5" />
                  {/* TODO: Replace with actual saved items count from backend */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFCC33] text-[#7A0019] text-xs rounded-full flex items-center justify-center font-bold">5</span>
                </button>
              </Link>

              <button className="relative p-3 text-gray-600 hover:text-[#7A0019] hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110">
                <Bell className="w-5 h-5" />
                {/* TODO: Replace with actual notification count from backend */}
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">2</span>
              </button>

              {/* Profile Dropdown - ALWAYS VISIBLE */}
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-2 transition-all duration-200 hover:scale-105"
                >
                  {/* TODO: Replace with actual user data from backend */}
                  {/* STATIC DATA - Placeholder user info */}
                  <div className="w-8 h-8 rounded-full bg-[#FFCC33] flex items-center justify-center ring-2 ring-[#FFCC33] text-[#7A0019] font-bold">
                    DA
                  </div>
                  <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-10">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        {/* TODO: Replace with actual user data from backend */}
                        {/* STATIC DATA - Placeholder user info */}
                        <div className="w-12 h-12 rounded-full bg-[#FFCC33] flex items-center justify-center text-[#7A0019] font-bold text-lg">
                          DA
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Darius Amenuvor</h3>
                          <p className="text-sm text-gray-500">amenu006@umn.edu</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link to="/profile" className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                        <User className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">My Profile</span>
                      </Link>
                      
                      <Link to="/my-listings" className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                        <Package className="w-4 h-4 text-green-500" />
                        <span className="font-medium">My Listings</span>
                      </Link>
                      
                      <Link to="/saved" className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                        <Bookmark className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">Saved Items</span>
                      </Link>
                      
                      <Link to="/favorites" className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="font-medium">Favorites</span>
                      </Link>
                      
                      <Link to="/settings" className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Settings</span>
                      </Link>
                      
                      <hr className="my-2 border-gray-200" />
                      
                      <button 
                        onClick={() => {
                          localStorage.removeItem('token');
                          window.location.href = '/login';
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-[#7A0019] hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {/* Search - Hidden on messages page */}
            {shouldShowSearch && (
              <div className="relative">
                {/* TODO: Connect mobile search to backend API */}
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#FFCC33] focus:outline-none"
                />
              </div>
            )}
            
            {/* Sell Item Button - ALWAYS VISIBLE on mobile */}
            <Link to="/listings/add">
              <button className="w-full bg-[#7A0019] text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Sell Item</span>
              </button>
            </Link>
            
            {/* Mobile Navigation Icons - ALWAYS VISIBLE */}
            <div className="flex justify-around pt-2">
              <Link to="/messages" className="flex flex-col items-center space-y-1 p-2">
                <MessageCircle className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-600">Messages</span>
              </Link>
              
              <Link to="/saved" className="flex flex-col items-center space-y-1 p-2">
                <Bookmark className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-600">Saved</span>
              </Link>
              
              <button className="flex flex-col items-center space-y-1 p-2">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-600">Notifications</span>
              </button>
              
              <Link to="/profile" className="flex flex-col items-center space-y-1 p-2">
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-600">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default UniversalHeader;
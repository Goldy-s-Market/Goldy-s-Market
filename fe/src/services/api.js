const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8080';

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Helper function to get current user ID from token
export const getCurrentUserId = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    // Decode JWT token (without verification - just for getting user ID)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const decoded = JSON.parse(jsonPayload);
    return decoded.userId || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  logout: () => apiRequest('/auth/logout', {
    method: 'POST',
  }),
  
  refreshToken: () => apiRequest('/auth/refresh', {
    method: 'POST',
  }),
};

export const usersAPI = {
  getProfile: (userId) => apiRequest(`/users/${userId}`),
  
  updateProfile: (userId, userData) => apiRequest(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  
  deleteAccount: (userId) => apiRequest(`/users/${userId}`, {
    method: 'DELETE',
  }),
  
  getAllUsers: () => apiRequest('/users'),
};

export const listingsAPI = {
  getAllListings: () => apiRequest('/listings'),
  
  getListingById: (listingId) => apiRequest(`/listings/${listingId}`),
  
  getListingsByCategory: (category) => apiRequest(`/listings/category/${category}`),
  
  createListing: (listingData) => apiRequest('/listings', {
    method: 'POST',
    body: JSON.stringify(listingData),
  }),
  
  updateListing: (listingId, listingData) => apiRequest(`/listings/${listingId}`, {
    method: 'PUT',
    body: JSON.stringify(listingData),
  }),
  
  deleteListing: (listingId) => apiRequest(`/listings/${listingId}`, {
    method: 'DELETE',
  }),
  
  getUserListings: (userId) => apiRequest(`/listings/user/${userId}`),
};

export const messagesAPI = {
  getConversations: (userId) => apiRequest(`/messages/conversations/${userId}`),
  
  getConversation: (userId, otherUserId) => apiRequest(`/messages/conversation/${userId}/${otherUserId}`),
  
  sendMessage: (messageData) => apiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify(messageData),
  }),
  
  markAsRead: (messageId) => apiRequest(`/messages/${messageId}/read`, {
    method: 'PUT',
  }),
};

export const searchAPI = {
  searchListings: (query, filters = {}) => {
    const params = new URLSearchParams({ q: query, ...filters });
    return apiRequest(`/search/listings?${params}`);
  },
  
  searchUsers: (query) => {
    const params = new URLSearchParams({ q: query });
    return apiRequest(`/search/users?${params}`);
  },
};

export const socketConfig = {
  url: SOCKET_URL,
  options: {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  },
};

export { API_BASE_URL, SOCKET_URL };

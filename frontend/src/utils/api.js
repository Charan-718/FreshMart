import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from './constants';
import { auth } from './helpers';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      auth.removeToken();
      auth.removeUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiMethods = {
  // Auth endpoints
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh-token'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
  
  // User endpoints
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  changePassword: (passwordData) => api.put('/user/password', passwordData),
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (address) => api.post('/user/addresses', address),
  updateAddress: (addressId, address) => api.put(`/user/addresses/${addressId}`, address),
  deleteAddress: (addressId) => api.delete(`/user/addresses/${addressId}`),
  
  // Product endpoints
  getProducts: (params = {}) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  searchProducts: (query) => api.get('/products/search', { params: { q: query } }),
  
  // Cart endpoints
  getCart: () => api.get('/cart'),
  addToCart: (item) => api.post('/cart', item),
  updateCartItem: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete('/cart'),
  syncCart: (items) => api.post('/cart/sync', { items }),
  
  // Recipe endpoints (LLM Integration)
  getRecipes: (params = {}) => api.get('/recipes', { params }),
  getRecipe: (id) => api.get(`/recipes/${id}`),
  getRecipeSuggestions: (cartItems) => api.post('/recipes/suggest', cartItems),
  saveRecipe: (recipe) => api.post('/recipes/save', recipe),
  unsaveRecipe: (recipeId) => api.delete(`/recipes/save/${recipeId}`),
  getSavedRecipes: () => api.get('/recipes/saved'),
  searchRecipes: (query) => api.get('/recipes/search', { params: { q: query } }),
  
  // Order endpoints
  getOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (orderData) => api.post('/orders', orderData),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
  getOrderTracking: (id) => api.get(`/orders/${id}/tracking`)
};

export default apiMethods;
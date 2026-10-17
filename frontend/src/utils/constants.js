// API Endpoints
const rawApiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001/api').trim().replace(/\/+$/, '');
export const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Product endpoints
  PRODUCTS: '/products',
  PRODUCT_BY_ID: '/products/:id',
  PRODUCT_CATEGORIES: '/products/categories',
  SEARCH_PRODUCTS: '/products/search',
  
  // Cart endpoints
  CART: '/cart',
  CART_ITEM: '/cart/:itemId',
  
  // Recipe endpoints (LLM Integration)
  RECIPES: '/recipes',
  RECIPE_SUGGESTIONS: '/recipes/suggest',
  RECIPE_BY_ID: '/recipes/:id',
  SAVE_RECIPE: '/recipes/save',
  
  // Order endpoints
  ORDERS: '/orders',
  ORDER_BY_ID: '/orders/:id',
  ORDER_TRACKING: '/orders/:id/tracking',
  
  // User endpoints
  USER_PROFILE: '/user/profile',
  USER_ADDRESSES: '/user/addresses',
  USER_PREFERENCES: '/user/preferences'
};

// Product Categories
export const PRODUCT_CATEGORIES = {
  FRUITS_VEGETABLES: 'fruits-vegetables',
  DAIRY_EGGS: 'dairy-eggs',
  MEAT_POULTRY: 'meat-poultry',
  BAKERY: 'bakery',
  BEVERAGES: 'beverages',
  SNACKS: 'snacks',
  FROZEN: 'frozen',
  PANTRY: 'pantry',
  ORGANIC: 'organic'
};

export const CATEGORY_NAMES = {
  [PRODUCT_CATEGORIES.FRUITS_VEGETABLES]: 'Fruits & Vegetables',
  [PRODUCT_CATEGORIES.DAIRY_EGGS]: 'Dairy & Eggs',
  [PRODUCT_CATEGORIES.MEAT_POULTRY]: 'Meat & Poultry',
  [PRODUCT_CATEGORIES.BAKERY]: 'Bakery',
  [PRODUCT_CATEGORIES.BEVERAGES]: 'Beverages',
  [PRODUCT_CATEGORIES.SNACKS]: 'Snacks',
  [PRODUCT_CATEGORIES.FROZEN]: 'Frozen Foods',
  [PRODUCT_CATEGORIES.PANTRY]: 'Pantry',
  [PRODUCT_CATEGORIES.ORGANIC]: 'Organic'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.REFUNDED]: 'Refunded'
};

// Recipe Difficulty Levels
export const RECIPE_DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
  EXPERT: 'Expert'
};

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  PAYPAL: 'paypal',
  CASH_ON_DELIVERY: 'cash_on_delivery'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'freshmart_auth_token',
  REFRESH_TOKEN: 'freshmart_refresh_token',
  USER_DATA: 'freshmart_user_data',
  CART_ITEMS: 'freshmart_cart_items',
  RECENT_SEARCHES: 'freshmart_recent_searches',
  PREFERENCES: 'freshmart_preferences'
};

// App Constants
export const APP_CONSTANTS = {
  APP_NAME: 'FreshMart',
  DEFAULT_CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
  TAX_RATE: 0.08, // 8%
  SHIPPING_COST: 5.99,
  FREE_SHIPPING_THRESHOLD: 50.00,
  MAX_CART_QUANTITY: 10,
  DEFAULT_PAGE_SIZE: 12,
  RECIPE_SUGGESTION_LIMIT: 5,
  SEARCH_DEBOUNCE_TIME: 300 // milliseconds
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'An account with this email already exists.',
  CART_EMPTY: 'Your cart is empty.',
  PRODUCT_OUT_OF_STOCK: 'This product is currently out of stock.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful! Welcome to FreshMart!',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully!',
  PASSWORD_CHANGE_SUCCESS: 'Password changed successfully!',
  ORDER_PLACED_SUCCESS: 'Order placed successfully!',
  ITEM_ADDED_TO_CART: 'Item added to cart!',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart!',
  RECIPE_SAVED: 'Recipe saved to your collection!'
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s-()]{10,}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  CREDIT_CARD: /^\d{16}$/,
  CVV: /^\d{3,4}$/,
  EXPIRY_DATE: /^(0[1-9]|1[0-2])\/([0-9]{2})$/
};

// Default Values
export const DEFAULT_VALUES = {
  USER: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  },
  PRODUCT: {
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    inStock: true,
    rating: 0,
    reviews: 0
  },
  CART_ITEM: {
    quantity: 1
  },
  RECIPE: {
    difficulty: RECIPE_DIFFICULTY.EASY,
    cookingTime: 30,
    servings: 2
  }
};

const constants = {
  API_BASE_URL,
  API_ENDPOINTS,
  PRODUCT_CATEGORIES,
  CATEGORY_NAMES,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  RECIPE_DIFFICULTY,
  PAYMENT_METHODS,
  STORAGE_KEYS,
  APP_CONSTANTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX_PATTERNS,
  DEFAULT_VALUES
};

export default constants;
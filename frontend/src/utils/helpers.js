import { 
  STORAGE_KEYS, 
  APP_CONSTANTS, 
  REGEX_PATTERNS,
  ERROR_MESSAGES 
} from './constants';

// Storage Helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting from storage:', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting storage:', error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from storage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
};

// Authentication Helpers
export const auth = {
  getToken: () => storage.get(STORAGE_KEYS.AUTH_TOKEN),
  setToken: (token) => storage.set(STORAGE_KEYS.AUTH_TOKEN, token),
  removeToken: () => storage.remove(STORAGE_KEYS.AUTH_TOKEN),
  
  getUser: () => storage.get(STORAGE_KEYS.USER_DATA),
  setUser: (user) => storage.set(STORAGE_KEYS.USER_DATA, user),
  removeUser: () => storage.remove(STORAGE_KEYS.USER_DATA),
  
  isAuthenticated: () => {
    const token = auth.getToken();
    return !!token && !isTokenExpired(token);
  }
};

// Token Helpers
export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

// Formatting Helpers
export const formatCurrency = (amount, currency = APP_CONSTANTS.DEFAULT_CURRENCY) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

// Validation Helpers
export const validators = {
  email: (email) => REGEX_PATTERNS.EMAIL.test(email),
  phone: (phone) => REGEX_PATTERNS.PHONE.test(phone),
  password: (password) => password && password.length >= 6,
  zipCode: (zipCode) => REGEX_PATTERNS.ZIP_CODE.test(zipCode),
  creditCard: (cardNumber) => REGEX_PATTERNS.CREDIT_CARD.test(cardNumber.replace(/\s/g, '')),
  cvv: (cvv) => REGEX_PATTERNS.CVV.test(cvv),
  expiryDate: (date) => REGEX_PATTERNS.EXPIRY_DATE.test(date)
};

// Cart Helpers
export const cartHelpers = {
  calculateSubtotal: (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  calculateTax: (subtotal, taxRate = APP_CONSTANTS.TAX_RATE) => {
    return subtotal * taxRate;
  },

  calculateShipping: (subtotal, shippingCost = APP_CONSTANTS.SHIPPING_COST, freeThreshold = APP_CONSTANTS.FREE_SHIPPING_THRESHOLD) => {
    return subtotal >= freeThreshold ? 0 : shippingCost;
  },

  calculateTotal: (items, taxRate = APP_CONSTANTS.TAX_RATE) => {
    const subtotal = cartHelpers.calculateSubtotal(items);
    const tax = cartHelpers.calculateTax(subtotal, taxRate);
    const shipping = cartHelpers.calculateShipping(subtotal);
    return subtotal + tax + shipping;
  },

  getCartItemCount: (items) => {
    return items.reduce((count, item) => count + item.quantity, 0);
  },

  isProductInCart: (cartItems, productId) => {
    return cartItems.some(item => item.productId === productId);
  },

  findCartItem: (cartItems, productId) => {
    return cartItems.find(item => item.productId === productId);
  }
};

// Recipe Helpers
export const recipeHelpers = {
  formatIngredientsForAPI: (cartItems) => {
    return cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      category: item.category
    }));
  },

  calculateNutritionScore: (recipe) => {
    // Simple nutrition scoring algorithm
    let score = 0;
    
    if (recipe.nutrition.calories < 400) score += 2;
    if (parseFloat(recipe.nutrition.protein) > 15) score += 2;
    if (parseFloat(recipe.nutrition.fiber) > 5) score += 1;
    if (parseFloat(recipe.nutrition.sugar) < 20) score += 1;
    
    return Math.min(score, 5);
  },

  getCookingTimeLabel: (minutes) => {
    if (minutes <= 15) return 'Quick';
    if (minutes <= 30) return 'Moderate';
    if (minutes <= 60) return 'Lengthy';
    return 'Long';
  },

  filterRecipesByIngredients: (recipes, availableIngredients) => {
    return recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
      const available = availableIngredients.map(ing => ing.toLowerCase());
      
      return recipeIngredients.every(ingredient => 
        available.some(availableIng => availableIng.includes(ingredient) || ingredient.includes(availableIng))
      );
    });
  }
};

// Product Helpers
export const productHelpers = {
  sortProducts: (products, sortBy) => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  },

  filterProducts: (products, filters) => {
    return products.filter(product => {
      // Category filter
      if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Search filter
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Price range filter
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }
      
      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }
      
      // In stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }
      
      return true;
    });
  },

  getRandomProducts: (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
};

// Error Handling
export const errorHandler = {
  getErrorMessage: (error) => {
    if (error.response) {
      // Server responded with error status
      return error.response.data.message || ERROR_MESSAGES.SERVER_ERROR;
    } else if (error.request) {
      // Network error
      return ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      // Other errors
      return error.message || ERROR_MESSAGES.SERVER_ERROR;
    }
  },

  handleAPIError: (error, showNotification) => {
    const message = errorHandler.getErrorMessage(error);
    
    if (showNotification) {
      // You can integrate with a notification system here
      console.error('API Error:', message);
    }
    
    return message;
  }
};

// Utility Functions
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getInitials = (firstName, lastName) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export default {
  storage,
  auth,
  formatCurrency,
  formatDate,
  formatTime,
  validators,
  cartHelpers,
  recipeHelpers,
  productHelpers,
  errorHandler,
  debounce,
  generateId,
  truncateText,
  capitalizeFirst,
  getInitials
};
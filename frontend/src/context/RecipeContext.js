import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { recipeHelpers, errorHandler } from '../utils/helpers';
import { api } from '../utils/api';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

// Action types
const RECIPE_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_RECIPES: 'SET_RECIPES',
  SET_SUGGESTED_RECIPES: 'SET_SUGGESTED_RECIPES',
  SET_SAVED_RECIPES: 'SET_SAVED_RECIPES',
  ADD_SAVED_RECIPE: 'ADD_SAVED_RECIPE',
  REMOVE_SAVED_RECIPE: 'REMOVE_SAVED_RECIPE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  CLEAR_SUGGESTIONS: 'CLEAR_SUGGESTIONS'
};

// Initial state
const initialState = {
  recipes: [],
  suggestedRecipes: [],
  savedRecipes: [],
  loading: false,
  error: null
};

// Reducer
const recipeReducer = (state, action) => {
  switch (action.type) {
    case RECIPE_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
      
    case RECIPE_ACTIONS.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
        error: null
      };
      
    case RECIPE_ACTIONS.SET_SUGGESTED_RECIPES:
      return {
        ...state,
        suggestedRecipes: action.payload,
        loading: false,
        error: null
      };
      
    case RECIPE_ACTIONS.SET_SAVED_RECIPES:
      return {
        ...state,
        savedRecipes: action.payload,
        loading: false,
        error: null
      };
      
    case RECIPE_ACTIONS.ADD_SAVED_RECIPE:
      return {
        ...state,
        savedRecipes: [...state.savedRecipes, action.payload],
        loading: false,
        error: null
      };
      
    case RECIPE_ACTIONS.REMOVE_SAVED_RECIPE:
      return {
        ...state,
        savedRecipes: state.savedRecipes.filter(recipe => recipe.id !== action.payload),
        loading: false,
        error: null
      };
      
    case RECIPE_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
    case RECIPE_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    case RECIPE_ACTIONS.CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestedRecipes: []
      };
      
    default:
      return state;
  }
};

// Create context
const RecipeContext = createContext();

// Provider component
export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Get recipe suggestions based on cart items (LLM Integration)
  const getRecipeSuggestions = useCallback(async (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      dispatch({ 
        type: RECIPE_ACTIONS.SET_ERROR, 
        payload: 'No items in cart to generate recipes' 
      });
      return { success: false, error: 'Cart is empty' };
    }

    dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Format cart items for API
      const ingredients = recipeHelpers.formatIngredientsForAPI(cartItems);
      
      // Call LLM API for recipe suggestions
      const response = await api.getRecipeSuggestions({ items: ingredients });
      const suggestedRecipes = response.data.recipes;
      
      dispatch({ 
        type: RECIPE_ACTIONS.SET_SUGGESTED_RECIPES, 
        payload: suggestedRecipes 
      });
      
      return { success: true, recipes: suggestedRecipes };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: RECIPE_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Get recipe by ID
  const getRecipeById = useCallback(async (recipeId) => {
    dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.getRecipe(recipeId);
      const recipe = response.data;
      
      dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: false });
      return { success: true, recipe };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: RECIPE_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Save recipe to user's collection
  const saveRecipe = useCallback(async (recipe) => {
    dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.saveRecipe(recipe);
      const savedRecipe = response.data;
      
      dispatch({ 
        type: RECIPE_ACTIONS.ADD_SAVED_RECIPE, 
        payload: savedRecipe 
      });
      
      console.log(SUCCESS_MESSAGES.RECIPE_SAVED);
      return { success: true, recipe: savedRecipe };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: RECIPE_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Remove recipe from saved collection
  const unsaveRecipe = useCallback(async (recipeId) => {
    dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });
    
    try {
      await api.unsaveRecipe(recipeId);
      
      dispatch({ 
        type: RECIPE_ACTIONS.REMOVE_SAVED_RECIPE, 
        payload: recipeId 
      });
      
      return { success: true };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: RECIPE_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Check if recipe is saved
  const isRecipeSaved = useCallback((recipeId) => {
    return state.savedRecipes.some(recipe => recipe.id === recipeId);
  }, [state.savedRecipes]);

  // Get recipes by category
  const getRecipesByCategory = useCallback(async (category) => {
    dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.getRecipes({ category });
      const recipes = response.data;
      
      dispatch({ type: RECIPE_ACTIONS.SET_RECIPES, payload: recipes });
      return { success: true, recipes };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: RECIPE_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Search recipes
  const searchRecipes = useCallback(async (query) => {
    dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.searchRecipes(query);
      const recipes = response.data;
      
      dispatch({ type: RECIPE_ACTIONS.SET_RECIPES, payload: recipes });
      return { success: true, recipes };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: RECIPE_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Filter recipes by ingredients
  const filterRecipesByIngredients = useCallback((availableIngredients) => {
    const filtered = recipeHelpers.filterRecipesByIngredients(
      state.recipes, 
      availableIngredients
    );
    return filtered;
  }, [state.recipes]);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: RECIPE_ACTIONS.CLEAR_ERROR });
  }, []);

  // Clear suggested recipes
  const clearSuggestedRecipes = useCallback(() => {
    dispatch({ type: RECIPE_ACTIONS.CLEAR_SUGGESTIONS });
  }, []);

  // Load saved recipes
  const loadSavedRecipes = useCallback(async () => {
    dispatch({ type: RECIPE_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.getSavedRecipes();
      const savedRecipes = response.data;
      
      dispatch({ type: RECIPE_ACTIONS.SET_SAVED_RECIPES, payload: savedRecipes });
      return { success: true, recipes: savedRecipes };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      dispatch({ type: RECIPE_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  const value = {
    // State
    recipes: state.recipes,
    suggestedRecipes: state.suggestedRecipes,
    savedRecipes: state.savedRecipes,
    loading: state.loading,
    error: state.error,
    
    // Actions
    getRecipeSuggestions,
    getRecipeById,
    saveRecipe,
    unsaveRecipe,
    isRecipeSaved,
    getRecipesByCategory,
    searchRecipes,
    filterRecipesByIngredients,
    clearError,
    clearSuggestedRecipes,
    loadSavedRecipes
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook to use recipe context
export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};

export default RecipeContext;
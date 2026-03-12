import { useState, useCallback } from 'react';
import { recipeHelpers, errorHandler } from '../utils/helpers';
import { api } from '../utils/api';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get recipe suggestions based on cart items (LLM Integration)
  const getRecipeSuggestions = useCallback(async (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      setError('No items in cart to generate recipes');
      return { success: false, error: 'Cart is empty' };
    }

    setLoading(true);
    setError(null);
    
    try {
      // Format cart items for API
      const ingredients = recipeHelpers.formatIngredientsForAPI(cartItems);
      
      // Call LLM API for recipe suggestions
      const response = await api.getRecipeSuggestions({ items: ingredients });
      const suggestedRecipes = response.data.recipes;
      
      setSuggestedRecipes(suggestedRecipes);
      return { success: true, recipes: suggestedRecipes };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get recipe by ID
  const getRecipeById = useCallback(async (recipeId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.getRecipe(recipeId);
      const recipe = response.data;
      
      return { success: true, recipe };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Save recipe to user's collection
  const saveRecipe = useCallback(async (recipe) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.saveRecipe(recipe);
      const savedRecipe = response.data;
      
      // Update local state
      setSavedRecipes(prev => [...prev, savedRecipe]);
      
      console.log(SUCCESS_MESSAGES.RECIPE_SAVED);
      return { success: true, recipe: savedRecipe };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove recipe from saved collection
  const unsaveRecipe = useCallback(async (recipeId) => {
    setLoading(true);
    setError(null);
    
    try {
      await api.unsaveRecipe(recipeId);
      
      // Update local state
      setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
      
      return { success: true };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if recipe is saved
  const isRecipeSaved = useCallback((recipeId) => {
    return savedRecipes.some(recipe => recipe.id === recipeId);
  }, [savedRecipes]);

  // Get recipes by category
  const getRecipesByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.getRecipes({ category });
      const recipes = response.data;
      
      setRecipes(recipes);
      return { success: true, recipes };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Search recipes
  const searchRecipes = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.searchRecipes(query);
      const recipes = response.data;
      
      setRecipes(recipes);
      return { success: true, recipes };
    } catch (err) {
      const errorMessage = errorHandler.handleAPIError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter recipes by ingredients
  const filterRecipesByIngredients = useCallback((availableIngredients) => {
    const filtered = recipeHelpers.filterRecipesByIngredients(recipes, availableIngredients);
    return filtered;
  }, [recipes]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clear suggested recipes
  const clearSuggestedRecipes = useCallback(() => {
    setSuggestedRecipes([]);
  }, []);

  return {
    recipes,
    suggestedRecipes,
    savedRecipes,
    loading,
    error,
    getRecipeSuggestions,
    getRecipeById,
    saveRecipe,
    unsaveRecipe,
    isRecipeSaved,
    getRecipesByCategory,
    searchRecipes,
    filterRecipesByIngredients,
    clearError,
    clearSuggestedRecipes
  };
};

export default useRecipes;
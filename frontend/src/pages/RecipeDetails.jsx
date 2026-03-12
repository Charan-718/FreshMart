import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('instructions');

  // Sample recipe data - in real app, this would come from API
  const sampleRecipes = {
    1: {
      id: 1,
      name: 'Apple Omelette',
      description: 'A sweet and savory omelette with fresh apples and dairy',
      cookingTime: 15,
      difficulty: 'Easy',
      servings: 2,
      ingredients: [
        { name: 'Organic Apples', quantity: '2', unit: 'medium' },
        { name: 'Eggs', quantity: '4', unit: 'large' },
        { name: 'Milk', quantity: '1/4', unit: 'cup' },
        { name: 'Butter', quantity: '2', unit: 'tbsp' },
        { name: 'Cinnamon', quantity: '1/2', unit: 'tsp' },
        { name: 'Sugar', quantity: '1', unit: 'tbsp' },
        { name: 'Salt', quantity: '1/4', unit: 'tsp' },
        { name: 'Vanilla extract', quantity: '1', unit: 'tsp' }
      ],
      instructions: [
        'Wash and core the apples, then chop them into small pieces.',
        'In a bowl, whisk together eggs, milk, salt, and vanilla extract until well combined.',
        'Melt 1 tablespoon of butter in a non-stick skillet over medium heat.',
        'Add chopped apples and sauté for 3-4 minutes until slightly softened.',
        'Sprinkle sugar and cinnamon over the apples and cook for another 2 minutes.',
        'Remove apples from skillet and set aside.',
        'Add remaining butter to the skillet and pour in the egg mixture.',
        'Cook for 2-3 minutes until the edges start to set.',
        'Spread the cooked apples evenly over one half of the omelette.',
        'Carefully fold the other half over the apples and cook for 1-2 more minutes.',
        'Slide onto a plate and serve warm.'
      ],
      nutrition: {
        calories: 320,
        protein: '18g',
        carbs: '25g',
        fat: '15g',
        fiber: '4g',
        sugar: '18g'
      },
      tips: [
        'Use a non-stick skillet for easy flipping',
        'Don\'t overcook the eggs - they should be slightly runny when folding',
        'You can add a sprinkle of cheese for extra flavor',
        'Serve with toast for a complete breakfast'
      ],
      image: '/images/recipe1.jpg',
      category: 'Breakfast',
      rating: 4.5,
      reviews: 128
    },
    2: {
      id: 2,
      name: 'Fruit Smoothie Bowl',
      description: 'Refreshing smoothie bowl with apples and yogurt',
      cookingTime: 5,
      difficulty: 'Very Easy',
      servings: 1,
      ingredients: [
        { name: 'Organic Apples', quantity: '1', unit: 'large' },
        { name: 'Milk', quantity: '1/2', unit: 'cup' },
        { name: 'Yogurt', quantity: '1/2', unit: 'cup' },
        { name: 'Honey', quantity: '1', unit: 'tbsp' },
        { name: 'Granola', quantity: '1/4', unit: 'cup' },
        { name: 'Banana', quantity: '1/2', unit: 'medium' },
        { name: 'Chia seeds', quantity: '1', unit: 'tsp' }
      ],
      instructions: [
        'Peel and chop the apple and banana into small pieces.',
        'In a blender, combine apple, banana, milk, yogurt, and honey.',
        'Blend until smooth and creamy.',
        'Pour the smoothie into a bowl.',
        'Top with granola and sprinkle chia seeds on top.',
        'Add additional fruit slices for decoration if desired.',
        'Serve immediately and enjoy!'
      ],
      nutrition: {
        calories: 280,
        protein: '12g',
        carbs: '45g',
        fat: '8g',
        fiber: '6g',
        sugar: '32g'
      },
      tips: [
        'Use frozen fruits for a thicker consistency',
        'Add protein powder for an extra protein boost',
        'Customize toppings with your favorite nuts and seeds',
        'Best consumed immediately after preparation'
      ],
      image: '/images/recipe2.jpg',
      category: 'Breakfast',
      rating: 4.3,
      reviews: 89
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundRecipe = sampleRecipes[id];
      setRecipe(foundRecipe);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="recipe-details">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading recipe...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-details">
        <div className="container">
          <div className="recipe-not-found">
            <h2>Recipe Not Found</h2>
            <p>The recipe you're looking for doesn't exist.</p>
            <Link to="/cart" className="btn btn-primary">
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <div className="container">
        {/* Recipe Header */}
        <div className="recipe-header">
          <div className="recipe-image">
            <img src={recipe.image} alt={recipe.name} />
            <div className="recipe-badge">{recipe.difficulty}</div>
          </div>
          
          <div className="recipe-info">
            <div className="recipe-meta">
              <span className="category">{recipe.category}</span>
              <div className="rating">
                <span className="stars">★★★★☆</span>
                <span>({recipe.rating}) • {recipe.reviews} reviews</span>
              </div>
            </div>
            
            <h1>{recipe.name}</h1>
            <p className="recipe-description">{recipe.description}</p>
            
            <div className="recipe-stats">
              <div className="stat">
                <span className="stat-icon">⏱️</span>
                <div>
                  <span className="stat-value">{recipe.cookingTime} min</span>
                  <span className="stat-label">Prep & Cook</span>
                </div>
              </div>
              
              <div className="stat">
                <span className="stat-icon">👥</span>
                <div>
                  <span className="stat-value">{recipe.servings}</span>
                  <span className="stat-label">Servings</span>
                </div>
              </div>
              
              <div className="stat">
                <span className="stat-icon">🔥</span>
                <div>
                  <span className="stat-value">{recipe.nutrition.calories}</span>
                  <span className="stat-label">Calories</span>
                </div>
              </div>
            </div>

            <div className="recipe-actions">
              <button className="btn btn-primary">
                🛒 Add Missing Ingredients
              </button>
              <button className="btn btn-secondary">
                ❤️ Save Recipe
              </button>
              <button className="btn btn-secondary">
                📤 Share
              </button>
            </div>
          </div>
        </div>

        {/* Recipe Tabs */}
        <div className="recipe-tabs">
          <button 
            className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`tab-btn ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            Tips & Notes
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'ingredients' && (
            <div className="ingredients-section">
              <h3>Ingredients</h3>
              <p className="section-subtitle">For {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</p>
              
              <div className="ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <label className="ingredient-checkbox">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <div className="ingredient-details">
                      <span className="ingredient-name">{ingredient.name}</span>
                      <span className="ingredient-quantity">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                    </div>
                    <button className="btn btn-sm btn-outline">
                      🛒 Add
                    </button>
                  </div>
                ))}
              </div>

              <div className="ingredients-actions">
                <button className="btn btn-primary">
                  Add All to Cart
                </button>
                <button className="btn btn-secondary">
                  Print Shopping List
                </button>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="instructions-section">
              <h3>Instructions</h3>
              
              <div className="instructions-list">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="instruction-step">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <p>{instruction}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cooking-tips">
                <h4>💡 Pro Tips</h4>
                <ul>
                  {recipe.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="nutrition-section">
              <h3>Nutrition Facts</h3>
              <p className="section-subtitle">Per serving</p>
              
              <div className="nutrition-facts">
                <div className="nutrition-main">
                  <div className="nutrition-item">
                    <span>Calories</span>
                    <span>{recipe.nutrition.calories}</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Protein</span>
                    <span>{recipe.nutrition.protein}</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Carbohydrates</span>
                    <span>{recipe.nutrition.carbs}</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Fat</span>
                    <span>{recipe.nutrition.fat}</span>
                  </div>
                </div>
                
                <div className="nutrition-details">
                  <div className="nutrition-item">
                    <span>Fiber</span>
                    <span>{recipe.nutrition.fiber}</span>
                  </div>
                  <div className="nutrition-item">
                    <span>Sugar</span>
                    <span>{recipe.nutrition.sugar}</span>
                  </div>
                </div>
              </div>

              <div className="nutrition-info">
                <h4>Nutrition Notes</h4>
                <p>This recipe provides a balanced mix of protein, carbohydrates, and healthy fats. 
                The apples contribute natural sweetness and fiber, while the dairy products provide 
                protein and essential nutrients.</p>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="tips-section">
              <h3>Tips & Notes</h3>
              
              <div className="tips-list">
                {recipe.tips.map((tip, index) => (
                  <div key={index} className="tip-item">
                    <span className="tip-icon">💡</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>

              <div className="recipe-notes">
                <h4>Additional Notes</h4>
                <textarea 
                  className="notes-textarea"
                  placeholder="Add your own notes, substitutions, or variations..."
                  rows="4"
                />
                <button className="btn btn-primary">Save Notes</button>
              </div>
            </div>
          )}
        </div>

        {/* Related Recipes */}
        <div className="related-recipes">
          <h3>You Might Also Like</h3>
          <div className="related-grid">
            {Object.values(sampleRecipes)
              .filter(r => r.id !== recipe.id)
              .slice(0, 2)
              .map(relatedRecipe => (
                <div key={relatedRecipe.id} className="related-recipe-card">
                  <img src={relatedRecipe.image} alt={relatedRecipe.name} />
                  <div className="related-recipe-content">
                    <h4>{relatedRecipe.name}</h4>
                    <p>{relatedRecipe.description}</p>
                    <div className="related-recipe-meta">
                      <span>⏱️ {relatedRecipe.cookingTime} min</span>
                      <span>{relatedRecipe.difficulty}</span>
                    </div>
                    <Link 
                      to={`/recipe/${relatedRecipe.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const sampleProducts = [
  // Fruits
  {
    name: 'Organic Honeycrisp Apples',
    price: 4.99,
    category: 'fruits',
    image: '/images/apples.jpg',
    description: 'Crisp, sweet, and juicy organic apples from local orchards.',
    longDescription: 'Our organic Honeycrisp apples are hand-picked at peak ripeness to ensure maximum sweetness, crunch, and nutritional benefits.',
    inStock: true,
    rating: 4.8,
    reviews: 142,
    nutrition: { calories: 95, carbs: 25, fiber: 4, sugar: 19, protein: 0.5 }
  },
  {
    name: 'Ripe Cavendish Bananas',
    price: 1.99,
    category: 'fruits',
    image: '/images/bananas.jpg',
    description: 'Naturally sweet and potassium-rich ripe bananas.',
    longDescription: 'Sourced directly from sustainable tropical groves, these bananas are rich in essential vitamins, potassium, and natural energy.',
    inStock: true,
    rating: 4.7,
    reviews: 98,
    nutrition: { calories: 105, carbs: 27, fiber: 3, sugar: 14, protein: 1.3 }
  },
  {
    name: 'Fresh Strawberries (1 lb)',
    price: 3.99,
    category: 'fruits',
    image: '/images/fruits-veg.jpg',
    description: 'Vibrant, sweet red strawberries loaded with antioxidants.',
    longDescription: 'Plump and fragrant strawberries bursting with natural berry flavor. Great for smoothies, parfaits, baking, or raw snacking.',
    inStock: true,
    rating: 4.6,
    reviews: 76,
    nutrition: { calories: 50, carbs: 12, fiber: 3, sugar: 7, protein: 1 }
  },
  {
    name: 'Organic Blueberries (Pint)',
    price: 4.49,
    category: 'fruits',
    image: '/images/fruits-veg.jpg',
    description: 'Plump antioxidant-packed organic blueberries.',
    longDescription: 'Sweet and tangy organic blueberries packed with anthocyanins and vitamin C. Ideal for morning cereals and baking.',
    inStock: true,
    rating: 4.9,
    reviews: 110,
    nutrition: { calories: 84, carbs: 21, fiber: 4, sugar: 15, protein: 1.1 }
  },
  {
    name: 'Valencia Sweet Oranges',
    price: 3.29,
    category: 'fruits',
    image: '/images/fruits-veg.jpg',
    description: 'Juicy, sun-ripened oranges packed with Vitamin C.',
    longDescription: 'Bursting with sweet citrus juice and aromatic flavor, perfect for fresh squeezing or afternoon refreshments.',
    inStock: true,
    rating: 4.5,
    reviews: 64,
    nutrition: { calories: 62, carbs: 15, fiber: 3, sugar: 12, protein: 1.2 }
  },
  {
    name: 'Hass Avocados (3-Pack)',
    price: 3.99,
    category: 'fruits',
    image: '/images/fruits-veg.jpg',
    description: 'Creamy Hass avocados rich in heart-healthy omega fats.',
    longDescription: 'Smooth and buttery avocados ready for artisanal toast, fresh guacamole, and nutrient-dense salads.',
    inStock: true,
    rating: 4.7,
    reviews: 85,
    nutrition: { calories: 160, carbs: 9, fiber: 7, sugar: 1, protein: 2 }
  },

  // Vegetables
  {
    name: 'Crisp Organic Carrots',
    price: 2.49,
    category: 'vegetables',
    image: '/images/carrots.jpg',
    description: 'Fresh crunchy carrots bursting with beta-carotene.',
    longDescription: 'Farm-fresh carrots with a naturally sweet taste and snap. Ideal for roasting, dipping in hummus, or juicing.',
    inStock: true,
    rating: 4.6,
    reviews: 82,
    nutrition: { calories: 41, carbs: 10, fiber: 3, sugar: 5, protein: 1 }
  },
  {
    name: 'Baby Spinach Leaves',
    price: 2.99,
    category: 'vegetables',
    image: '/images/fruits-veg.jpg',
    description: 'Tender, pre-washed organic baby spinach greens.',
    longDescription: 'Nutrient-rich baby spinach packed with iron, folate, and calcium. Tender leaves are ready to eat right out of the container.',
    inStock: true,
    rating: 4.8,
    reviews: 95,
    nutrition: { calories: 23, carbs: 4, fiber: 2, sugar: 0.5, protein: 3 }
  },
  {
    name: 'Vine-Ripened Cluster Tomatoes',
    price: 3.19,
    category: 'vegetables',
    image: '/images/fruits-veg.jpg',
    description: 'Aromatic greenhouse tomatoes on the vine for peak flavor.',
    longDescription: 'Grown on the vine for maximum ripeness and intense umami tomato flavor. Perfect for caprese salads, pastas, and sandwiches.',
    inStock: true,
    rating: 4.4,
    reviews: 58,
    nutrition: { calories: 32, carbs: 7, fiber: 2, sugar: 4.5, protein: 1.5 }
  },
  {
    name: 'Organic Broccoli Florets',
    price: 2.89,
    category: 'vegetables',
    image: '/images/fruits-veg.jpg',
    description: 'Firm and fresh green broccoli florets high in fiber.',
    longDescription: 'Hand-trimmed organic broccoli crowns ready for steaming, stir-frying, or enjoying raw with dips.',
    inStock: true,
    rating: 4.5,
    reviews: 63,
    nutrition: { calories: 55, carbs: 11, fiber: 5, sugar: 2, protein: 4 }
  },
  {
    name: 'Tricolor Bell Peppers',
    price: 3.49,
    category: 'vegetables',
    image: '/images/fruits-veg.jpg',
    description: 'Sweet, crisp red, yellow, and orange bell peppers.',
    longDescription: 'A colorful mix of sweet bell peppers loaded with vitamin A and C. Excellent for fajitas, roasting, and crisp veggie platters.',
    inStock: true,
    rating: 4.7,
    reviews: 71,
    nutrition: { calories: 30, carbs: 7, fiber: 2.5, sugar: 4, protein: 1 }
  },
  {
    name: 'Crisp English Cucumbers',
    price: 1.79,
    category: 'vegetables',
    image: '/images/fruits-veg.jpg',
    description: 'Refreshing seedless English cucumbers with thin skin.',
    longDescription: 'Hydrating, mild, and crisp seedless cucumbers that require no peeling. Adds refreshing crunch to salads and snacks.',
    inStock: true,
    rating: 4.3,
    reviews: 44,
    nutrition: { calories: 16, carbs: 4, fiber: 1, sugar: 2, protein: 0.7 }
  },

  // Dairy
  {
    name: 'Whole Pasteurized Milk (1 Gal)',
    price: 3.49,
    category: 'dairy',
    image: '/images/milk.jpg',
    description: 'Pure whole milk from pasture-raised local cows.',
    longDescription: 'Fresh whole milk rich in calcium, vitamin D, and protein, homogenized and pasteurized with care.',
    inStock: true,
    rating: 4.9,
    reviews: 215,
    nutrition: { calories: 150, carbs: 12, fiber: 0, sugar: 12, protein: 8 }
  },
  {
    name: 'Pasture-Raised Brown Eggs (Dozen)',
    price: 4.99,
    category: 'dairy',
    image: '/images/eggs.jpg',
    description: 'Farm-fresh Grade A brown eggs from free-range hens.',
    longDescription: 'Grade A eggs with vibrant golden yolks from hens raised on open green pastures without antibiotics.',
    inStock: true,
    rating: 4.9,
    reviews: 184,
    nutrition: { calories: 70, carbs: 0.5, fiber: 0, sugar: 0, protein: 6 }
  },
  {
    name: 'Authentic Greek Yogurt (32 oz)',
    price: 4.29,
    category: 'dairy',
    image: '/images/dairy.jpg',
    description: 'Thick, creamy plain Greek yogurt with active probiotics.',
    longDescription: 'Traditional strained Greek yogurt loaded with 17g of protein per serving and billions of live active cultures.',
    inStock: true,
    rating: 4.7,
    reviews: 93,
    nutrition: { calories: 130, carbs: 6, fiber: 0, sugar: 5, protein: 17 }
  },
  {
    name: 'Aged Sharp Cheddar Block (8 oz)',
    price: 4.49,
    category: 'dairy',
    image: '/images/dairy.jpg',
    description: 'Slow-aged cheddar cheese with bold, tangy flavor.',
    longDescription: 'Naturally aged for over 9 months to develop deep complexity, smooth melt, and sharp tangy bite.',
    inStock: true,
    rating: 4.8,
    reviews: 112,
    nutrition: { calories: 115, carbs: 1, fiber: 0, sugar: 0, protein: 7 }
  },
  {
    name: 'Pure Sweet Cream Butter',
    price: 3.99,
    category: 'dairy',
    image: '/images/dairy.jpg',
    description: 'Rich, churned sweet cream salted butter sticks.',
    longDescription: 'Made from premium fresh cream, churned to perfection for silky spreads and golden baking results.',
    inStock: true,
    rating: 4.6,
    reviews: 67,
    nutrition: { calories: 102, carbs: 0, fiber: 0, sugar: 0, protein: 0.1 }
  },

  // Meat & Poultry
  {
    name: 'Boneless Skinless Chicken Breast',
    price: 8.99,
    category: 'meat',
    image: '/images/chicken.jpg',
    description: 'Lean, tender chicken breast raised without hormones.',
    longDescription: 'All-natural, hand-trimmed chicken breasts with exceptional tenderness and high lean protein for clean eating.',
    inStock: true,
    rating: 4.7,
    reviews: 160,
    nutrition: { calories: 165, carbs: 0, fiber: 0, sugar: 0, protein: 31 }
  },
  {
    name: 'Lean Ground Beef 90/10 (1 lb)',
    price: 7.99,
    category: 'meat',
    image: '/images/meat.jpg',
    description: '90% lean ground beef from grass-fed cattle.',
    longDescription: 'Finely ground beef with the perfect balance of juiciness and lean protein. Ideal for homemade burgers, tacos, and meatballs.',
    inStock: true,
    rating: 4.6,
    reviews: 88,
    nutrition: { calories: 200, carbs: 0, fiber: 0, sugar: 0, protein: 22 }
  },
  {
    name: 'Atlantic Salmon Fillet (0.75 lb)',
    price: 11.99,
    category: 'meat',
    image: '/images/meat.jpg',
    description: 'Fresh sustainably sourced Atlantic salmon rich in Omega-3.',
    longDescription: 'Buttery and tender salmon fillet with vibrant color and healthy fatty acids. Fantastic pan-seared or grilled.',
    inStock: true,
    rating: 4.9,
    reviews: 135,
    nutrition: { calories: 208, carbs: 0, fiber: 0, sugar: 0, protein: 20 }
  },

  // Bakery
  {
    name: 'Stone-Ground Whole Wheat Bread',
    price: 2.99,
    category: 'bakery',
    image: '/images/bread.jpg',
    description: 'Hearty whole wheat loaf baked daily with grains and honey.',
    longDescription: 'Baked with 100% whole grain stone-ground wheat flour, sweetened lightly with golden honey, providing sustained energy.',
    inStock: true,
    rating: 4.6,
    reviews: 79,
    nutrition: { calories: 80, carbs: 15, fiber: 3, sugar: 2, protein: 4 }
  },
  {
    name: 'Artisan San Francisco Sourdough',
    price: 4.29,
    category: 'bakery',
    image: '/images/bakery.jpg',
    description: 'Traditional slow-fermented crusty sourdough bread.',
    longDescription: 'Fermented for 24 hours with wild yeast for a distinct tangy crumb and golden blistered crust.',
    inStock: true,
    rating: 4.9,
    reviews: 147,
    nutrition: { calories: 120, carbs: 24, fiber: 1.5, sugar: 1, protein: 4.5 }
  },
  {
    name: 'All-Butter Croissants (4-Pack)',
    price: 4.99,
    category: 'bakery',
    image: '/images/bakery.jpg',
    description: 'Flaky, golden Parisian-style laminated croissants.',
    longDescription: 'Layered with pure butter for dozens of delicate, airy, flaky pastry layers that melt in your mouth.',
    inStock: true,
    rating: 4.8,
    reviews: 92,
    nutrition: { calories: 230, carbs: 26, fiber: 1.5, sugar: 5, protein: 5 }
  },

  // Beverages
  {
    name: '100% Pure Squeezed Orange Juice',
    price: 3.99,
    category: 'beverages',
    image: '/images/fruits-veg.jpg',
    description: 'Pulp-free 100% pure squeezed Florida orange juice.',
    longDescription: 'Not from concentrate. Just fresh, naturally sweet oranges picked and squeezed at peak harvest for your morning energy.',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    nutrition: { calories: 110, carbs: 26, fiber: 0.5, sugar: 22, protein: 2 }
  },
  {
    name: 'Cold Brew Colombian Coffee (32 oz)',
    price: 4.79,
    category: 'beverages',
    image: '/images/recipe2.jpg',
    description: 'Smooth, bold cold brew with low acidity and rich aroma.',
    longDescription: 'Steeped for 18 hours in cold filtered mountain water to extract smooth chocolate and caramel undertones with zero bitterness.',
    inStock: true,
    rating: 4.9,
    reviews: 153,
    nutrition: { calories: 5, carbs: 0, fiber: 0, sugar: 0, protein: 0.3 }
  },
  {
    name: 'Organic Sparkling Lime Water (8-Pack)',
    price: 4.49,
    category: 'beverages',
    image: '/images/fruits-veg.jpg',
    description: 'Zero calorie sparkling water with real lime essence.',
    longDescription: 'Crisp effervescence paired with natural cold-pressed key lime oils. No sweeteners, no sodium, pure crisp refreshment.',
    inStock: true,
    rating: 4.5,
    reviews: 68,
    nutrition: { calories: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0 }
  },

  // Snacks
  {
    name: 'Roasted & Salted California Almonds',
    price: 5.99,
    category: 'snacks',
    image: '/images/fruits-veg.jpg',
    description: 'Crunchy dry-roasted almonds with Mediterranean sea salt.',
    longDescription: 'California-grown nonpareil almonds roasted to nutty perfection and dusted lightly with sea salt. High in vitamin E and magnesium.',
    inStock: true,
    rating: 4.8,
    reviews: 104,
    nutrition: { calories: 170, carbs: 6, fiber: 3, sugar: 1, protein: 6 }
  },
  {
    name: 'Organic Mountain Trail Mix',
    price: 4.99,
    category: 'snacks',
    image: '/images/fruits-veg.jpg',
    description: 'Wholesome mix of dark chocolate chunks, raisins, and nuts.',
    longDescription: 'A balanced energy boost featuring roasted cashews, almonds, sun-dried raisins, and 70% dark chocolate chips.',
    inStock: true,
    rating: 4.7,
    reviews: 81,
    nutrition: { calories: 150, carbs: 16, fiber: 2, sugar: 10, protein: 4 }
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined!');
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    console.log('📊 Database name:', mongoose.connection.db.databaseName);

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products in', mongoose.connection.db.databaseName);

    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully inserted ${result.length} products into '${mongoose.connection.db.databaseName}'`);

    // Group by category to log
    const byCategory = {};
    result.forEach(p => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
    });

    console.log('\n📦 Inserted Products Summary by Category:');
    Object.entries(byCategory).forEach(([cat, count]) => {
      console.log(`   - ${cat.toUpperCase()}: ${count} items`);
    });

    console.log('\n🎉 FreshMart database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
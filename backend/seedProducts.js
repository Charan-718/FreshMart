const mongoose = require('mongoose');
require('dotenv').config();

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    name: 'Organic Apples',
    price: 4.99,
    category: 'fruits',
    image: '/images/apples.jpg',
    description: 'Fresh organic apples from local farms',
    inStock: true
  },
  {
    name: 'Bananas',
    price: 1.99,
    category: 'fruits',
    image: '/images/bananas.jpg',
    description: 'Sweet and ripe bananas',
    inStock: true
  },
  {
    name: 'Carrots',
    price: 2.49,
    category: 'vegetables',
    image: '/images/carrots.jpg',
    description: 'Fresh crunchy carrots',
    inStock: true
  },
  {
    name: 'Milk',
    price: 3.49,
    category: 'dairy',
    image: '/images/milk.jpg',
    description: 'Fresh whole milk',
    inStock: true
  },
  {
    name: 'Eggs',
    price: 4.99,
    category: 'dairy',
    image: '/images/eggs.jpg',
    description: 'Farm fresh eggs',
    inStock: true
  },
  {
    name: 'Chicken Breast',
    price: 8.99,
    category: 'meat',
    image: '/images/chicken.jpg',
    description: 'Boneless chicken breast',
    inStock: true
  },
  {
    name: 'Whole Wheat Bread',
    price: 2.99,
    category: 'bakery',
    image: '/images/bread.jpg',
    description: 'Fresh whole wheat bread',
    inStock: true
  },
  {
    name: 'Orange Juice',
    price: 3.99,
    category: 'beverages',
    image: '/images/juice.jpg',
    description: '100% pure orange juice',
    inStock: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    console.log('📊 Database name:', mongoose.connection.db.databaseName);
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully inserted ${result.length} products`);
    
    // Show inserted products
    console.log('\n📦 Inserted Products:');
    result.forEach(product => {
      console.log(`   - ${product.name} (₹${product.price})`);
    });
    
    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
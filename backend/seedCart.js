const mongoose = require('mongoose');
require('dotenv').config();
const Cart = require('./models/Cart');
const Product = require('./models/Product');

const seedCartData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined!');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    console.log('📊 Database name:', mongoose.connection.db.databaseName);

    // Clear existing carts
    await Cart.deleteMany({});
    console.log('🗑️  Cleared existing carts');

    // Retrieve real seeded products
    const apples = await Product.findOne({ name: /Apples/i });
    const milk = await Product.findOne({ name: /Milk/i });
    const bread = await Product.findOne({ name: /Bread/i });

    const sampleCartItems = [
      {
        sessionId: 'guest_demo123',
        items: [
          {
            productId: apples ? apples._id : new mongoose.Types.ObjectId(),
            name: apples ? apples.name : 'Organic Honeycrisp Apples',
            price: apples ? apples.price : 4.99,
            quantity: 2,
            image: apples ? apples.image : '/images/apples.jpg',
            category: 'fruits'
          },
          {
            productId: milk ? milk._id : new mongoose.Types.ObjectId(),
            name: milk ? milk.name : 'Whole Pasteurized Milk',
            price: milk ? milk.price : 3.49,
            quantity: 1,
            image: milk ? milk.image : '/images/milk.jpg',
            category: 'dairy'
          },
          {
            productId: bread ? bread._id : new mongoose.Types.ObjectId(),
            name: bread ? bread.name : 'Stone-Ground Whole Wheat Bread',
            price: bread ? bread.price : 2.99,
            quantity: 1,
            image: bread ? bread.image : '/images/bread.jpg',
            category: 'bakery'
          }
        ]
      }
    ];

    // Insert sample cart
    const result = await Cart.insertMany(sampleCartItems);
    console.log(`✅ Successfully inserted ${result.length} cart sessions with ${result[0].items.length} items`);

    console.log('🎉 Cart data seeded successfully in', mongoose.connection.db.databaseName);
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding cart data:', error);
    process.exit(1);
  }
};

seedCartData();
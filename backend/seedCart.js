const mongoose = require('mongoose');
require('dotenv').config();

const Cart = require('./models/Cart');

const sampleCartItems = [
  {
    sessionId: 'guest_demo123',
    items: [
      {
        productId: new mongoose.Types.ObjectId(),
        name: 'Organic Apples',
        price: 4.99,
        quantity: 2,
        image: '/images/apples.jpg',
        category: 'fruits'
      },
      {
        productId: new mongoose.Types.ObjectId(),
        name: 'Milk',
        price: 3.49,
        quantity: 1,
        image: '/images/milk.jpg',
        category: 'dairy'
      }
    ]
  }
];

const seedCartData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing carts
    await Cart.deleteMany({});
    console.log('🗑️  Cleared existing carts');

    // Insert sample cart
    const result = await Cart.insertMany(sampleCartItems);
    console.log(`✅ Successfully inserted ${result.length} cart sessions`);

    console.log('🎉 Cart data seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding cart data:', error);
    process.exit(1);
  }
};

seedCartData();
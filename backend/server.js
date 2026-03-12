const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Only use products for now
app.use('/api/products', require('./routes/products'));

// Comment out routes that don't exist yet
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/orders', require('./routes/orders'));
// app.use('/api/recipes', require('./routes/recipes'));
// app.use('/api/cart', require('./routes/cart'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Grocery Market API is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
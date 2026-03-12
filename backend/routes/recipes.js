const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Recipes endpoint - to be implemented' });
});

router.post('/suggest', (req, res) => {
  res.json({ message: 'Recipe suggestions endpoint - to be implemented' });
});

module.exports = router;
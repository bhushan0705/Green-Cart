const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/product');
const router = express.Router();

// 🗂️ Image Upload Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Upload API
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      offerPrice,
      category,
      inStock
    } = req.body;

    const imagePath = req.file ? `./uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      name,
      description,
      price,
      offerPrice,
      image: [imagePath],
      category,
      inStock: inStock === 'true',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('❌ Error uploading product:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

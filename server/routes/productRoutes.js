const express = require('express');
const router = express.Router();
const Product = require('../models/product')

router.get('/', async (req, res)=>{
      const products = await Product.find({});
      res.send(products)
})

router.post('/', async (req, res) => {
  try {
    const { name, description, price, offerPrice, image, category, inStock, createdAt, updatedAt} = req.body;
    const newProduct = new Product({name, description, price, offerPrice, image, category, inStock, createdAt, updatedAt})
    await newProduct.save();
    res.status(201).json({ message: 'Product added', product: newProduct });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
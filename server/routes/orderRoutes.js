const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // import the order model

router.post('/order/place', async (req, res) => {
  try {
    // console.log('📦 Order Request Body:', req.body); 
    const { cartItems, address, paymentMethod, totalAmount } = req.body;

    if (!cartItems || !address || !paymentMethod || !totalAmount) {
      return res.status(400).json({ message: 'Missing required order details' });
    }

    const newOrder = new Order({ cartItems, address, paymentMethod, totalAmount });
    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('❌ Order saving error:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

router.get('/order/place', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    console.error("Fetching orders failed:", err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});
module.exports = router;
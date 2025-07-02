const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    cartItems:[
    {
      _id: String,
      name: String,
      description: [String],
      price: Number,
      offerPrice: Number,
      quantity: Number,
      image: [String],
      category:String,
    }
  ],
    address: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    countryCode: String,
    phone: String,
  },
  paymentMethod: String,
  totalAmount: Number,
  // category:String,
  createdAt: { type: Date, default: Date.now },
})


module.exports = mongoose.model('Order', orderSchema);
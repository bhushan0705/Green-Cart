const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db')

const app = express();
db()

// 🧠 Middleware
app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", methods: ["POST", "GET"] }));  // org 
// app.use(cors({
//   origin: "https://green-cart-frontend-kqx3.onrender.com",
//   methods: ["POST", "GET"],
//   credentials: true  // optional
// }));

app.use(cors({
  origin: ['https://green-cart-frontend-kqx3.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoutes = require('./routes/userInfo')
const productRoutes = require('./routes/productRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
const sellerRoutes = require('./routes/sellerProduct'); // image + product upload

app.use(userRoutes)
app.use('/router/products', productRoutes); 
app.use('/api', orderRoutes);               // for orders
app.use('/seller', sellerRoutes);           // image & product upload

// 🚀 Start Server
const PORT =  process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



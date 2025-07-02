const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()

// 🛢️ MongoDB Connection
const connectionDB = async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error(error)
  }

}

module.exports = connectionDB;
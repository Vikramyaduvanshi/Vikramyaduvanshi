const mongoose = require('mongoose');
let dotenv=require("dotenv")
dotenv.config()
const connectDB = async () => {
 let res= await mongoose.connect(process.env.MONGO_URI)

console.log("Database connected")
 
};

module.exports = connectDB;

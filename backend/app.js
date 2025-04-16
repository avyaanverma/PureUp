// app.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
const PORT =process.env.PORT ||  8000;
const cors = require("cors");
const plantRoutes = require('./routes/plantRoutes')
const farmerRoutes = require("./routes/farmerRoutes")
const productRoutes = require("./routes/productRoutes")
const auth = require("./middleware/auth");
const userRoutes = require('./routes/User');  // Adjust path based on your file structure
const path = require("path");
const Razorpay = require("razorpay")

app.use(bodyParser.json());
const MONGO_URI = process.env.MONGO_URI;
console.log(process.env.FRONTEND_URL);

app.use(cors({
    origin: '*', // Change this to match your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process if connection fails
    }
};

connectDB();
app.use('/api/user', userRoutes);
app.use('/api', plantRoutes); // All routes will start with /api
app.use("/api/farmers", farmerRoutes);
app.use('/api/products', productRoutes);
app.use(express.static(path.join(__dirname, "frontend/dist")));


app.get('/', async(req,res)=>{
    let mssge = {
        name : "Pure Up API",
        status : "working fine"
    }
    try{
        res.json({success : true, message: mssge});
    }catch(error){

    }
})
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
//   });
app.get('/api/city/:city', auth , async (req, res)=>{
    const {city} = req.params;
    if(!city || typeof city !== 'string'){
        return res.status(500).json({success: false, message: "Invalid city name"});
    }

    try{
        const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${DATA_API_TOKEN}`);

        const aqiData = response.data;
        res.json({success: true, aqi: aqiData})
    }catch(error){
        console.error('Error fetching the API Data : ', error.message);
        res.status(500).json({success: false, message: 'Error fetching the API Data'})
    }
})
const razorpay = new Razorpay({
    key_id: "YOUR_KEY_ID",
    key_secret: "YOUR_KEY_SECRET",
  });
  
  app.post("/create-order", async (req, res) => {
    const { amount } = req.body;
  
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (err) {
      res.status(500).send(err);
    }
  });


app.listen(PORT, ()=>{
    console.log("Listening on port : ", PORT);
    
})

module.exports = app;









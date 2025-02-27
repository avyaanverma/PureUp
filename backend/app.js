const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config();
const plantRoutes = require('./routes/plantRoutes')
const app = express();
const PORT = 8000;
const cors = require("cors");


app.use(bodyParser.json());
const MONGO_URI = process.env.MONGO_URI;
app.use(cors({
    origin: "http://localhost:5173", // Change this to match your frontend URL
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

app.use('/api', plantRoutes); // All routes will start with /api

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

app.get('/api/city/:city' , async (req, res)=>{
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




app.listen(PORT, ()=>{
    console.log("Listening on port : ", PORT);
    
})

module.exports = app;









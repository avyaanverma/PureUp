const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
const PORT = 8000;

app.use(bodyParser.json());


// importing env variables
const KESTRA_API_URL = process.env.KESTRA_API_URL;
const DATA_API_URL = process.env.AQI_API;
const DATA_API_TOKEN = process.env.DATA_API_TOKEN;
const DB_URI = process.env.DB_URI;

// mongoose connection 
const connectDB = async()=>{

    await mongoose.connect(DB_URI).then(()=>{
        console.log("Database Connected....");
        
    }).catch(e=>{
        console.log(e.message);
        
    })
}

connectDB();
// creating database schema
const plantSchema = new mongoose.Schema({
    plant:{type: String, required: true} ,
    image: {type: String, required: true},
    description: {type: String, required: true}
})

const Plant = new mongoose.model('Plant', plantSchema);

// CITY -- PLANT_DATA
// GET /api/plant_data



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
let cachedPlantOfTheDay = null;
app.get('/api/plant-of-the-day', async (req, res) => {
    try {
        // Get the current day of the week (0 - Sunday, 6 - Saturday)
        const today = new Date().toISOString().split('T')[0];
        if (cachedPlantOfTheDay?.date === today) {
            return res.json({ success: true, plant: cachedPlantOfTheDay.plant });
        }
        const weekday = new Date().getDay();
        // Fetch all plants from the database
        const plants = await Plant.find().limit(7);

        // Ensure there are plants in the database
        if (plants.length === 0) {
            return res.status(404).json({ success: false, message: 'No plants found in the database' });
        }
        // Pick the plant based on the weekday, ensuring that if the day exceeds plant array length, it loops
        const plantOfTheDay = plants[weekday % plants.length];
        cachedPlantOfTheDay = { date: today, plant: plantOfTheDay };
        // Send the plant details as response
        res.json({
            success: true,
            plant: plantOfTheDay
        });
    } catch (error) {
        console.error('Error fetching plant of the day:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch plant of the day' });
    }
});




// app.get('/testaddplan', async(req,res)=>{
//     try{
//         const aloevera = new Plant({
//             plant: "Aloe Vera",
//             image: "https://images.unsplash.com/photo-1644585950926-fc599ef6f293?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxvZXZlcmF8ZW58MHx8MHx8fDA%3D",
//             description : "A succulent plant with medicinal properties"
//         })
//         await aloevera.save();
//         res.json({ success: true, message: 'Plant added!', plant: aloevera }); 
//     }catch (error) {
//         console.error('Error adding plant:', error.message);
//         res.status(500).json({ success: false, message: 'Failed to add plant.' });
//     }
// })

// app.post('/add-plant', async (req, res) => {
//     const { plant, description, image } = req.body;
    
//     if (!plant || !description || !image) {
//         return res.status(400).json({ success: false, message: 'All fields are required.' });
//     }

//     try {
//         const newPlant = new Plant({ plant, description, image });
//         await newPlant.save();
//         res.json({ success: true, message: 'Plant added!', plant: newPlant });
//     } catch (error) {
//         console.error('Error adding plant:', error.message);
//         res.status(500).json({ success: false, message: 'Failed to add plant.' });
//     }
// });

app.listen(PORT, ()=>{
    console.log("Listening on port : ", PORT);
    
})

module.exports = app;









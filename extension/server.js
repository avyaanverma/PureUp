const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001; // Use a different port than the React app (usually 3000)

// --- Configuration ---
const mongoUri = "mongodb+srv://Aksh20:Aksh20@cluster0.hget4ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const plantsDbName = 'plants'; // Renamed for clarity
const plantsCollectionName = 'plants_info';
const particlesDbName = 'particles'; // New DB name
const aqiInfoCollectionName = 'aqi_info'; // New collection name

// --- Middleware ---
app.use(cors()); // Allow requests from any origin (adjust for production later if needed)
app.use(express.json()); // Parse JSON request bodies

// --- MongoDB Client ---
const client = new MongoClient(mongoUri);
let plantsDb; // Reference for the 'plants' database
let particlesDb; // Reference for the 'particles' database

async function connectDb() {
    try {
        await client.connect();
        plantsDb = client.db(plantsDbName);
        particlesDb = client.db(particlesDbName); // Connect to the new DB as well
        console.log(`Connected successfully to MongoDB databases: ${plantsDbName}, ${particlesDbName}`);
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1); // Exit if DB connection fails
    }
}

// --- API Endpoint for Plant Details ---
app.post('/api/plant-details', async (req, res) => {
    if (!plantsDb) { // Check specific DB connection
        return res.status(503).json({ error: "Plants database not connected" });
    }

    const plantNames = req.body.plantNames; // Expecting an array of names: ["Aloe Vera", "Snake Plant"]

    if (!Array.isArray(plantNames) || plantNames.length === 0) {
        return res.status(400).json({ error: "Missing or invalid 'plantNames' array in request body" });
    }

    console.log("Received request for plant details:", plantNames);

    try {
        const collection = plantsDb.collection(plantsCollectionName); // Use correct DB and collection
        // Find documents where 'plant_name' is in the provided array
        const plantDetails = await collection.find({ plant_name: { $in: plantNames } }).toArray();

        console.log(`Found ${plantDetails.length} matching documents.`);

        // Optional: Create a map for easier lookup on the frontend if needed,
        // or just return the array as is. Returning array is simpler.
        res.json(plantDetails);

    } catch (err) {
        console.error("Error fetching plant details from MongoDB:", err);
        res.status(500).json({ error: "Failed to fetch plant details" });
    }
});

// --- API Endpoint for Random Plant ---
app.get('/api/random-plant', async (req, res) => {
    if (!plantsDb) { // Check specific DB connection
        return res.status(503).json({ error: "Plants database not connected" });
    }

    console.log("Received request for random plant details");

    try {
        const collection = plantsDb.collection(plantsCollectionName); // Use correct DB and collection
        // Use aggregation pipeline with $sample to get 1 random document
        const randomPlant = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();

        if (randomPlant.length > 0) {
            console.log(`Found random plant: ${randomPlant[0].plant_name}`);
            res.json(randomPlant[0]); // Return the single random plant object
        } else {
            res.status(404).json({ error: "No plants found in the collection" });
        }

    } catch (err) {
        console.error("Error fetching random plant details from MongoDB:", err);
        res.status(500).json({ error: "Failed to fetch random plant details" });
    }
});

// --- API Endpoint for Logging AQI Data ---
app.post('/api/log-aqi', async (req, res) => {
    if (!particlesDb) { // Check particles DB connection
        return res.status(503).json({ error: "Particles database not connected" });
    }

    const { latitude, longitude, cityName, aqiData } = req.body;

    if (latitude == null || longitude == null || !cityName || !aqiData) {
        return res.status(400).json({ error: "Missing required fields (latitude, longitude, cityName, aqiData)" });
    }

    console.log(`Received request to log AQI for city: ${cityName}`);

    try {
        const collection = particlesDb.collection(aqiInfoCollectionName); // Use new DB and collection

        const logEntry = {
            cityName,
            latitude,
            longitude,
            aqiData, // Store the entire object received from frontend
            timestamp: new Date() // Add/update a timestamp
        };

        // Define the filter to find a document with the same coordinates
        const filter = { latitude: latitude, longitude: longitude };

        // Define the update operation using $set to replace fields
        const updateDoc = {
            $set: {
                cityName: cityName, // Update city name in case it changes for coords
                aqiData: aqiData,
                timestamp: logEntry.timestamp // Use the timestamp from the logEntry object
            }
        };

        // Set options for updateOne: upsert = true means insert if not found
        const options = { upsert: true };

        // Perform the upsert operation
        const result = await collection.updateOne(filter, updateDoc, options);

        if (result.upsertedCount > 0) {
            console.log(`AQI data inserted for ${cityName} with ID: ${result.upsertedId._id}`);
            res.status(201).json({ message: "AQI data logged (inserted) successfully", id: result.upsertedId._id });
        } else if (result.modifiedCount > 0) {
            console.log(`AQI data updated for ${cityName} (lat: ${latitude}, lon: ${longitude})`);
            res.status(200).json({ message: "AQI data logged (updated) successfully" });
        } else {
             console.log(`AQI data for ${cityName} (lat: ${latitude}, lon: ${longitude}) was already up-to-date.`);
             res.status(200).json({ message: "AQI data already up-to-date" });
        }

    } catch (err) {
        console.error(`Error upserting AQI data for ${cityName}:`, err);
        res.status(500).json({ error: "Failed to log AQI data" });
    }
});


// --- Start Server ---
async function startServer() {
    await connectDb(); // Connect to DB before starting listener
    // Use port provided by environment (Render) or default to 3001 for local dev
    const PORT = process.env.PORT || 3001;
    // Listen on 0.0.0.0 to accept connections from Render's proxy
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Backend server listening on port ${PORT}`);
    });
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log("Closing MongoDB connection...");
    await client.close();
    console.log("MongoDB connection closed. Exiting.");
    process.exit(0);
});

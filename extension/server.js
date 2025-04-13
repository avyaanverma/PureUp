const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001; // Use a different port than the React app (usually 3000)

// --- Configuration ---
const mongoUri = "mongodb+srv://Aksh20:Aksh20@cluster0.hget4ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'plants';
const collectionName = 'plants_info';

// --- Middleware ---
app.use(cors()); // Allow requests from any origin (adjust for production later if needed)
app.use(express.json()); // Parse JSON request bodies

// --- MongoDB Client ---
const client = new MongoClient(mongoUri);
let db;

async function connectDb() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log(`Connected successfully to MongoDB database: ${dbName}`);
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1); // Exit if DB connection fails
    }
}

// --- API Endpoint ---
app.post('/api/plant-details', async (req, res) => {
    if (!db) {
        return res.status(503).json({ error: "Database not connected" });
    }

    const plantNames = req.body.plantNames; // Expecting an array of names: ["Aloe Vera", "Snake Plant"]

    if (!Array.isArray(plantNames) || plantNames.length === 0) {
        return res.status(400).json({ error: "Missing or invalid 'plantNames' array in request body" });
    }

    console.log("Received request for plant details:", plantNames);

    try {
        const collection = db.collection(collectionName);
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

// --- Start Server ---
async function startServer() {
    await connectDb(); // Connect to DB before starting listener
    app.listen(port, () => {
        console.log(`Backend server listening on http://localhost:${port}`);
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

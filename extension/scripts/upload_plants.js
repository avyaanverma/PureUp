const { MongoClient } = require('mongodb');

// Connection URI - **IMPORTANT**: Replace placeholders if necessary, but using the provided one.
const uri = "mongodb+srv://Aksh20:Aksh20@cluster0.hget4ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Database and Collection names
const dbName = 'plants';
const collectionName = 'plants_info';

// Plant data provided by the user
const plantData = [
  {
    "plant_name": "Aloe Vera",
    "image_location": "", // Assuming empty for now, can be updated later
    "description": "Aloe Vera is a succulent known for its medicinal properties and air-purifying abilities. It thrives in bright, indirect sunlight and requires minimal watering. The gel inside its leaves is used to treat minor cuts and burns.",
    "light_requirement": "Bright Indirect Light",
    "watering_frequency": "Every 2-3 weeks",
    "humidity": "Low",
    "temperature_range": "13-27°C (55-80°F)"
  },
  {
    "plant_name": "Areca Palm",
    "image_location": "",
    "description": "Areca Palm, also known as Butterfly Palm, is a popular indoor plant that adds a tropical feel to interiors. It acts as a natural humidifier and is effective in removing indoor air pollutants.",
    "light_requirement": "Bright Indirect Light",
    "watering_frequency": "Every 2-3 days",
    "humidity": "High",
    "temperature_range": "18-24°C (65-75°F)"
  },
  {
    "plant_name": "Boston Fern",
    "image_location": "",
    "description": "Boston Fern is a lush, arching plant that thrives in humid environments. It's excellent for purifying indoor air and prefers consistent moisture and indirect light.",
    "light_requirement": "Indirect Light",
    "watering_frequency": "Keep Soil Moist",
    "humidity": "High",
    "temperature_range": "16-24°C (60-75°F)"
  },
  {
    "plant_name": "Ficus",
    "image_location": "",
    "description": "Ficus, commonly known as Weeping Fig, is a popular indoor tree with glossy leaves. It requires consistent care and prefers bright, indirect light to thrive.",
    "light_requirement": "Bright Indirect Light",
    "watering_frequency": "Weekly",
    "humidity": "Medium",
    "temperature_range": "16-24°C (60-75°F)"
  },
  {
    "plant_name": "Money Plant",
    "image_location": "",
    "description": "Money Plant, also known as Devil's Ivy, is a hardy vine known for its air-purifying qualities. It's believed to bring prosperity and requires minimal care.",
    "light_requirement": "Bright Indirect Light",
    "watering_frequency": "Every 1-2 weeks",
    "humidity": "Medium",
    "temperature_range": "15-24°C (59-75°F)"
  },
  {
    "plant_name": "Neem",
    "image_location": "",
    "description": "Neem is a medicinal plant known for its antibacterial properties. While commonly grown outdoors, it can be cultivated indoors with ample sunlight.",
    "light_requirement": "Full Sunlight",
    "watering_frequency": "Every 1-2 weeks",
    "humidity": "Low",
    "temperature_range": "20-35°C (68-95°F)"
  },
  {
    "plant_name": "Peace Lily",
    "image_location": "",
    "description": "Peace Lily is an elegant plant known for its white blooms and air-purifying abilities. It thrives in low-light conditions and prefers moist soil.",
    "light_requirement": "Low to Medium Indirect Light",
    "watering_frequency": "Weekly",
    "humidity": "Medium to High",
    "temperature_range": "18-27°C (65-80°F)"
  },
  {
    "plant_name": "Pothos",
    "image_location": "",
    "description": "Pothos is a versatile vine celebrated for its heart-shaped leaves. It's exceptionally easy to care for and can thrive in a range of lighting conditions.",
    "light_requirement": "Low to Bright Indirect Light",
    "watering_frequency": "Every 1-2 weeks",
    "humidity": "Low to Medium",
    "temperature_range": "15-29°C (60-85°F)"
  },
  {
    "plant_name": "Rubber Plant",
    "image_location": "",
    "description": "Rubber Plant features large, glossy leaves and can grow into an impressive indoor tree. It's relatively easy to care for and adds a bold statement to interiors.",
    "light_requirement": "Bright Indirect Light",
    "watering_frequency": "Every 1-2 weeks",
    "humidity": "Medium",
    "temperature_range": "15-26°C (60-79°F)"
  },
  {
    "plant_name": "Snake Plant",
    "image_location": "",
    "description": "Snake Plant is a hardy succulent known for its upright, sword-like leaves. It's renowned for its air-purifying qualities and ability to thrive on neglect.",
    "light_requirement": "Low to Bright Indirect Light",
    "watering_frequency": "Every 2-4 weeks",
    "humidity": "Low to Medium",
    "temperature_range": "18-29°C (65-85°F)"
  },
  {
    "plant_name": "Spider Plant",
    "image_location": "",
    "description": "Spider Plant is popular for its arching leaves and baby 'spiderettes'. It's adaptable, easy to care for, and excellent at purifying indoor air.",
    "light_requirement": "Bright Indirect Light",
    "watering_frequency": "Every 1-2 weeks",
    "humidity": "Medium",
    "temperature_range": "13-27°C (55-80°F)"
  },
  {
    "plant_name": "Tulsi",
    "image_location": "",
    "description": "Tulsi, also known as Holy Basil, is revered for its medicinal properties and spiritual significance. It purifies the air and is commonly grown in Indian households.",
    "light_requirement": "Full Sunlight",
    "watering_frequency": "Every 2-3 days",
    "humidity": "Medium",
    "temperature_range": "20-35°C (68-95°F)"
  }
];

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    // Select the database
    const database = client.db(dbName);
    console.log(`Using database: ${dbName}`);

    // Select the collection
    const collection = database.collection(collectionName);
    console.log(`Using collection: ${collectionName}`);

    // Check if the collection is empty before inserting
    const count = await collection.countDocuments();
    if (count > 0) {
        console.log(`Collection '${collectionName}' already contains ${count} documents. Skipping insertion.`);
    } else {
        // Insert the plant data into the collection
        const result = await collection.insertMany(plantData);
        console.log(`${result.insertedCount} documents were inserted into the collection '${collectionName}'`);
    }

  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

// Run the function
run().catch(console.dir);

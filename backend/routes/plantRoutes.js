const express = require("express");
const {
    getAllPlants,
    getPlantOfTheDay,
    getPlantById,
    addPlant,
    updatePlant,
    deletePlant
} = require("../controllers/plantController");

const router = express.Router();

// ✅ Public Routes
router.get("/plants", getAllPlants);
router.get("/plant-of-the-day", getPlantOfTheDay);
router.get("/plants/:id", getPlantById);

// ✅ Admin Routes
router.post("/add-plant", addPlant);
router.put("/plants/:id", updatePlant);
router.delete("/plants/:id", deletePlant);

module.exports = router;

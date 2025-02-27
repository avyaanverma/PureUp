const express = require("express");
const { getAllFarmers, getFarmerById, createFarmer, updateFarmer, deleteFarmer } = require("../controllers/farmerController");

const router = express.Router();

// ✅ Farmer Routes
router.get("/", getAllFarmers);
router.get("/:id", getFarmerById);
router.post("/", createFarmer);
router.put("/:id", updateFarmer);
router.delete("/:id", deleteFarmer);

module.exports = router;

const Farmer = require("../models/Farmer");

// ✅ Get all farmers
const getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).json(farmers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get a single farmer by ID
const getFarmerById = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);
        if (!farmer) return res.status(404).json({ message: "Farmer not found" });
        res.status(200).json(farmer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Create a new farmer
const createFarmer = async (req, res) => {
    try {
        const newFarmer = new Farmer(req.body);
        await newFarmer.save();
        res.status(201).json(newFarmer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ Update an existing farmer
const updateFarmer = async (req, res) => {
    try {
        const updatedFarmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFarmer) return res.status(404).json({ message: "Farmer not found" });
        res.status(200).json(updatedFarmer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete a farmer
const deleteFarmer = async (req, res) => {
    try {
        const deletedFarmer = await Farmer.findByIdAndDelete(req.params.id);
        if (!deletedFarmer) return res.status(404).json({ message: "Farmer not found" });
        res.status(200).json({ message: "Farmer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllFarmers, getFarmerById, createFarmer, updateFarmer, deleteFarmer };

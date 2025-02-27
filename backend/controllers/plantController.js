const Plant = require('../models/Plants')

const getPlantOfTheDay = async (req,res)=>{
    // i will getting all the plants from the mongodb database
    try{
        const plants = await Plant.find();
        const plantOfTheDay = plants[Math.floor(Math.random() * plants.length)];
        res.json({success: true, plant: plantOfTheDay});
    }catch(error){
        res.status(500).json({success: "false", message : "failed to fetch plants"});
    }
};

const addPlant = async (req,res)=>{
    try{
        const { name, image, description, price, isPlantOfTheDay } = req.body;
        const plant = new Plant({ name, image, description, price, isPlantOfTheDay });

        await plant.save();
        res.json({success: "true", message: "plant added successfully"});
    }catch(error){
        res.status(500).json({success: "false", message : "failed to add plant", error: error});
    }
};

const getAllPlants = async (req,res)=>{
    try{
        const plants = await Plant.find();
        res.json(plants);
    }catch(error){
        res.status(500).json({status: "failure", error: error});
    }

};

const getPlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) return res.status(404).json({ message: "Plant not found" });
        res.json(plant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching plant", error });
    }
};
const updatePlant = async (req, res) => {
    try {
        const { name, image, description, price, isPlantOfTheDay } = req.body;
        if (isPlantOfTheDay) await Plant.updateMany({}, { isPlantOfTheDay: false });
        const plant = await Plant.findByIdAndUpdate(req.params.id, { name, image, description, price, isPlantOfTheDay }, { new: true });
        if (!plant) return res.status(404).json({ message: "Plant not found" });
        res.json(plant);
    } catch (error) {
        res.status(500).json({ message: "Error updating plant", error });
    }
};

const deletePlant = async (req, res) => {
    try {
        const plant = await Plant.findByIdAndDelete(req.params.id);
        if (!plant) return res.status(404).json({ message: "Plant not found" });
        res.json({ message: "Plant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting plant", error });
    }
};
module.exports = {
    getAllPlants,
    getPlantOfTheDay,
    getPlantById,
    addPlant,
    updatePlant,
    deletePlant
} 
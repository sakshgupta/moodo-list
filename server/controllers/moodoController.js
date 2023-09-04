const Moodo = require("../models/moodo");

// route - http://localhost:5000/moodos/create
const createMoodo = async (req, res) => {
    try {
        const { task, tags } = req.body;

        // Create a new Moodo document
        const moodo = new Moodo({
            task,
            tags,
        });

        // Save the Moodo to the database
        await moodo.save();

        res.status(201).json(moodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// route - http://localhost:5000/moodos/get
const getAllMoodos = async (req, res) => {
    try {
        const moodos = await Moodo.find();
        res.json(moodos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// route - http://localhost:5000/moodos/toogle
const toggleMoodoCompletion = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the Moodo by ID
        const moodo = await Moodo.findById(id);

        // Toggle the completion status
        moodo.completed = !moodo.completed;

        // Save the updated Moodo
        await moodo.save();

        res.json(moodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// route - http://localhost:5000/moodos/delete
const deleteMoodo = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find and remove the Moodo by ID
        await Moodo.findByIdAndRemove(id);

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// route - http://localhost:5000/moodos/id/edit
const editMoodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, tags } = req.body;

        const updatedMoodo = await Moodo.findByIdAndUpdate(
            id,
            { task, tags },
            { new: true }
        );

        if (!updatedMoodo) {
            return res.status(404).json({ error: "Moodo not found" });
        }

        res.status(200).json(updatedMoodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    createMoodo,
    getAllMoodos,
    toggleMoodoCompletion,
    deleteMoodo,
    editMoodo,
};

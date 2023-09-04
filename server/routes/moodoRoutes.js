const express = require("express");
const router = express.Router();
const {
    createMoodo,
    getAllMoodos,
    toggleMoodoCompletion,
    deleteMoodo,
    editMoodo,
} = require("../controllers/moodoController");

// Route to create a new Moodo
router.post("/moodos/create", createMoodo);

// Route to get all Moodos
router.get("/moodos/get", getAllMoodos);

// Route to toggle Moodo completion status
router.put("/moodos/:id/toggle", toggleMoodoCompletion);

// Route to delete a Moodo by ID
router.delete("/moodos/:id/delete", deleteMoodo);

// Route to edit a Moodo 
router.put("/moodos/:id/edit", editMoodo);

module.exports = router;

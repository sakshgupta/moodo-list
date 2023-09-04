const { User } = require("../models/moodo");
const bcrypt = require("bcrypt");

// route - http://localhost:5000/moodos/create
const createMoodo = async (req, res) => {
    try {
        const { task, tags, email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a new Moodo document
        const moodo = {
            task,
            tags,
        };

        // Add the Moodo to the user's moodos array
        user.moodos.push(moodo);

        // Save the updated user document
        await user.save();

        res.status(201).json(moodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// route - http://localhost:5000/moodos/email/get
const getAllMoodos = async (req, res) => {
    try {
        const { email } = req.params;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Retrieve the moodos array from the user
        const moodos = user.moodos;
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
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the Moodo within the user's moodos array by ID
        const moodo = user.moodos.id(id);

        if (!moodo) {
            return res.status(404).json({ error: "Moodo not found" });
        }

        // Toggle the completion status
        moodo.completed = !moodo.completed;

        // Save the updated user document
        await user.save();

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
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find and remove the Moodo within the user's moodos array by ID
        const moodo = user.moodos.id(id);

        if (!moodo) {
            return res.status(404).json({ error: "Moodo not found" });
        }

        moodo.remove();

        // Save the updated user document
        await user.save();

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
        const { email, task, tags } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the Moodo within the user's moodos array by ID
        const moodo = user.moodos.id(id);

        if (!moodo) {
            return res.status(404).json({ error: "Moodo not found" });
        }

        // Update the Moodo properties
        moodo.task = task;
        moodo.tags = tags;

        // Save the updated user document
        await user.save();

        res.status(200).json(moodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Route - http://localhost:5000/user/signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user in the database
        const savedUser = await newUser.save();

        // Respond with the newly created user
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Route - http://localhost:5000/user/signin
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user with the provided email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // If the email and password are correct, respond with the user data
        res.status(200).json(user);
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
    signup,
    signin,
};

const mongoose = require("mongoose");

const moodoSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        tags: {
            type: [String],
            default: [],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    moodos: [moodoSchema],
});

const User = mongoose.model("user", userSchema);

module.exports = {
    User,
};

/* Load Dependencies */
const mongoose = require('mongoose');

/* User Schema Definition */
const tileSchema = mongoose.Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true},
    label: { type: String, required: true },
    description: { type: String, required: true },
    javascript: { type: String, required: true },
});

/* User Model Definition */
const Tile = mongoose.model('Tile', tileSchema);

module.exports = Tile;
/**
 * @file modules/tile.js
 * @description Module for tile CRUD operations
 * @module modules/tile
 */

/* Local Dependencies */
const connectDB = require('../modules/db');
const Tile = require('../models/Tile');
const { generateTileCode } = require('./openai');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a new tile
 * @param {Object} tile
 * @throws Error if something goes wrong
 * @returns {Object} Created tile
 */
const createTile = async (tile) => {
    const code = await generateTileCode(tile.description);
    tile.javascript = code;
    const newTile = new Tile({ ...tile, _id: uuidv4() });
    await connectDB(true);
    try {
        await newTile.save();
        connectDB(false);
        return newTile;
    } catch (err) {
        connectDB(false);
        throw err;
    }
};

/**
 * Get all tiles for a user
 * @param {String} userId
 * @throws Error if something goes wrong
 * @returns {Array} Array of tiles
 */
const getTiles = async (userId) => {
    try {
        await connectDB(true);
        const tiles = await Tile.find({ userId }).exec();
        connectDB(false);
        return tiles;
    } catch (err) {
        throw err;
    }
};

/**
 * Deletes a tile
 * @param {String} id 
 * @param {String} userId 
 * @throws Error if something goes wrong
 * @returns {void}
 */
const deleteTile = async (id, userId) => {
    try {
        await connectDB(true);
        await Tile.findOneAndDelete({ _id: id, userId: userId }).exec();
        connectDB(false);
    } catch (err) {
        connectDB(false);
        throw err;
    }
}

module.exports = {
    createTile,
    getTiles,
    deleteTile
};
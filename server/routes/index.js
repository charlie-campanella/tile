/* Third Party Dependencies */
const express = require('express');
const router = express.Router();

/* Local Dependencies */
const user = require('../modules/user');
const tile = require('../modules/tile');

/* Authentication Middleware */
const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'Authorization header required' });
        return;
    }
    // If the token is invalid, req.user will not be set
    try {
        const decoded = await user.validateToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid authorization token' });
    }
};

/* Route Handlers */

// User Registration
router.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        await user.register(email, password);
        res.status(200).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const token = await user.login(email, password);
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all tiles for a given user
router.get('/tiles', requireAuth, async (req, res) => {
    const userId = req.user._id;
    try {
        const tiles = await tile.getTiles(userId);
        res.status(200).json({ tiles });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create a new tile for a given user
router.post('/tiles', requireAuth, async (req, res) => {
    const userId = req.user._id;
    try {
        const newTile = await tile.createTile({
            userId,
            label: req.body.label,
            description: req.body.description,
            javascript: null
        });
        res.status(200).json({ tile: newTile });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a tile for a given user
router.delete('/tiles/:id', requireAuth, async (req, res) => {
    const userId = req.user._id;
    const id = req.params.id;
    try {
        await tile.deleteTile(id, userId);
        res.status(200).json({ message: 'Tile deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remaining routes are handled in-browser via React Router
router.get('/*', (req, res) => {
    res.contentType('text/html');
    res.sendFile('index.html', { root: 'public' });
});

module.exports = router;
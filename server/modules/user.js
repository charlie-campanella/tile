/**
 * @file modules/user.js
 * @description User module for registering, logging in, and validating users
 * @module modules/user
 */

/* Third Party Dependencies */
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

/* Local Dependencies */
const credentials = require('../modules/credentials');
const connectDB = require('../modules/db');
const User = require('../models/User');

/**
 * Register a new user
 * 
 * @param {String} email 
 * @param {String} password 
 * @throws Error if email is already in use
 */
const register = async (email, password) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const passwordHash = await bcrypt.hash(password, 0);
    await connectDB(true);
    const newUser = new User({ _id: uuidv4(), email, passwordHash });
    try {
        const userExists = await User.findOne({ email }).exec();
        if (userExists) {
            throw new Error('Email already in use');
        }
        await newUser.save();
        await connectDB(false);
        return newUser;
    } catch (err) {
        connectDB(false);
        throw err;
    }
};

/**
 * Login a user
 * @param {String} email
 * @param {String} password
 * @throws Error if email or password is incorrect
 * @returns {String} JSON Web Token for subsequent requests
 */ 
const login = async (email, password) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const ERROR_MESSAGE = 'Email or password is incorrect';
    await connectDB(true);
    try {
        const loginUser = await User.findOne({ email }).exec();
        if (!loginUser) {
            throw new Error(ERROR_MESSAGE);
        }
        const passwordMatches = await bcrypt.compare(password, loginUser.passwordHash);
        if (!passwordMatches) {
            throw new Error(ERROR_MESSAGE);
        }
        await connectDB(false);
        const token = jwt.sign({ _id: loginUser._id, email }, credentials.jwt.signingSecret, { expiresIn: '24h' });
        return token;
    } catch (err) {
        connectDB(false);
        throw err;
    }
};

/**
 * Validate a JSON Web Token
 * @param {token} token JSON Web Token (JWT)
 * @throws Error if token is invalid
 * @returns {Object} Decoded token
 */
const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, credentials.jwt.signingSecret);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        return decoded
    } catch (err) {
        throw err;
    }
};

module.exports = { register, login, validateToken };
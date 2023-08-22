/* Load Dependencies */
const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

/* User Schema Definition */
const userSchema = mongoose.Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true},
    passwordHash: { type: String, required: true },
});

/* User Model Definition */
const User = mongoose.model('User', userSchema);

module.exports = User;
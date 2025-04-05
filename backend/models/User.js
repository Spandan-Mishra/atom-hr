const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'user');
module.exports = User;

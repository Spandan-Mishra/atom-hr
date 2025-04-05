const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
    role: { type: String, required: true, enum: ['Lead HR', 'HR', 'Employee'] },
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'user');
module.exports = User;

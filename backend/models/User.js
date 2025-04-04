const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    companyName: { type: String, required: true },
    role: { type: String, enum: ['employee', 'manager'], required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;

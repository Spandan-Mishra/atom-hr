
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

router.post('/login', async (req, res) => {
    console.log(req.body);

    const { id, companyName, phone } = req.body;
    try {
        console.log(id, companyName, phone);
        const user = await User.find({id, companyName, phone});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/register', async (req, res) => {
    const { id, companyName, phone, role } = req.body;

    try {
        const newUser = new User({
            id,
            companyName,
            phone,
            role
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error registering user', error });
    }
});

router.get('/user/:phone', async (req, res) => {
    const phone = req.params.phone;
    const user = await User.findOne({ phone });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User found', user });
})

module.exports = router;
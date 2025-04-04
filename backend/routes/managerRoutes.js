const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const User = require('../models/User');

router.get('/employees', async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/progress/:employeeId', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ to: req.params.employeeId }).populate('taskId from');
        if (!feedbacks.length) return res.status(404).json({ message: 'No feedback found' });

        // AI logic for development plan (Mockup)
        const developmentPlan = {
            improvementAreas: ['Communication', 'Time Management'],
            recommendedTrainings: ['Leadership Workshop', 'Time Efficiency Course'],
        };

        res.json({ feedbacks, developmentPlan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

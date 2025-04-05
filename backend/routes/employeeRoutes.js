const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Feedback = require('../models/Feedback');
const User = require('../models/User');

router.get('/tasks/:employeeId', async (req, res) => {
    try {
        const tasks = await Task.find({ assignees: req.params.employeeId }).populate('creatorId', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/task-details/:taskId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId)
            .populate('creatorId', 'name email role')
            .populate('assignees', 'name email role');

        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/feedback', async (req, res) => {
    try {
        const { taskId, from, to, formData } = req.body;

        const feedback = new Feedback({
            taskId,
            from,
            to,
            formData
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/feedbacks/received/:employeeId', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ to: req.params.employeeId })
            .populate('from', 'name email')
            .populate('taskId', 'title');

        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/goals/:employeeId', async (req, res) => {
    
    res.json({ message: 'Goals' });
});

router.get('/development-plan/:employeeId', async (req, res) => {
    
    res.json({ message: 'Development Plan' });
});

module.exports = router;

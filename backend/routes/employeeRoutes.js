const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const { processFeedback } = require('../services/feedbackService');

// Get all tasks assigned to an employee
router.get('/tasks/:employeeId', async (req, res) => {
    try {
        const tasks = await Task.find({ assignees: req.params.employeeId })
            .populate('creatorId', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get detailed task info
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

// Submit feedback (from employee or HR)
router.post('/feedback', async (req, res) => {
    try {
        const { taskId, from, to, formData, feedbackType } = req.body;

        const feedback = await processFeedback({ taskId, from, to, formData, feedbackType });

        res.status(201).json({
            message: 'Feedback submitted successfully with AI summary',
            feedback,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all feedbacks received by an employee
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

// Optional routes for future use
router.get('/goals/:employeeId', async (req, res) => {
    res.json({ message: 'Goals (to be implemented)' });
});

router.get('/development-plan/:employeeId', async (req, res) => {
    res.json({ message: 'Development Plan (to be implemented)' });
});

module.exports = router;
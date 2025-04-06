const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');
const { processFeedback } = require('../services/feedbackService');

// Get tasks created by the manager
router.get('/tasks/:managerId', async (req, res) => {
    try {
        const tasks = await Task.find({ creatorId: req.params.managerId })
                                .populate('assignees', 'name email')
                                .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
router.post('/tasks/create', async (req, res) => {
    try {
        const { creatorId, title, description } = req.body;

        const task = new Task({
            creatorId,
            title,
            description,
            completed: false,
            assignees: []
        });

        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Assign employees to a task
router.put('/tasks/assign/:taskId', async (req, res) => {
    try {
        const { assigneeIds } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.taskId,
            { $addToSet: { assignees: { $each: assigneeIds } } },
            { new: true }
        ).populate('assignees', 'name email');

        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task assigned successfully', task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mark a task as complete
router.put('/tasks/complete/:taskId', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.taskId,
            { completed: true },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task marked as complete', task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit feedback (from manager or HR)
router.post('/feedback', async (req, res) => {
    try {
        const { taskId, from, to, formData, feedbackType } = req.body;

        const feedback = await processFeedback({ taskId, from, to, formData, feedbackType });

        res.status(201).json({
            message: 'Feedback submitted successfully with AI summary',
            feedback
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
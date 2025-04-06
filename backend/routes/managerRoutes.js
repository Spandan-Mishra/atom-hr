const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');

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

router.post('/tasks/create', async (req, res) => {
    try {
        const { creatorId, title, description, assignees } = req.body;

        const task = new Task({
            creatorId,
            title,
            description,
            completed: false,
            assignees: assignees
        });

        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

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

router.get('/feedback/:hrid', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ to: req.params.hrid })
            .populate('from', 'id')
            .populate('taskId', 'title');

        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');

// 📌 GET - View all tasks created by a manager
router.get('/tasks/:managerId', async (req, res) => {
    try {
        const tasks = await Task.find({ creatorId: req.params.managerId })
                                .populate('assignees', 'name email') // optional
                                .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ POST - Create a new task by a manager
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

// 🧑‍🏫 PUT - Assign a task to employees
router.put('/tasks/assign/:taskId', async (req, res) => {
    try {
        const { assigneeIds } = req.body; // should be an array of User _id

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

// ✅ PUT - Mark a task as complete
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

module.exports = router;

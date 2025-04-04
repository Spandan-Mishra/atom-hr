const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Feedback = require('../models/Feedback');

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
k
router.post('/feedback', async (req, res) => {
    try {
        const { taskId, from, to, formData } = req.body;
        const feedback = new Feedback({ taskId, from, to, formData });
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted', feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

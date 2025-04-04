const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    completed: { type: Boolean, default: false },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

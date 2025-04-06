const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    formData: { type: mongoose.Schema.Types.Mixed, required: true },
    aiSummary: { type: String },
}, { timestamps: true }); 

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
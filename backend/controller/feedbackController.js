const FeedbackService = require('../services/feedbackService');

const submitFeedback = async (req, res) => {
    try {
        const { taskId, from, to, formData, feedbackType } = req.body;

        // Make sure feedbackType is provided (optional: validate its value)
        if (!feedbackType) {
            return res.status(400).json({ error: 'feedbackType is required' });
        }

        const feedback = await FeedbackService.processFeedback({
            taskId,
            from,
            to,
            formData,
            feedbackType
        });

        res.status(200).json({ message: 'Feedback processed', feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { submitFeedback };
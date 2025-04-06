const { generateSummaryFromSingle } = require('../helper/geminiHelper');
const Feedback = require('../models/Feedback');

// Single feedback processing
const processFeedback = async ({ taskId, from, to, formData, feedbackType }) => {
    const aiSummary = await generateSummaryFromSingle(formData, feedbackType);

    const feedback = new Feedback({
        taskId,
        from,
        to,
        formData,
        aiSummary
    });

    return await feedback.save();
};

module.exports = { processFeedback };
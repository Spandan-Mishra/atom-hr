const { getGeminiResponse } = require('../helpers/gminiHelper');
const Feedback = require('../models/Feedback');

const callGeminiAI = async (formData,feedbackType) => {
    const prompt = `
You are an expert HR assistant. Analyze and summarize the following ${feedbackType === 'hrFeedback' ? 'HR' : 'Employee'} feedback form.

Please provide:
- A concise summary of the feedback
- Key strengths and areas of improvement
- Overall sentiment (positive/neutral/negative)

Feedback Data:
${JSON.stringify(formData, null, 2)}
  `;

    const summary = await getGeminiResponse(prompt);
    return summary;
};

const processFeedback = async ({ taskId, from, to, formData, feedbackType }) => {
    const aiSummary = await callGeminiAI(formData, feedbackType);

    // Save to DB
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

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini error:', error.message);
    return 'AI failed to generate a response. Please try again later.';
  }
};

// For single feedback only
const generateSummaryFromSingle = async (formData, feedbackType = 'employee') => {
  const prompt = `
You are an expert HR assistant. Analyze and summarize the following ${feedbackType === 'hrFeedback' ? 'HR' : 'Employee'} feedback form.

Please include:
- A concise summary of the feedback
- Key strengths and areas for improvement
- Overall sentiment (positive/neutral/negative)

Feedback:
${JSON.stringify(formData, null, 2)}
  `;
  return await getGeminiResponse(prompt);
};

module.exports = {
  generateSummaryFromSingle
};
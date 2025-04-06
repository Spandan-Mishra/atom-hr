import React, { useState } from 'react';
import { 
  Brain, 
  Star, 
  TrendingUp, 
  Award,
  MessageSquare,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackData {
  id: string;
  type: 'hr' | 'employee';
  rating: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string;
}

export default function Development() {
  const [loading, setLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([
    {
      id: '1',
      type: 'hr',
      rating: 4.5,
      summary: "Demonstrates strong technical skills and collaboration abilities. Shows initiative in problem-solving and maintains positive team relationships. Communication could be more proactive, especially in project updates.",
      strengths: [
        "Technical expertise",
        "Team collaboration",
        "Problem-solving initiative"
      ],
      improvements: [
        "Proactive communication",
        "Project status updates",
        "Documentation thoroughness"
      ],
      sentiment: 'positive',
      date: '2024-03-15'
    },
    {
      id: '2',
      type: 'employee',
      rating: 4.0,
      summary: "Feeling well-supported by the team and management. Appreciates the learning opportunities but would like more structured feedback sessions. Work-life balance is good.",
      strengths: [
        "Team support",
        "Learning environment",
        "Work-life balance"
      ],
      improvements: [
        "Structured feedback",
        "Career path clarity",
        "Skill development opportunities"
      ],
      sentiment: 'positive',
      date: '2024-03-10'
    }
  ]);

  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');

  const requestAiAnalysis = async (feedback: FeedbackData) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual Gemini API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const analysis = `Based on the feedback analysis:

1. Performance Trajectory:
   - Consistently strong technical performance
   - Positive team dynamics and collaboration
   - Growing leadership potential

2. Development Opportunities:
   - Enhanced communication strategies
   - Project management skills
   - Strategic thinking capabilities

3. Recommendations:
   - Participate in advanced technical workshops
   - Take on team lead responsibilities
   - Engage in mentorship programs

Overall, showing excellent progress with clear potential for growth into senior roles.`;
      
      setAiAnalysis(analysis);
      toast.success('AI analysis completed');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to generate AI analysis');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50';
      case 'neutral':
        return 'text-blue-600 bg-blue-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Development & Growth</h1>
        <div className="flex gap-2">
          <button className="btn-primary flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Request Feedback
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <div className="flex items-center gap-4">
                <Brain className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">Growth Score</h3>
                  <p className="text-2xl font-bold">92%</p>
                </div>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-pink-500 to-rose-600 text-white">
              <div className="flex items-center gap-4">
                <Star className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">Avg Rating</h3>
                  <p className="text-2xl font-bold">4.5</p>
                </div>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <div className="flex items-center gap-4">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">Progress</h3>
                  <p className="text-2xl font-bold">+15%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <div 
                key={feedback.id} 
                className={`card hover:shadow-md transition-shadow cursor-pointer ${
                  selectedFeedback?.id === feedback.id ? 'ring-2 ring-[#2E21DE]' : ''
                }`}
                onClick={() => {
                  setSelectedFeedback(feedback);
                  requestAiAnalysis(feedback);
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      feedback.type === 'hr' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {feedback.type === 'hr' ? <Award className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">{feedback.type === 'hr' ? 'HR Feedback' : 'Self Assessment'}</h3>
                      <p className="text-sm text-gray-500">{feedback.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getSentimentColor(feedback.sentiment)}`}>
                    {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{feedback.summary}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {feedback.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Areas for Improvement</h4>
                    <ul className="space-y-1">
                      {feedback.improvements.map((improvement, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-400" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">AI Development Insights</h2>
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin text-[#2E21DE]" />
              ) : (
                <Brain className="w-5 h-5 text-[#2E21DE]" />
              )}
            </div>

            {selectedFeedback ? (
              loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin text-[#2E21DE] mx-auto mb-4" />
                  <p className="text-gray-600">Analyzing feedback data...</p>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-gray-600">
                    {aiAnalysis}
                  </div>
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p>Select a feedback to see AI analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
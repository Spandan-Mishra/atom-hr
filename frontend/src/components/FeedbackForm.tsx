import React, { useState } from 'react';
import { Star, Send, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  text: string;
  type: 'rating' | 'text' | 'multiChoice';
  options?: string[];
}

const hrQuestions: Question[] = [
  {
    id: 1,
    text: "How effectively does the employee collaborate with team members?",
    type: "rating"
  },
  {
    id: 2,
    text: "What are the employee's key strengths in their current role?",
    type: "text"
  },
  {
    id: 3,
    text: "How well does the employee adapt to changes in priorities or direction?",
    type: "rating"
  },
  {
    id: 4,
    text: "Rate the employee's problem-solving abilities:",
    type: "rating"
  },
  {
    id: 5,
    text: "Which areas would benefit from professional development?",
    type: "multiChoice",
    options: [
      "Technical Skills",
      "Communication",
      "Leadership",
      "Time Management",
      "Project Management"
    ]
  }
];

const employeeQuestions: Question[] = [
  {
    id: 1,
    text: "How satisfied are you with your current role and responsibilities?",
    type: "rating"
  },
  {
    id: 2,
    text: "What aspects of your work environment could be improved?",
    type: "text"
  },
  {
    id: 3,
    text: "How well does your manager provide guidance and support?",
    type: "rating"
  },
  {
    id: 4,
    text: "Rate your work-life balance in your current position:",
    type: "rating"
  },
  {
    id: 5,
    text: "Which areas would you like to develop in the next 6 months?",
    type: "multiChoice",
    options: [
      "Technical Expertise",
      "Soft Skills",
      "Leadership",
      "Domain Knowledge",
      "Cross-functional Skills"
    ]
  }
];

interface FeedbackFormProps {
  type: 'hr' | 'employee';
  onSubmit: (data: unknown) => void;
}

export default function FeedbackForm({ type, onSubmit }: FeedbackFormProps) {
  const questions = type === 'hr' ? hrQuestions : employeeQuestions;
  const [answers, setAnswers] = useState<Record<number, string[] | string | number>>({});
  const [overallRating, setOverallRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleAnswerChange = (questionId: number, value: string | number | string[]) => {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0 || !overallRating) {
      toast.error('Please answer all questions and provide an overall rating');
      return;
    }

    onSubmit({
      answers,
      overallRating,
      type,
      timestamp: new Date().toISOString()
    });

    toast.success('Feedback submitted successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="card">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {question.text}
                </h3>
                
                {question.type === 'rating' && (
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleAnswerChange(question.id, rating)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            rating <= (answers[question.id] as number || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  <textarea
                    value={(answers[question.id] as string) || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder="Enter your response..."
                  />
                )}

                {question.type === 'multiChoice' && (
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            (Array.isArray(answers[question.id]) ? answers[question.id] as string[] : []).includes(option)
                          }
                          onChange={(e) => {
                            const currentAnswers = Array.isArray(answers[question.id]) ? answers[question.id] : [];
                            const newAnswers = e.target.checked
                              ? [...(currentAnswers as string[]), option]
                              : (currentAnswers as string[]).filter((a: string) => a !== option);
                            handleAnswerChange(question.id, newAnswers);
                          }}
                          className="rounded text-[#2E21DE] focus:ring-[#2E21DE]"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                title="Click for more information"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Overall Rating
          </h3>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onMouseEnter={() => setHoveredStar(rating)}
                onMouseLeave={() => setHoveredStar(null)}
                onClick={() => setOverallRating(rating)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    rating <= (hoveredStar || overallRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
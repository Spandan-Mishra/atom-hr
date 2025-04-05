import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Star,
  Calendar,
  X
} from 'lucide-react';
import FeedbackForm from '../components/FeedbackForm';
import axios from 'axios';

export default function Feedback() {
  const role = localStorage.getItem('role') as 'hr' | 'em' | null;
  const userId = localStorage.getItem('userId');
  const [filter, setFilter] = useState('received');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  interface Feedback {
    _id: string;
    from?: { name?: string; avatar?: string };
    to?: { name?: string; avatar?: string };
    taskId?: { title?: string };
    formData: {
      overallRating: number;
      answers: Record<string, string>;
    };
    createdAt: string;
  }

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, [filter]);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      let endpoint;
      
      if (filter === 'received') {
        // Get feedbacks where the current user is the recipient
        endpoint = role === 'hr' 
          ? `/managers/feedback/${userId}`
          : `/employees/feedback/${userId}`;
      } else {
        // For 'all' or 'given', we'll need to adapt since your routes don't directly support this
        // You might need to add these routes on the backend
        endpoint = role === 'hr' 
          ? `/managers/feedback`
          : `/employees/feedback`;
      }
      
      const response = await axios.get(endpoint);
      if(Array.isArray(response.data)) {
        setFeedbacks(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (data: unknown) => {
    try {
      const endpoint = role === 'hr' ? '/managers/feedback' : '/employees/feedback';
      await axios.post(endpoint, data);
      setShowFeedbackForm(false);
      fetchFeedbacks();
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };
  

  const filteredFeedbacks = feedbacks
  //   .filter(feedback => {
  //   if (!searchQuery) return true;
    
  //   const query = searchQuery.toLowerCase();
  //   return (
  //     (feedback.from?.name?.toLowerCase().includes(query) || '') ||
  //     (feedback.to?.name?.toLowerCase().includes(query) || '') ||
  //     (feedback.taskId?.title?.toLowerCase().includes(query) || '')
  //   );
  // });

  return (
    <div className="space-y-6">
      {showFeedbackForm ? (
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Give Feedback</h1>
            <button
              onClick={() => setShowFeedbackForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <FeedbackForm
            type={role ?? 'hr'}
            onSubmit={handleFeedbackSubmit}
            userId={userId ?? ''}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Feedback</h1>
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Give Feedback
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                className="input-field pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg ${
                  filter === 'all'
                    ? 'bg-[#2E21DE] text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  filter === 'given'
                    ? 'bg-[#2E21DE] text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
                onClick={() => setFilter('given')}
              >
                Given
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  filter === 'received'
                    ? 'bg-[#2E21DE] text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
                onClick={() => setFilter('received')}
              >
                Received
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2E21DE]"></div>
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No feedback found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFeedbacks.map((feedback) => (
                <div key={feedback._id} className="card hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={feedback.from?.avatar || '/default-avatar.png'}
                        alt={feedback.from?.name || 'User'}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-gray-600">→</span>
                      <img
                        src={feedback.to?.avatar || '/default-avatar.png'}
                        alt={feedback.to?.name || 'User'}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{feedback.from?.name || 'User'}</span>
                        {' → '}
                        <span className="font-medium text-gray-900">{feedback.to?.name || 'User'}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Task: {feedback.taskId?.title || 'Unknown Task'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < feedback.formData.overallRating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mb-4">
                    {Object.entries(feedback.formData.answers).slice(0, 2).map(([questionId, answer]) => {
                      const question = (role === 'hr' ? hrQuestions : employeeQuestions)
                        .find(q => q.id === parseInt(questionId));
                      
                      return question ? (
                        <div key={questionId} className="mb-2">
                          <p className="text-sm text-gray-600 font-medium">{question.text}</p>
                          <p className="text-gray-700">{answer as string}</p>
                        </div>
                      ) : null;
                    })}
                    
                    {Object.keys(feedback.formData.answers).length > 2 && (
                      <button className="text-sm text-[#2E21DE]">
                        Show more...
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// These are needed for rendering feedback content
const hrQuestions = [
  {
    id: 1,
    text: "Can you describe an instance where the HR team effectively addressed a concern or request you had?",
    type: "text"
  },
  {
    id: 2,
    text: "What was the outcome?",
    type: "text"
  },
  {
    id: 3,
    text: "Are there specific areas where you believe HR could improve in providing support to employees?",
    type: "text"
  },
  {
    id: 4,
    text: "How clear and accessible are the communications from HR regarding company policies and updates?",
    type: "text"
  },
  {
    id: 5,
    text: "What suggestions do you have for HR to enhance clarity and transparency in their communications?",
    type: "text"
  },
  {
    id: 6,
    text: "Has HR facilitated or informed you about professional development opportunities that align with your career goals?",
    type: "text"
  },
  {
    id: 7,
    text: "What additional resources or support would you like HR to offer for your professional growth?",
    type: "text"
  },
  {
    id: 8,
    text: "Do you feel that HR provides adequate tools and platforms for receiving continuous feedback?",
    type: "text"
  },
  {
    id: 9,
    text: "What improvements would you suggest for HR to enhance the performance management process?",
    type: "text"
  }
];

const employeeQuestions = [
  {
    id: 10,
    text: "How would you evaluate the employee's overall performance and contributions during the review period?",
    type: "text"
  },
  {
    id: 11,
    text: "Can you highlight a project or task where the employee exceeded expectations or delivered outstanding results?",
    type: "text"
  },
  {
    id: 12,
    text: "What progress has the employee made in developing their skills or competencies since the last review?",
    type: "text"
  },
  {
    id: 13,
    text: "Are there specific areas where the employee shows strong potential for continued growth?",
    type: "text"
  },
  {
    id: 14,
    text: "How effectively does the employee adapt to changes or evolving priorities in the workplace?",
    type: "text"
  },
  {
    id: 15,
    text: "Can you provide an example of how the employee approached and resolved a challenging problem?",
    type: "text"
  },
  {
    id: 16,
    text: "How does the employee contribute to team collaboration and a positive work environment?",
    type: "text"
  },
  {
    id: 17,
    text: "Has the employee demonstrated initiative or leadership qualities, even informally? Please provide an example if applicable.",
    type: "text"
  }
];
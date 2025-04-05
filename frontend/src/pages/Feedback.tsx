
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Star,
  ThumbsUp,
  Calendar,
  X
} from 'lucide-react';
import FeedbackForm from '../components/FeedbackForm';

export default function Feedback() {
  const [filter, setFilter] = useState('all');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const feedbacks = [
    {
      id: 1,
      from: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      to: {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      task: 'Frontend Development',
      rating: 5,
      content: 'Excellent work on the UI components. The attention to detail and clean code structure made the review process smooth. Keep up the great work!',
      date: '2024-03-15',
      helpful: 12
    },
    {
      id: 2,
      from: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      to: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      task: 'API Integration',
      rating: 4,
      content: 'Good job implementing the API endpoints. The documentation could be more detailed, but overall the implementation is solid.',
      date: '2024-03-14',
      helpful: 8
    },
    {
      id: 3,
      from: {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      to: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      task: 'Database Optimization',
      rating: 5,
      content: 'Outstanding work on optimizing the database queries. The performance improvements are significant and well-documented.',
      date: '2024-03-13',
      helpful: 15
    }
  ];

  const handleFeedbackSubmit = (data: unknown) => {
    console.log('Feedback submitted:', data);
    setShowFeedbackForm(false);
  };

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
            type="hr"
            onSubmit={handleFeedbackSubmit}
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

          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={feedback.from.avatar}
                      alt={feedback.from.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-gray-600">→</span>
                    <img
                      src={feedback.to.avatar}
                      alt={feedback.to.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">{feedback.from.name}</span>
                      {' → '}
                      <span className="font-medium text-gray-900">{feedback.to.name}</span>
                    </p>
                    <p className="text-sm text-gray-500">{feedback.task}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < feedback.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-4">{feedback.content}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {feedback.date}
                    </div>
                    <button className="flex items-center gap-1 hover:text-gray-900">
                      <ThumbsUp className="w-4 h-4" />
                      {feedback.helpful} found helpful
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
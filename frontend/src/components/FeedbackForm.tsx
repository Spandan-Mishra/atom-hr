import React, { useState, useEffect } from 'react';
import { Star, Send, HelpCircle, Search, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

interface Question {
  id: number;
  text: string;
  type: 'rating' | 'text' | 'multiChoice';
  options?: string[];
}

const hrQuestions: Question[] = [
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

const employeeQuestions: Question[] = [
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

interface User {
  _id: string;
  name: string;
  avatar?: string;
  role?: string;
}

interface Task {
  _id: string;
  title: string;
  description?: string;
  status?: string;
}

interface FeedbackFormProps {
  type: 'HR' | 'Employee';
  onSubmit: (data: unknown) => void;
  userId: string;
}

export default function FeedbackForm({ type, onSubmit, userId }: FeedbackFormProps) {
  const questions = type === 'HR' ? hrQuestions : employeeQuestions;
  const [answers, setAnswers] = useState<Record<number, string[] | string | number>>({});
  const [overallRating, setOverallRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  
  // New state for task and employee selection
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Fetch tasks and employees when component mounts
  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      // Use the appropriate endpoint based on user role
      const endpoint = type === 'HR' ? '/managers/tasks' : '/employees/tasks';
      const response = await axios.get(endpoint);
      if(Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error('Invalid response format for tasks:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
    }
  };

  const fetchEmployees = async () => {
    try {
      // Use the appropriate endpoint based on user role
      const endpoint = type === 'HR' ? '/managers/employees' : '/employees';
      const response = await axios.get(endpoint);
      // Filter out current user from the list
      const filteredEmployees = response.data
      // .filter(
      //   (employee: User) => employee._id !== userId
      // );
      if(Array.isArray(response.data)) {
        setEmployees(filteredEmployees);
      } else {
        console.error('Invalid response format for employees:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      toast.error('Failed to load employees');
    }
  };

  const handleAnswerChange = (questionId: number, value: string | number | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    // Validate form fields
    if (!selectedTask) {
      toast.error('Please select a task');
      return;
    }

    if (!selectedEmployee) {
      toast.error('Please select an employee');
      return;
    }

    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0 || (!overallRating)) {
      toast.error('Please answer all questions and provide an overall rating');
      return;
    }

    // Submit the feedback
    onSubmit({
      taskId: selectedTask,
      from: userId,
      to: selectedEmployee,
      formData: {
        answers,
        overallRating: overallRating,
        type,
        timestamp: new Date().toISOString()
      }
    });
  };

  const filteredEmployees = employees.filter(employee => {
    if (!searchQuery) return true;
    return employee.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Task Selection */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Select Task
          </h3>
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="input-field"
            required
          >
            <option value="">-- Select a task --</option>
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>

        {/* Employee Selection */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Select Employee
          </h3>
          
          <div className="relative">
            {isSearching ? (
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="input-field pl-10 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setIsSearching(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div 
                className="input-field flex justify-between items-center cursor-pointer"
                onClick={() => setIsSearching(true)}
              >
                <span className={selectedEmployee ? "text-gray-900" : "text-gray-400"}>
                  {selectedEmployee 
                    ? employees.find(emp => emp._id === selectedEmployee)?.name || "Select employee" 
                    : "Select employee"}
                </span>
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            )}

            {isSearching && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredEmployees.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No employees found
                  </div>
                ) : (
                  filteredEmployees.map((employee) => (
                    <div
                      key={employee._id}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        setSelectedEmployee(employee._id);
                        setIsSearching(false);
                        setSearchQuery('');
                      }}
                    >
                      <img 
                        src={employee.avatar || '/default-avatar.png'} 
                        alt={employee.name} 
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{employee.name}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Feedback Questions */}
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
                    required
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

        {/* Overall Rating */}
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

        {/* Submit Button */}
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
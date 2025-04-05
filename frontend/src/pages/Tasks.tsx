import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import TaskForm from '../components/TaskForm';

export default function Tasks() {
  const [filter, setFilter] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isManager = true;
  const currentUserId = '1';

  const tasks = [
    {
      id: '1',
      title: 'Q1 Performance Review',
      description: 'Complete performance evaluations for team members',
      assignees: [
        { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
        { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }
      ],
      deadline: '2024-03-25',
      status: 'in-progress',
      progress: 65,
      createdBy: '1'
    },
    {
      id: '2',
      title: 'Project Alpha Development',
      description: 'Frontend development for new features',
      assignees: [
        { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
        { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5' }
      ],
      deadline: '2024-03-22',
      status: 'pending',
      progress: 0,
      createdBy: '1'
    },
    {
      id: '3',
      title: 'Documentation Update',
      description: 'Update technical documentation for v2.0',
      assignees: [
        { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
        { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5' }
      ],
      deadline: '2024-03-20',
      status: 'completed',
      progress: 100,
      createdBy: '2'
    },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (isManager) {
      if (filter === 'created') return task.createdBy === currentUserId;
      return true;
    } else {
      return task.assignees.some(assignee => assignee.id === currentUserId);
    }
  });

  const handleCreateTask = (task: unknown) => {
    console.log('New task:', task);
    setShowTaskForm(false);
  };

  return (
    <div className="space-y-6">
      {showTaskForm ? (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onSubmit={handleCreateTask}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Tasks</h1>
            {isManager && (
              <button
                onClick={() => setShowTaskForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Task
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  filter === 'all'
                    ? 'bg-[#2E21DE] text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
                onClick={() => setFilter('all')}
              >
                <Filter className="w-4 h-4" />
                All Tasks
              </button>
              {isManager ? (
                <button
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    filter === 'created'
                      ? 'bg-[#2E21DE] text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                  onClick={() => setFilter('created')}
                >
                  <Users className="w-4 h-4" />
                  Created by Me
                </button>
              ) : (
                <button
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    filter === 'assigned'
                      ? 'bg-[#2E21DE] text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                  onClick={() => setFilter('assigned')}
                >
                  <Users className="w-4 h-4" />
                  Assigned to Me
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="card hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {task.assignees.map((assignee) => (
                        <img
                          key={assignee.id}
                          src={assignee.avatar}
                          alt={assignee.name}
                          className="w-8 h-8 rounded-full border-2 border-white"
                          title={assignee.name}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {task.assignees.length} assignee{task.assignees.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {task.deadline}</span>
                  </div>
                  {task.status === 'completed' ? (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Clock className="w-4 h-4" />
                      <span>{task.progress}% Complete</span>
                    </div>
                  )}
                </div>

                {task.status !== 'completed' && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#2E21DE] h-2 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
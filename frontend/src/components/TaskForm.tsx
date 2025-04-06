import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { toast } from 'sonner';

interface Employee {
  id: string;
  name: string;
  avatar: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  assignees: Employee[];
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  createdBy: string;
}

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (task: Task) => void;
}

export default function TaskForm({ onClose, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignees, setAssignees] = useState<string[]>([]);

  const employees = [
    { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
    { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !deadline || assignees.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title,
      description,
      deadline,
      assignees: assignees.map(id => 
        employees.find(emp => emp.id === id)!
      ),
      status: 'pending',
      progress: 0,
      createdBy: '1'
    };

    onSubmit(task);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Create New Task</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field min-h-[100px]"
            placeholder="Enter task description"
          />
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
            Deadline
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="input-field pl-10"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assign Team Members
          </label>
          <div className="space-y-2">
            {employees.map((employee) => (
              <label
                key={employee.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={assignees.includes(employee.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAssignees([...assignees, employee.id]);
                    } else {
                      setAssignees(assignees.filter(id => id !== employee.id));
                    }
                  }}
                  className="rounded text-[#2E21DE] focus:ring-[#2E21DE]"
                />
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{employee.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: { name: string; description: string; submissionDate: string; assignees: unknown[] }) => void;
  onClose: () => void;
}

function TaskForm({ onSubmit, onClose }: TaskFormProps) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [searchEmployee, setSearchEmployee] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface Employee {
    id: number;
    name: string;
    role: string;
    avatar: string;
  }

  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  const employees = [
    {
      id: 1,
      name: 'Sankalp Panda',
      role: 'Senior Product Designer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'Sonal Priyam',
      role: 'AI Engineer',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  const handleAddEmployee = (employee: Employee) => {
    if (!selectedEmployees.find((e) => e.id === employee.id)) {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const handleRemoveEmployee = (employeeId: number) => {
    setSelectedEmployees(selectedEmployees.filter((e) => e.id !== employeeId));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const taskData = {
      creatorId: userId,
      title: taskName,
      description: taskDescription,
      assignees: selectedEmployees.map((employee) => employee.id),
    };

    try {
      const response = await axios.post('http://localhost:3000/managers/tasks/create', taskData);
      onSubmit(response.data.task);
      onClose();
    } catch (err) {
      console.error('Failed to create task:', err);
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fd]">
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-xl font-medium mb-6">Create New Task</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-[#4318FF] mb-2">Task Name</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Enter Task Name"
                  className="w-full p-3 border border-[#4318FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                />
              </div>

              <div>
                <label className="block text-sm text-[#4318FF] mb-2">Task Description</label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Enter Task Description"
                  rows={4}
                  className="w-full p-3 border border-[#4318FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                />
              </div>

              <div>
                <label className="block text-sm text-[#4318FF] mb-2">Submission Date</label>
                <input
                  type="date"
                  value={submissionDate}
                  onChange={(e) => setSubmissionDate(e.target.value)}
                  className="w-full p-3 border border-[#4318FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Add Employees</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={searchEmployee}
                      onChange={(e) => setSearchEmployee(e.target.value)}
                      placeholder="Search"
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {employees
                    .filter((employee) =>
                      employee.name.toLowerCase().includes(searchEmployee.toLowerCase())
                    )
                    .map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center justify-between border-l-4 border-[#4318FF] bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <h4 className="font-medium">{employee.name}</h4>
                            <p className="text-sm text-gray-600">{employee.role}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddEmployee(employee)}
                          className="px-4 py-2 border border-[#4318FF] text-[#4318FF] rounded-lg hover:bg-[#4318FF] hover:text-white transition-colors"
                        >
                          Add +
                        </button>
                      </div>
                    ))}
                </div>

                <div className="mt-4">
                  <h4 className="text-lg font-medium mb-2">Selected Employees</h4>
                  <div className="space-y-2">
                    {selectedEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <img src={employee.avatar} alt={employee.name} className="w-8 h-8 rounded-full" />
                          <span>{employee.name}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveEmployee(employee.id)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-[#2B3674] text-white rounded-lg hover:bg-[#1f2857] transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TaskForm;
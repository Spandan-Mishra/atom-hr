import React, { useState } from 'react';
import { Search } from 'lucide-react';

function TaskForm() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [searchEmployee, setSearchEmployee] = useState('');

  const employees = [
    {
      id: 1,
      name: 'Sankalp panda',
      role: 'Senior product designer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'Sankalp panda',
      role: 'Senior product designer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fd]">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-xl font-medium mb-6">Create new task</h2>

            <div className="space-y-6">
              {/* Task Name */}
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

              {/* Task Description */}
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

              {/* Submission Date */}
              <div>
                <label className="block text-sm text-[#4318FF] mb-2">Submission date</label>
                <input
                  type="text"
                  value={submissionDate}
                  onChange={(e) => setSubmissionDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="w-full p-3 border border-[#4318FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                />
              </div>

              {/* Add Employees */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Add employees</h3>
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
                  {employees.map((employee) => (
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
                      <button className="px-4 py-2 border border-[#4318FF] text-[#4318FF] rounded-lg hover:bg-[#4318FF] hover:text-white transition-colors">
                        Add +
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Button */}
              <div className="flex justify-end">
                <button className="px-8 py-3 bg-[#2B3674] text-white rounded-lg hover:bg-[#1f2857] transition-colors">
                  Create
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
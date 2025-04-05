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
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

    const handleAddEmployee = (taskId: string) => {
        console.log(`Adding employee to task: ${taskId}`);
        // Implement your logic for adding employees here
    };

    const handleViewMore = (taskId: string) => {
        console.log(`Viewing more details for task: ${taskId}`);
        // Implement your logic for viewing more details here
    };

    const handleReview = (taskId: string) => {
        console.log(`Reviewing task: ${taskId}`);
        // Implement your logic for reviewing the task here
    };

    return (
        <div className="space-y-6">
            {showTaskForm ? (
                <TaskForm onClose={() => setShowTaskForm(false)} onSubmit={handleCreateTask} />
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

                    {/* 🔥 Grid layout for task cards (2 per row on md+) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredTasks.map((task) => (
                            <div key={task.id} className="card hover:shadow-md transition-shadow p-4 bg-white rounded-lg border">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">{task.title}</h3>
                                        <p className="text-gray-600 mt-1">{task.description}</p>
                                    </div>
                                    {isManager && (
                                        <button
                                            onClick={() => handleAddEmployee(task.id)}
                                            className="bg-gray-200 text-gray-700 rounded-md px-2 py-1 text-sm hover:bg-gray-300 transition-colors"
                                        >
                                            Add employees
                                        </button>
                                    )}
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
                                            {task.assignees.length > 3 && (
                                                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs border-2 border-white">
                                                    +{task.assignees.length - 3}
                                                </div>
                                            )}
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
                                    <div className="mb-4">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-[#2E21DE] h-2 rounded-full transition-all"
                                                style={{ width: `${task.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => handleViewMore(task.id)}
                                        className="text-[#2E21DE] hover:underline text-sm"
                                    >
                                        View More
                                    </button>
                                    <button
                                        onClick={() => handleReview(task.id)}
                                        className="text-[#2E21DE] hover:underline text-sm"
                                    >
                                        Review
                                    </button>
                                </div>
                            </div>
                        ))}
                        {isManager && (
                            <div className="card bg-white rounded-lg border flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => setShowTaskForm(true)}>
                                <Plus className="w-10 h-10" />
                                <div className="text-lg mt-2">Create new task</div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
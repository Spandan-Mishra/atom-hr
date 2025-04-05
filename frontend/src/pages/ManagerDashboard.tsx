import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Week 1', tasksCompleted: 4 },
  { name: 'Week 2', tasksCompleted: 7 },
  { name: 'Week 3', tasksCompleted: 6 },
  { name: 'Week 4', tasksCompleted: 9 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Total Tasks</h2>
          <p className="text-2xl font-bold text-[#2E21DE]">24</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Feedbacks Given</h2>
          <p className="text-2xl font-bold text-[#2E21DE]">18</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Team Members</h2>
          <p className="text-2xl font-bold text-[#2E21DE]">5</p>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Completion Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tasksCompleted" stroke="#2E21DE" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default Dashboard;
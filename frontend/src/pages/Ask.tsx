import React from 'react';
import { Bot } from 'lucide-react';
import Chatbot from '../components/Chatbot';

export default function Ask() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-[#2E21DE]" />
          <h1 className="text-2xl font-bold">AI HR Assistant</h1>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Chat Section */}
        <div className="col-span-8">
          <div className="bg-white rounded-3xl p-6 h-[calc(100vh-12rem)]">
            <Chatbot embedded />
          </div>
        </div>

        {/* Info Section */}
        <div className="col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6">
            <h2 className="text-lg font-semibold mb-4">About AI Assistant</h2>
            <p className="text-gray-600 mb-4">
              Your AI HR assistant is here to help with performance reviews, career development, 
              and workplace guidance. Ask questions about:
            </p>
            <ul className="space-y-2">
              {[
                'Performance feedback and metrics',
                'Career development opportunities',
                'Skill improvement suggestions',
                'Team collaboration tips',
                'Work-life balance advice'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-[#2E21DE] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700">
                  Be specific with your questions to get more detailed responses
                </p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700">
                  You can ask follow-up questions for clarification
                </p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700">
                  The AI learns from your interactions to provide better assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
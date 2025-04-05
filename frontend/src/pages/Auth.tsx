import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'manager' | 'employee'>('employee');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white px-8 pb-8 rounded-xl shadow-lg">
        <div className="text-center flex flex-col items-center">
          <img src='/Frame 9600.svg' alt='logo' className='w-32 h-32' />
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
        </div>

        <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
          <button
            className={`flex-1 py-2 rounded-md transition-colors ${
              role === 'employee'
                ? 'bg-white text-[#2E21DE] shadow'
                : 'text-gray-600'
            }`}
            onClick={() => setRole('employee')}
          >
            Employee
          </button>
          <button
            className={`flex-1 py-2 rounded-md transition-colors ${
              role === 'manager'
                ? 'bg-white text-[#2E21DE] shadow'
                : 'text-gray-600'
            }`}
            onClick={() => setRole('manager')}
          >
            Manager
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && <><div>
                          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                              Company Name
                          </label>
                          <input
                              id="companyName"
                              name="companyName"
                              type="text"
                              required
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E21DE] focus:border-[#2E21DE]" />
                      </div><div className='grid grid-cols-2 gap-4'>
                              <div>
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                      Name
                                  </label>
                                  <input
                                      id="name"
                                      name="name"
                                      type="text"
                                      required
                                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E21DE] focus:border-[#2E21DE]" />
                              </div>
                              <div>
                                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                      Gender
                                  </label>
                                  <select
                                      id="gender"
                                      name="gender"
                                      required
                                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E21DE] focus:border-[#2E21DE]"
                                  >
                                      <option value="">Select Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Others">Others</option>
                                  </select>
                              </div>
                          </div></>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E21DE] focus:border-[#2E21DE]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E21DE] focus:border-[#2E21DE]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#2E21DE] hover:bg-[#2E21DE]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E21DE]"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#2E21DE] hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
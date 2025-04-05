import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [formData, setFormData] = useState({
    companyName: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:3000/auth/login", formData);
      localStorage.setItem("phone", formData.phone);
      const response = await axios.get(`http://localhost:3000/users/${formData.phone}`);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      alert(res.data.message || "Success");
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value }));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white px-8 pb-8 rounded-xl shadow-lg">
        <div className="text-center flex flex-col items-center">
          <img src='/Frame 9600.svg' alt='logo' className='w-32 h-32' />
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back!
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                value={formData.companyName}
                onChange={handleChange}
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
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E21DE] focus:border-[#2E21DE]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#2E21DE] hover:bg-[#2E21DE]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E21DE]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { 
  ChevronDown,
  Settings,
  ArrowUpRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const data = [
  { month: 'Jan', value1: 40, value2: 60, value3: 20 },
  { month: 'Feb', value1: 80, value2: 40, value3: 50 },
  { month: 'Mar', value1: 60, value2: 80, value3: 30 },
  { month: 'Apr', value1: 90, value2: 20, value3: 70 },
  { month: 'May', value1: 40, value2: 60, value3: 40 },
  { month: 'Jun', value1: 70, value2: 40, value3: 60 },
  { month: 'Jul', value1: 50, value2: 70, value3: 50 },
  { month: 'Aug', value1: 80, value2: 30, value3: 80 },
  { month: 'Sep', value1: 40, value2: 60, value3: 40 },
  { month: 'Oct', value1: 70, value2: 50, value3: 60 },
  { month: 'Nov', value1: 50, value2: 80, value3: 30 },
  { month: 'Dec', value1: 90, value2: 40, value3: 70 },
];

const todos = [
  {
    id: 1,
    title: "Fill out and submit your self-assessment form before the deadline.",
    date: "Today, 5th April 2025",
    status: "pending",
    priority: "high"
  },
  {
    id: 2,
    title: "Fill out and submit your self-assessment form before the deadline.",
    date: "Today, 5th April 2025",
    status: "pending",
    priority: "medium"
  }
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const currentUser = {
    name: "Sankalp",
    role: "General manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    experience: "4+ Experience"
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const firstDayOfWeek = firstDay.getDay();
    
    // Add empty days for padding
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ date: "", isEmpty: true });
    }
    
    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: i,
        isEmpty: false,
        isToday: new Date().toDateString() === new Date(year, month, i).toDateString(),
        isSelected: selectedDate?.toDateString() === new Date(year, month, i).toDateString()
      });
    }
    
    return days;
  };

  const handleDateClick = (day: number, event: React.MouseEvent) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDropdownPosition({ x: rect.left, y: rect.bottom });
    setShowDateDropdown(true);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setShowMonthPicker(false);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setShowMonthPicker(false);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex));
    setShowMonthPicker(false);
  };

  const handleAddTask = () => {
    console.log(`Adding task for ${selectedDate?.toLocaleDateString()}`);
    setShowDateDropdown(false);
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowDateDropdown(false);
      setShowMonthPicker(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Good Evening, {currentUser.name} 👋</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-white shadow">
            <Bell className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <span>Manage Dashboard</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="relative z-10 bg-cover bg-center rounded-2xl overflow-hidden col-span-4 bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white" style={{ backgroundImage: `url('/sonal.jpg')`, height: '500px' }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div> {/* Dark overlay for text readability */}

          <div className="relative z-10 p-6 text-white">
            <div className="mb-4">
              <span className="px-4 py-2 bg-indigo-700 rounded-full text-sm">
                {currentUser.experience}
              </span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">S. Priyam</h2>
            <p className="text-gray-300">{currentUser.role}</p>
            <button className="absolute bottom-6 right-6">
              <ArrowUpRight className="w-6 h-6" />
            </button>
          </div>
        </div>


        {/* Strategic Thinking Card */}
        <div className="col-span-4 bg-white rounded-3xl p-6">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-lg font-semibold">Atom's Strategic Thinking</h3>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-700"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border-[16px] border-gray-100">
                  <div className="w-full h-full rounded-full border-[16px] border-indigo-700 border-t-transparent border-r-transparent rotate-[220deg]"></div>
                </div>
                <div className="absolute">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-2xl">😊</span>
                  </div>
                </div>
              </div>
            </div>
            <h4 className="text-lg font-semibold mt-4">Need Improvement</h4>
            <p className="text-gray-600 text-center mt-2">
              You excel at getting tasks done. To grow...
              <button className="text-indigo-700 ml-1">see more</button>
            </p>
            <button className="w-full py-3 bg-gray-50 hover:bg-gray-200 duration-100 rounded-xl mt-4 cursor-pointer" onClick={() => navigate('/development')}>
              View Development Plans
            </button>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="col-span-4 bg-white rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <button 
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMonthPicker(!showMonthPicker);
                }}
              >
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                <ChevronDown className="w-5 h-5" />
              </button>
              
              {/* Month Picker Dropdown */}
              {showMonthPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border p-2 z-50 grid grid-cols-3 gap-2 w-64">
                  {MONTHS.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => handleMonthSelect(index)}
                      className={`p-2 text-sm rounded-lg hover:bg-indigo-50 ${
                        currentDate.getMonth() === index ? 'bg-indigo-100 text-indigo-700' : ''
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevMonth}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-sm text-gray-500">{day}</div>
            ))}
            {getDaysInMonth(currentDate).map((day, i) => (
              <div
                key={i}
                onClick={(e) => !day.isEmpty && handleDateClick(day.date as number, e)}
                className={`py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                  day.isEmpty
                    ? 'text-gray-300 cursor-default'
                    : day.isToday
                    ? 'bg-indigo-700 text-white'
                    : day.isSelected
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                {day.date}
              </div>
            ))}
          </div>

          {/* Date Action Dropdown */}
          {showDateDropdown && selectedDate && (
            <div 
              className="fixed bg-white rounded-lg shadow-lg border p-2 z-50"
              style={{ 
                top: dropdownPosition.y + 'px', 
                left: dropdownPosition.x + 'px' 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleAddTask}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg w-full text-left"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          )}
        </div>

        {/* To-Do List */}
        <div className="col-span-8 bg-white rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Things To-Do
              <span className="px-2 py-1 bg-black text-white rounded-lg text-sm">5</span>
            </h3>
          </div>
          <div className="space-y-6">
            {todos.map(todo => (
              <div key={todo.id} className="border-l-4 border-indigo-700 pl-4">
                <h4 className="font-medium mb-1">{todo.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{todo.date}</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    todo.priority === 'high'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {todo.priority === 'high' ? 'High priority' : 'Medium'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Chart */}
        <div className="col-span-4 bg-white rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-6">Employee Progress</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value1" stroke="#4F46E5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="value2" stroke="#EC4899" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="value3" stroke="#06B6D4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
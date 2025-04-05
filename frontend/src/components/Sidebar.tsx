import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  MessageSquare,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center justify-center">
        <img src="/Frame 9600.svg" alt="logo" className="w-24 h-24" />
      </div>
      
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-[#2E21DE] text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-[#2E21DE] text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <CheckSquare className="w-5 h-5" />
          Tasks
        </NavLink>
        
        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-[#2E21DE] text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <MessageSquare className="w-5 h-5" />
          Feedback
        </NavLink>
      </nav>
      
      <div className="absolute bottom-4 w-56">
        <button className="flex items-center gap-2 p-2 w-full text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
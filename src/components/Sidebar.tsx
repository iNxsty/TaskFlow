import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Calendar, 
  Clock, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', name: 'DASHBOARD', icon: LayoutDashboard, active: true },
  { id: 'projects', name: 'PROJECTS', icon: FolderOpen },
  { id: 'mytask', name: 'MY TASK', icon: CheckSquare },
  { id: 'calendar', name: 'CALENDAR', icon: Calendar },
  { id: 'time', name: 'TIME MANAGE', icon: Clock },
  { id: 'reports', name: 'REPORTS', icon: BarChart3 },
  { id: 'settings', name: 'SETTINGS', icon: Settings }
];

const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  return (
    <div className="w-64 bg-gray-800 h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-white font-semibold text-lg">TaskFlow</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id)}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeView === item.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } w-full text-left`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
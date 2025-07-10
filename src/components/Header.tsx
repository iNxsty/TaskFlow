import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Search, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, notifications, clearNotifications } = useApp();

  return (
    <header className="h-16 bg-gray-700 flex items-center justify-between px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-gray-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={clearNotifications}
          className="p-2 text-gray-400 hover:text-white transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>
        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">A</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Calendar, 
  Clock 
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', name: 'Projetos', icon: FolderOpen },
  { id: 'mytask', name: 'Tarefas', icon: CheckSquare },
  { id: 'calendar', name: 'Calendário', icon: Calendar },
  { id: 'time', name: 'Tempo', icon: Clock }
];

const MobileNavigation: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2 z-30">
      <div className="flex justify-around">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] ${
              activeView === item.id
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium truncate">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
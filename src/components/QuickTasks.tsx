import React from 'react';
import { Play, MoreHorizontal, Pause } from 'lucide-react';

const quickTasks = [
  {
    id: '1',
    title: 'Create Wireframe',
    time: '25m 20s',
    status: 'active',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Slack logo design',
    time: '30m 0s',
    status: 'paused',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Dashboard design',
    time: '30m 0s',
    status: 'paused',
    priority: 'low'
  },
  {
    id: '4',
    title: 'Create Wireframe',
    time: '30m 0s',
    status: 'paused',
    priority: 'high'
  }
];

const QuickTasks: React.FC = () => {
  const [timers, setTimers] = React.useState<{[key: string]: number}>({});
  const [activeTimers, setActiveTimers] = React.useState<{[key: string]: boolean}>({});
  const [intervals, setIntervals] = React.useState<{[key: string]: NodeJS.Timeout}>({});

  const toggleTimer = (taskId: string) => {
    if (activeTimers[taskId]) {
      // Pause timer
      if (intervals[taskId]) {
        clearInterval(intervals[taskId]);
        setIntervals(prev => {
          const newIntervals = { ...prev };
          delete newIntervals[taskId];
          return newIntervals;
        });
      }
      setActiveTimers(prev => ({ ...prev, [taskId]: false }));
    } else {
      // Start timer
      const interval = setInterval(() => {
        setTimers(prev => ({ ...prev, [taskId]: (prev[taskId] || 0) + 1 }));
      }, 1000);
      setIntervals(prev => ({ ...prev, [taskId]: interval }));
      setActiveTimers(prev => ({ ...prev, [taskId]: true }));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  React.useEffect(() => {
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [intervals]);

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Google</h3>
          <button 
            onClick={() => toggleTimer('1')}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {activeTimers['1'] ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
        <div className="space-y-3">
          {quickTasks.slice(0, 1).map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${activeTimers[task.id] ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-gray-300 text-sm">{task.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium text-sm">
                  {timers[task.id] ? formatTime(timers[task.id]) : task.time}
                </span>
                <div className={`w-3 h-3 rounded-full ${activeTimers[task.id] ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Slack</h3>
          <button 
            onClick={() => toggleTimer('slack')}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {activeTimers['slack'] ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
        <div className="space-y-3">
          {quickTasks.slice(1).map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${activeTimers[task.id] ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-gray-300 text-sm">{task.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium text-sm">
                  {timers[task.id] ? formatTime(timers[task.id]) : task.time}
                </span>
                <button 
                  onClick={() => toggleTimer(task.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {activeTimers[task.id] ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickTasks;
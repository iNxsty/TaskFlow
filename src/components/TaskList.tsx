import React from 'react';
import { Circle, CheckCircle, Plus, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const { tasks, toggleTask, deleteTask, addTask } = useApp();
  const [isAddingTask, setIsAddingTask] = React.useState(false);
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [newTaskPriority, setNewTaskPriority] = React.useState<'high' | 'medium' | 'low'>('medium');

  const priorityColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400'
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        completed: false,
        priority: newTaskPriority
      });
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setIsAddingTask(false);
      setNewTaskTitle('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">
          My Tasks ({tasks.filter(t => !t.completed).length.toString().padStart(2, '0')})
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsAddingTask(true)}
            className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      {isAddingTask && (
        <div className="mb-4 p-3 bg-gray-700 rounded-lg">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter task title..."
            className="w-full bg-gray-600 text-white px-3 py-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
          <div className="flex items-center justify-between">
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as 'high' | 'medium' | 'low')}
              className="bg-gray-600 text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={handleAddTask}
                className="px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingTask(false);
                  setNewTaskTitle('');
                }}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={task.id} className="flex items-center space-x-3 group hover:bg-gray-700 p-2 rounded transition-colors">
            <span className="text-gray-400 text-sm w-6">
              {String(index + 1).padStart(2, '0')}
            </span>
            <button 
              onClick={() => toggleTask(task.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {task.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
            <div className="flex-1">
              <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                {task.title}
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-400">3</span>
                <span className="text-xs text-gray-400">G</span>
                <span className="text-xs text-gray-400">📎</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                task.completed ? 'bg-green-500' : 
                task.priority === 'high' ? 'bg-red-500' :
                task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
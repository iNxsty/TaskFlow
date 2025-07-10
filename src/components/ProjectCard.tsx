import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Star, MoreHorizontal } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { updateProject } = useApp();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedProject, setEditedProject] = React.useState(project);

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-blue-500'
  };

  const handleSave = () => {
    updateProject(project.id, editedProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProject(project);
    setIsEditing(false);
  };

  const updateProgress = () => {
    const newProgress = Math.round((editedProject.completedTasks / editedProject.totalTasks) * 100);
    setEditedProject(prev => ({ ...prev, progress: newProgress }));
  };

  React.useEffect(() => {
    updateProgress();
  }, [editedProject.completedTasks, editedProject.totalTasks]);

  return (
    <div className="bg-gray-700 rounded-xl p-6 hover:bg-gray-600 transition-colors duration-200">
      {isEditing && (
        <div className="absolute inset-0 bg-gray-800 rounded-xl p-6 z-10">
          <div className="space-y-4">
            <input
              type="text"
              value={editedProject.name}
              onChange={(e) => setEditedProject(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Project name"
            />
            <input
              type="text"
              value={editedProject.company}
              onChange={(e) => setEditedProject(prev => ({ ...prev, company: e.target.value }))}
              className="w-full bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Company"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm">Completed Tasks</label>
                <input
                  type="number"
                  value={editedProject.completedTasks}
                  onChange={(e) => setEditedProject(prev => ({ ...prev, completedTasks: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm">Total Tasks</label>
                <input
                  type="number"
                  value={editedProject.totalTasks}
                  onChange={(e) => setEditedProject(prev => ({ ...prev, totalTasks: parseInt(e.target.value) || 1 }))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="1"
                />
              </div>
            </div>
            <select
              value={editedProject.priority}
              onChange={(e) => setEditedProject(prev => ({ ...prev, priority: e.target.value as 'high' | 'medium' | 'low' }))}
              className="w-full bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">
            {project.logo}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{project.name}</h3>
            <p className="text-gray-400 text-sm">{project.company}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">SELECT PROGRESS</span>
          <span className={`px-2 py-1 rounded text-xs font-medium text-white ${priorityColors[project.priority]}`}>
            {project.priority.toUpperCase()}
          </span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-white">Task Done: {project.completedTasks} / {project.totalTasks}</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {project.platforms.map((platform, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs"
            >
              {platform}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {project.teamMembers.slice(0, 4).map((member, index) => (
              <div 
                key={index}
                className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs border-2 border-gray-700"
              >
                {member}
              </div>
            ))}
            {project.teamMembers.length > 4 && (
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs border-2 border-gray-700">
                +{project.teamMembers.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-red-400 text-sm">DUE DATE: {project.dueDate}</span>
        <span className={`px-2 py-1 rounded text-xs font-medium text-white ${statusColors[project.status]}`}>
          {project.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
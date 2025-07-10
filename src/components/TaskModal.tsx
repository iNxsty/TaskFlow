import React, { useState } from 'react';
import { X, Plus, Calendar, Clock, User, Tag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Task } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  tasks: Task[];
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, selectedDate, tasks }) => {
  const { addTask, updateTask, deleteTask, projects, users } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    projectId: '',
    assignedTo: '',
    estimatedTime: 1,
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCreateTask = () => {
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        dueDate: selectedDate,
        status: 'pending',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        projectId: '',
        assignedTo: '',
        estimatedTime: 1,
        tags: []
      });
      setIsCreating(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newTask.tags.includes(tagInput.trim())) {
      setNewTask(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewTask(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-blue-400';
      case 'overdue': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Tarefas para {formatDate(selectedDate)}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {tasks.length} tarefa{tasks.length !== 1 ? 's' : ''} encontrada{tasks.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Add Task Button */}
          <button
            onClick={() => setIsCreating(true)}
            className="w-full mb-6 p-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar nova tarefa</span>
          </button>

          {/* Create Task Form */}
          {isCreating && (
            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
              <div className="space-y-4">
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título da tarefa"
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição (opcional)"
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  rows={3}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'high' | 'medium' | 'low' }))}
                    className="bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="high">Alta Prioridade</option>
                    <option value="medium">Média Prioridade</option>
                    <option value="low">Baixa Prioridade</option>
                  </select>

                  <select
                    value={newTask.projectId}
                    onChange={(e) => setNewTask(prev => ({ ...prev, projectId: e.target.value }))}
                    className="bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Selecionar projeto</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                    className="bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Atribuir a</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 1 }))}
                    placeholder="Tempo estimado (horas)"
                    min="1"
                    className="bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Tags */}
                <div>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      placeholder="Adicionar tag"
                      className="flex-1 bg-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                    >
                      <Tag className="w-4 h-4" />
                    </button>
                  </div>
                  {newTask.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newTask.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-600 text-white text-sm rounded flex items-center space-x-1"
                        >
                          <span>{tag}</span>
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateTask}
                    className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                  >
                    Criar Tarefa
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tasks List */}
          <div className="space-y-4">
            {tasks.map(task => {
              const project = projects.find(p => p.id === task.projectId);
              const assignee = users.find(u => u.id === task.assignedTo);
              
              return (
                <div
                  key={task.id}
                  className="p-4 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                      <span className={`text-sm ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      {project && (
                        <div className="flex items-center space-x-1">
                          <span>{project.logo}</span>
                          <span>{project.name}</span>
                        </div>
                      )}
                      {assignee && (
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{assignee.name}</span>
                        </div>
                      )}
                      {task.estimatedTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{task.estimatedTime}h</span>
                        </div>
                      )}
                    </div>
                    
                    {task.tags.length > 0 && (
                      <div className="flex space-x-1">
                        {task.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {task.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-600 rounded text-xs">
                            +{task.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {tasks.length === 0 && !isCreating && (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma tarefa para este dia</p>
                <p className="text-sm">Clique em "Adicionar nova tarefa" para começar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
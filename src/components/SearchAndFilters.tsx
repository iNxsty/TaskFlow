import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Calendar, ChevronDown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { FilterOptions } from '../types';

const SearchAndFilters: React.FC = () => {
  const { searchQuery, setSearchQuery, projects, applyFilters } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    priority: [],
    projects: [],
    dateRange: { preset: 'month' }
  });
  const [customDateRange, setCustomDateRange] = useState({
    start: '',
    end: ''
  });

  const statusOptions = [
    { value: 'pending', label: 'Pendente', color: 'bg-gray-500' },
    { value: 'in-progress', label: 'Em Andamento', color: 'bg-blue-500' },
    { value: 'completed', label: 'Concluída', color: 'bg-green-500' },
    { value: 'overdue', label: 'Atrasada', color: 'bg-red-500' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'Alta', color: 'bg-red-500' },
    { value: 'medium', label: 'Média', color: 'bg-yellow-500' },
    { value: 'low', label: 'Baixa', color: 'bg-green-500' }
  ];

  const datePresets = [
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mês' },
    { value: 'custom', label: 'Personalizado' }
  ];

  useEffect(() => {
    applyFilters(filters);
  }, [filters, applyFilters]);

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      const currentValues = prev[type] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [type]: newValues };
    });
  };

  const handleDatePresetChange = (preset: string) => {
    if (preset === 'custom') {
      setFilters(prev => ({
        ...prev,
        dateRange: { preset: 'custom' as const }
      }));
    } else {
      const today = new Date();
      let start: Date, end: Date;

      switch (preset) {
        case 'today':
          start = end = today;
          break;
        case 'week':
          start = new Date(today);
          start.setDate(today.getDate() - today.getDay());
          end = new Date(start);
          end.setDate(start.getDate() + 6);
          break;
        case 'month':
          start = new Date(today.getFullYear(), today.getMonth(), 1);
          end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          break;
        default:
          start = end = today;
      }

      setFilters(prev => ({
        ...prev,
        dateRange: { preset: preset as any, start, end }
      }));
    }
  };

  const handleCustomDateChange = () => {
    if (customDateRange.start && customDateRange.end) {
      setFilters(prev => ({
        ...prev,
        dateRange: {
          preset: 'custom',
          start: new Date(customDateRange.start),
          end: new Date(customDateRange.end)
        }
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      priority: [],
      projects: [],
      dateRange: { preset: 'month' }
    });
    setCustomDateRange({ start: '', end: '' });
  };

  const getActiveFiltersCount = () => {
    return filters.status.length + filters.priority.length + filters.projects.length;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar tarefas, projetos..."
          className="w-full pl-10 pr-12 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-gray-600 transition-all duration-200"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors ${
            showFilters || getActiveFiltersCount() > 0
              ? 'text-primary-400 bg-primary-500/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Filter className="w-5 h-5" />
          {getActiveFiltersCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-800 rounded-lg p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">Filtros</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Limpar tudo
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Status</label>
              <div className="space-y-2">
                {statusOptions.map(option => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(option.value)}
                      onChange={() => handleFilterChange('status', option.value)}
                      className="w-4 h-4 text-primary-500 bg-gray-700 border-gray-600 rounded focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                      <span className="text-sm text-gray-300">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Prioridade</label>
              <div className="space-y-2">
                {priorityOptions.map(option => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.priority.includes(option.value)}
                      onChange={() => handleFilterChange('priority', option.value)}
                      className="w-4 h-4 text-primary-500 bg-gray-700 border-gray-600 rounded focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                      <span className="text-sm text-gray-300">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Projects Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Projetos</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {projects.map(project => (
                  <label key={project.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.projects.includes(project.id)}
                      onChange={() => handleFilterChange('projects', project.id)}
                      className="w-4 h-4 text-primary-500 bg-gray-700 border-gray-600 rounded focus:ring-primary-500"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{project.logo}</span>
                      <span className="text-sm text-gray-300 truncate">{project.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Período</label>
              <div className="space-y-3">
                <select
                  value={filters.dateRange.preset || 'month'}
                  onChange={(e) => handleDatePresetChange(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {datePresets.map(preset => (
                    <option key={preset.value} value={preset.value}>
                      {preset.label}
                    </option>
                  ))}
                </select>

                {filters.dateRange.preset === 'custom' && (
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={customDateRange.start}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="date"
                      value={customDateRange.end}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={handleCustomDateChange}
                      className="w-full px-3 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors text-sm"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {getActiveFiltersCount() > 0 && (
            <div className="pt-4 border-t border-gray-700">
              <div className="flex flex-wrap gap-2">
                {filters.status.map(status => {
                  const option = statusOptions.find(o => o.value === status);
                  return option ? (
                    <span
                      key={status}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      <div className={`w-2 h-2 rounded-full ${option.color}`}></div>
                      <span className="text-gray-300">{option.label}</span>
                      <button
                        onClick={() => handleFilterChange('status', status)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ) : null;
                })}
                
                {filters.priority.map(priority => {
                  const option = priorityOptions.find(o => o.value === priority);
                  return option ? (
                    <span
                      key={priority}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      <div className={`w-2 h-2 rounded-full ${option.color}`}></div>
                      <span className="text-gray-300">{option.label}</span>
                      <button
                        onClick={() => handleFilterChange('priority', priority)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ) : null;
                })}

                {filters.projects.map(projectId => {
                  const project = projects.find(p => p.id === projectId);
                  return project ? (
                    <span
                      key={projectId}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      <span>{project.logo}</span>
                      <span className="text-gray-300">{project.name}</span>
                      <button
                        onClick={() => handleFilterChange('projects', projectId)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
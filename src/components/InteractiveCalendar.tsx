import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Task } from '../types';
import TaskModal from './TaskModal';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
}

const InteractiveCalendar: React.FC = () => {
  const { tasks, selectedDate, setSelectedDate } = useApp();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const currentDate = new Date();
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 41); // 6 weeks

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayTasks = tasks.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        return (
          taskDate.getDate() === date.getDate() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getFullYear() === date.getFullYear()
        );
      });

      days.push({
        date: new Date(date),
        isCurrentMonth: date.getMonth() === month,
        isToday: 
          date.getDate() === currentDate.getDate() &&
          date.getMonth() === currentDate.getMonth() &&
          date.getFullYear() === currentDate.getFullYear(),
        tasks: dayTasks
      });
    }

    return days;
  }, [tasks, month, year]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay(day.date);
    setSelectedDate(day.date);
    if (day.tasks.length > 0 || day.isCurrentMonth) {
      setShowTaskModal(true);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTaskIndicators = (tasks: Task[]) => {
    const priorityCounts = { high: 0, medium: 0, low: 0 };
    tasks.forEach(task => {
      priorityCounts[task.priority]++;
    });

    return (
      <div className="flex space-x-1 mt-1">
        {priorityCounts.high > 0 && (
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        )}
        {priorityCounts.medium > 0 && (
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        )}
        {priorityCounts.low > 0 && (
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-white font-semibold text-xl">
            {monthNames[month]} {year}
          </h2>
          <div className="flex space-x-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'month' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'week' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Semana
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Hoje
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-gray-400 text-sm text-center py-2 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`
              min-h-[80px] p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-700
              ${day.isCurrentMonth ? 'bg-gray-750' : 'bg-gray-850'}
              ${day.isToday ? 'ring-2 ring-primary-500 bg-primary-500/10' : ''}
              ${selectedDate.getDate() === day.date.getDate() && 
                selectedDate.getMonth() === day.date.getMonth() && 
                selectedDate.getFullYear() === day.date.getFullYear() && 
                !day.isToday ? 'bg-gray-600' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                day.isCurrentMonth 
                  ? day.isToday 
                    ? 'text-primary-400 font-bold' 
                    : 'text-white' 
                  : 'text-gray-500'
              }`}>
                {day.date.getDate()}
              </span>
              {day.tasks.length > 0 && (
                <span className="text-xs text-gray-400">
                  {day.tasks.length}
                </span>
              )}
            </div>
            
            {/* Task Preview */}
            <div className="mt-1 space-y-1">
              {day.tasks.slice(0, 3).map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className={`text-xs px-2 py-1 rounded truncate ${getPriorityColor(task.priority)} text-white`}
                  title={task.title}
                >
                  {task.title}
                </div>
              ))}
              {day.tasks.length > 3 && (
                <div className="text-xs text-gray-400 px-2">
                  +{day.tasks.length - 3} mais
                </div>
              )}
            </div>

            {/* Priority Indicators */}
            {day.tasks.length > 0 && getTaskIndicators(day.tasks)}
          </div>
        ))}
      </div>

      {/* Task Modal */}
      {showTaskModal && selectedDay && (
        <TaskModal
          isOpen={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          selectedDate={selectedDay}
          tasks={tasks.filter(task => {
            if (!task.dueDate) return false;
            const taskDate = new Date(task.dueDate);
            return (
              taskDate.getDate() === selectedDay.getDate() &&
              taskDate.getMonth() === selectedDay.getMonth() &&
              taskDate.getFullYear() === selectedDay.getFullYear()
            );
          })}
        />
      )}
    </div>
  );
};

export default InteractiveCalendar;
import React from 'react';
import { useApp } from '../contexts/AppContext';

const Calendar: React.FC = () => {
  const { selectedDate, setSelectedDate } = useApp();
  const currentDate = new Date();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const handleDateClick = (day: number) => {
    if (day) {
      const newDate = new Date(year, month, day);
      setSelectedDate(newDate);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">
          {monthNames[month]} {year}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <span className="text-white text-sm">‹</span>
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <span className="text-white text-sm">›</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-gray-400 text-xs text-center py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={`text-center py-2 text-sm cursor-pointer hover:bg-gray-700 rounded transition-colors ${
              day && day === selectedDate.getDate() && isCurrentMonth
                ? 'bg-primary-500 text-white' 
              : day && day === today.getDate() && isCurrentMonth
                ? 'bg-gray-600 text-white'
                : day 
                  ? 'text-gray-300 hover:text-white' 
                  : ''
            }`}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
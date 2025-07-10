import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, Task, Message } from '../types';
import { projects as initialProjects, tasks as initialTasks, messages as initialMessages } from '../data/mockData';

interface AppContextType {
  projects: Project[];
  tasks: Task[];
  messages: Message[];
  activeView: string;
  searchQuery: string;
  selectedDate: Date;
  notifications: number;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  markMessageAsRead: (id: string) => void;
  setActiveView: (view: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDate: (date: Date) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [projects, setProjects] = useLocalStorage<Project[]>('taskflow-projects', initialProjects);
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', initialTasks);
  const [messages, setMessages] = useLocalStorage<Message[]>('taskflow-messages', initialMessages);
  const [activeView, setActiveView] = useLocalStorage<string>('taskflow-active-view', 'dashboard');
  const [searchQuery, setSearchQuery] = useLocalStorage<string>('taskflow-search', '');
  const [selectedDate, setSelectedDate] = useLocalStorage<Date>('taskflow-selected-date', new Date());
  const [notifications, setNotifications] = useLocalStorage<number>('taskflow-notifications', 2);

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addMessage = (message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString()
    };
    setMessages(prev => [newMessage, ...prev]);
    setNotifications(prev => prev + 1);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(message => 
      message.id === id ? { ...message, unread: false } : message
    ));
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

  const value: AppContextType = {
    projects,
    tasks,
    messages,
    activeView,
    searchQuery,
    selectedDate: new Date(selectedDate),
    notifications,
    updateProject,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addMessage,
    markMessageAsRead,
    setActiveView,
    setSearchQuery,
    setSelectedDate,
    clearNotifications
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
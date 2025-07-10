import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, Task, Message, User, ActivityLog, FilterOptions } from '../types';
import { projects as initialProjects, tasks as initialTasks, messages as initialMessages, users as initialUsers } from '../data/mockData';

interface AppContextType {
  projects: Project[];
  tasks: Task[];
  messages: Message[];
  users: User[];
  filteredTasks: Task[];
  activityLogs: ActivityLog[];
  activeView: string;
  searchQuery: string;
  selectedDate: Date;
  notifications: number;
  currentFilters: FilterOptions;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  markMessageAsRead: (id: string) => void;
  applyFilters: (filters: FilterOptions) => void;
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
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
  const [users] = useLocalStorage<User[]>('taskflow-users', initialUsers);
  const [activityLogs, setActivityLogs] = useLocalStorage<ActivityLog[]>('taskflow-activity-logs', []);
  const [activeView, setActiveView] = useLocalStorage<string>('taskflow-active-view', 'dashboard');
  const [searchQuery, setSearchQuery] = useLocalStorage<string>('taskflow-search', '');
  const [selectedDate, setSelectedDate] = useLocalStorage<Date>('taskflow-selected-date', new Date());
  const [notifications, setNotifications] = useLocalStorage<number>('taskflow-notifications', 2);
  const [currentFilters, setCurrentFilters] = useLocalStorage<FilterOptions>('taskflow-filters', {
    status: [],
    priority: [],
    projects: [],
    dateRange: { preset: 'month' }
  });
  const [filteredTasks, setFilteredTasks] = React.useState<Task[]>(tasks);

  // Filter tasks based on search query and filters
  React.useEffect(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (currentFilters.status.length > 0) {
      filtered = filtered.filter(task => currentFilters.status.includes(task.status));
    }

    // Apply priority filter
    if (currentFilters.priority.length > 0) {
      filtered = filtered.filter(task => currentFilters.priority.includes(task.priority));
    }

    // Apply project filter
    if (currentFilters.projects.length > 0) {
      filtered = filtered.filter(task => 
        task.projectId && currentFilters.projects.includes(task.projectId)
      );
    }

    // Apply date range filter
    if (currentFilters.dateRange.start && currentFilters.dateRange.end) {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        return taskDate >= currentFilters.dateRange.start! && taskDate <= currentFilters.dateRange.end!;
      });
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, currentFilters]);

  const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 99)]); // Keep only last 100 logs
  };
  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates, updatedAt: new Date() } : project
    ));
    addActivityLog({
      action: 'updated',
      entityType: 'project',
      entityId: id,
      userId: '1', // Current user
      details: `Projeto atualizado`
    });
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
    addActivityLog({
      action: 'created',
      entityType: 'task',
      entityId: newTask.id,
      userId: '1',
      details: `Tarefa "${newTask.title}" criada`
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
    ));
    const task = tasks.find(t => t.id === id);
    if (task) {
      addActivityLog({
        action: 'updated',
        entityType: 'task',
        entityId: id,
        userId: '1',
        details: `Tarefa "${task.title}" atualizada`
      });
    }
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(task => task.id !== id));
    if (task) {
      addActivityLog({
        action: 'deleted',
        entityType: 'task',
        entityId: id,
        userId: '1',
        details: `Tarefa "${task.title}" removida`
      });
    }
  };

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.map(task => 
      task.id === id ? { 
        ...task, 
        completed: !task.completed,
        status: !task.completed ? 'completed' : 'pending',
        updatedAt: new Date()
      } : task
    ));
    if (task) {
      addActivityLog({
        action: task.completed ? 'uncompleted' : 'completed',
        entityType: 'task',
        entityId: id,
        userId: '1',
        details: `Tarefa "${task.title}" ${task.completed ? 'desmarcada' : 'concluída'}`
      });
    }
  };

  const addMessage = (message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setMessages(prev => [newMessage, ...prev]);
    setNotifications(prev => prev + 1);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(message => 
      message.id === id ? { ...message, unread: false } : message
    ));
  };

  const applyFilters = (filters: FilterOptions) => {
    setCurrentFilters(filters);
  };
  const clearNotifications = () => {
    setNotifications(0);
  };

  const value: AppContextType = {
    projects,
    tasks,
    filteredTasks,
    messages,
    users,
    activityLogs,
    activeView,
    searchQuery,
    selectedDate: new Date(selectedDate),
    notifications,
    currentFilters,
    updateProject,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addMessage,
    markMessageAsRead,
    applyFilters,
    addActivityLog,
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
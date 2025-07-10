export interface Project {
  id: string;
  name: string;
  company: string;
  logo: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in-progress' | 'pending' | 'overdue';
  dueDate: string;
  platforms: string[];
  teamMembers: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  dueDate?: Date;
  projectId?: string;
  estimatedTime?: number;
  actualTime?: number;
  tags: string[];
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  unread: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'task' | 'project' | 'user';
  entityId: string;
  userId: string;
  timestamp: Date;
  details: string;
}

export interface FilterOptions {
  status: string[];
  priority: string[];
  projects: string[];
  dateRange: {
    start?: Date;
    end?: Date;
    preset?: 'today' | 'week' | 'month' | 'custom';
  };
}
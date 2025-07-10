import { Project, Task, Message, User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@taskflow.com',
    avatar: '👩‍💼',
    role: 'Project Manager'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos@taskflow.com',
    avatar: '👨‍💻',
    role: 'Developer'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria@taskflow.com',
    avatar: '🎨',
    role: 'Designer'
  },
  {
    id: '4',
    name: 'João Costa',
    email: 'joao@taskflow.com',
    avatar: '📊',
    role: 'Analyst'
  },
  {
    id: '5',
    name: 'Sofia Lima',
    email: 'sofia@taskflow.com',
    avatar: '✨',
    role: 'QA Engineer'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    company: 'Google Inc.',
    logo: '🛒',
    progress: 75,
    completedTasks: 18,
    totalTasks: 24,
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-02-15',
    platforms: ['Web', 'Mobile'],
    teamMembers: ['👩‍💼', '👨‍💻', '🎨', '📊'],
    description: 'Desenvolvimento de plataforma de e-commerce completa',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    company: 'Slack Corporation',
    logo: '🏦',
    progress: 45,
    completedTasks: 9,
    totalTasks: 20,
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2024-03-20',
    platforms: ['iOS', 'Android'],
    teamMembers: ['👨‍💻', '🎨', '✨'],
    description: 'Aplicativo bancário com recursos avançados de segurança',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Dashboard Analytics',
    company: 'Microsoft',
    logo: '📊',
    progress: 90,
    completedTasks: 27,
    totalTasks: 30,
    priority: 'low',
    status: 'completed',
    dueDate: '2024-01-30',
    platforms: ['Web'],
    teamMembers: ['📊', '👩‍💼', '👨‍💻'],
    description: 'Dashboard para análise de dados em tempo real',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date()
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Criar wireframes da homepage',
    description: 'Desenvolver wireframes detalhados para a página inicial',
    completed: false,
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date('2024-02-10'),
    projectId: '1',
    estimatedTime: 8,
    actualTime: 5,
    tags: ['design', 'wireframe'],
    assignedTo: '3',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Implementar autenticação',
    description: 'Sistema de login e registro de usuários',
    completed: true,
    priority: 'high',
    status: 'completed',
    dueDate: new Date('2024-01-25'),
    projectId: '1',
    estimatedTime: 16,
    actualTime: 14,
    tags: ['backend', 'security'],
    assignedTo: '2',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Design do sistema de pagamento',
    description: 'Interface para processamento de pagamentos',
    completed: false,
    priority: 'medium',
    status: 'pending',
    dueDate: new Date('2024-02-20'),
    projectId: '1',
    estimatedTime: 12,
    tags: ['design', 'payment'],
    assignedTo: '3',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'Testes de segurança',
    description: 'Auditoria completa de segurança do aplicativo',
    completed: false,
    priority: 'high',
    status: 'pending',
    dueDate: new Date('2024-03-15'),
    projectId: '2',
    estimatedTime: 20,
    tags: ['security', 'testing'],
    assignedTo: '5',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date()
  },
  {
    id: '5',
    title: 'Otimização de performance',
    description: 'Melhorar velocidade de carregamento',
    completed: false,
    priority: 'medium',
    status: 'in-progress',
    dueDate: new Date('2024-02-28'),
    projectId: '2',
    estimatedTime: 10,
    actualTime: 3,
    tags: ['performance', 'optimization'],
    assignedTo: '2',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date()
  },
  {
    id: '6',
    title: 'Documentação da API',
    description: 'Criar documentação completa da API',
    completed: true,
    priority: 'low',
    status: 'completed',
    dueDate: new Date('2024-01-20'),
    projectId: '3',
    estimatedTime: 6,
    actualTime: 8,
    tags: ['documentation', 'api'],
    assignedTo: '4',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date()
  },
  {
    id: '7',
    title: 'Configurar CI/CD',
    description: 'Pipeline de integração e deploy contínuo',
    completed: false,
    priority: 'medium',
    status: 'pending',
    dueDate: new Date('2024-02-25'),
    projectId: '1',
    estimatedTime: 8,
    tags: ['devops', 'automation'],
    assignedTo: '2',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date()
  },
  {
    id: '8',
    title: 'Testes unitários',
    description: 'Implementar cobertura de testes de 80%',
    completed: false,
    priority: 'medium',
    status: 'in-progress',
    dueDate: new Date('2024-03-01'),
    projectId: '2',
    estimatedTime: 15,
    actualTime: 7,
    tags: ['testing', 'quality'],
    assignedTo: '5',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date()
  },
  {
    id: '9',
    title: 'Interface responsiva',
    description: 'Adaptar layout para dispositivos móveis',
    completed: false,
    priority: 'high',
    status: 'pending',
    dueDate: new Date('2024-02-18'),
    projectId: '1',
    estimatedTime: 12,
    tags: ['frontend', 'responsive'],
    assignedTo: '3',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date()
  },
  {
    id: '10',
    title: 'Integração com APIs externas',
    description: 'Conectar com serviços de terceiros',
    completed: false,
    priority: 'medium',
    status: 'pending',
    dueDate: new Date('2024-03-10'),
    projectId: '2',
    estimatedTime: 18,
    tags: ['integration', 'api'],
    assignedTo: '2',
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date()
  },
  {
    id: '11',
    title: 'Análise de métricas',
    description: 'Implementar tracking de eventos',
    completed: true,
    priority: 'low',
    status: 'completed',
    dueDate: new Date('2024-01-15'),
    projectId: '3',
    estimatedTime: 4,
    actualTime: 6,
    tags: ['analytics', 'tracking'],
    assignedTo: '4',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '12',
    title: 'Backup automático',
    description: 'Sistema de backup de dados',
    completed: false,
    priority: 'high',
    status: 'overdue',
    dueDate: new Date('2024-01-30'),
    projectId: '2',
    estimatedTime: 6,
    tags: ['backup', 'data'],
    assignedTo: '2',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  },
  {
    id: '13',
    title: 'Validação de formulários',
    description: 'Implementar validação client-side',
    completed: false,
    priority: 'medium',
    status: 'in-progress',
    dueDate: new Date('2024-02-22'),
    projectId: '1',
    estimatedTime: 8,
    actualTime: 2,
    tags: ['frontend', 'validation'],
    assignedTo: '3',
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date()
  },
  {
    id: '14',
    title: 'Notificações push',
    description: 'Sistema de notificações em tempo real',
    completed: false,
    priority: 'low',
    status: 'pending',
    dueDate: new Date('2024-03-05'),
    projectId: '2',
    estimatedTime: 10,
    tags: ['notifications', 'realtime'],
    assignedTo: '2',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date()
  },
  {
    id: '15',
    title: 'Relatórios customizados',
    description: 'Geração de relatórios personalizados',
    completed: true,
    priority: 'medium',
    status: 'completed',
    dueDate: new Date('2024-01-25'),
    projectId: '3',
    estimatedTime: 14,
    actualTime: 16,
    tags: ['reports', 'customization'],
    assignedTo: '4',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date()
  }
];

export const messages: Message[] = [
  {
    id: '1',
    user: {
      name: 'Ana Silva',
      avatar: '👩‍💼'
    },
    message: 'Olá! Como está o progresso do projeto e-commerce?',
    timestamp: '2h',
    unread: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    user: {
      name: 'Carlos Santos',
      avatar: '👨‍💻'
    },
    message: 'Preciso de ajuda com a integração da API de pagamento',
    timestamp: '4h',
    unread: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '3',
    user: {
      name: 'Maria Oliveira',
      avatar: '🎨'
    },
    message: 'Os wireframes estão prontos para revisão',
    timestamp: '1d',
    unread: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: '4',
    user: {
      name: 'João Costa',
      avatar: '📊'
    },
    message: 'Relatório de métricas enviado por email',
    timestamp: '2d',
    unread: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: '5',
    user: {
      name: 'Sofia Lima',
      avatar: '✨'
    },
    message: 'Testes de segurança concluídos com sucesso!',
    timestamp: '3d',
    unread: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
];
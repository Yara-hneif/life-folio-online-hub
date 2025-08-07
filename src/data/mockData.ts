export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  ownerId: string;
  collaborators: User[]; // User objects instead of IDs
  status: 'planning' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
}

// Mock projects data
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform built with React and Node.js, featuring user authentication, product catalog, shopping cart, and payment integration.',
    image: '/api/placeholder/400/250',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com/johndoe/ecommerce',
    liveUrl: 'https://ecommerce-demo.com',
    ownerId: '1',
    collaborators: [{ id: '2', username: 'sarahsmith', name: 'Sarah Smith', avatar: '/api/placeholder/150/150' }],
    status: 'completed',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/api/placeholder/400/250',
    technologies: ['React', 'TypeScript', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/sarahsmith/taskmanager',
    liveUrl: 'https://taskmanager-demo.com',
    ownerId: '2',
    collaborators: [{ id: '1', username: 'johndoe', name: 'John Doe', avatar: '/api/placeholder/150/150' }],
    status: 'in-progress',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-20')
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
    image: '/api/placeholder/400/250',
    technologies: ['Vue.js', 'Express.js', 'OpenWeather API'],
    githubUrl: 'https://github.com/johndoe/weather-dashboard',
    ownerId: '1',
    collaborators: [],
    status: 'planning',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-10')
  }
];

// Helper functions
export const getProjectsByUserId = (userId: string): Project[] => {
  return mockProjects.filter(project => project.ownerId === userId);
};

export const getCollaborativeProjects = (userId: string): Project[] => {
  return mockProjects.filter(project => 
    project.collaborators.some(collaborator => collaborator.id === userId) && project.ownerId !== userId
  );
};

export const getUserById = (userId: string): User | undefined => {
  const users = [
    { id: '1', username: 'johndoe', name: 'John Doe', avatar: '/api/placeholder/150/150' },
    { id: '2', username: 'sarahsmith', name: 'Sarah Smith', avatar: '/api/placeholder/150/150' }
  ];
  return users.find(user => user.id === userId);
};

export const getAllUsers = (): User[] => {
  return [
    { id: '1', username: 'johndoe', name: 'John Doe', avatar: '/api/placeholder/150/150' },
    { id: '2', username: 'sarahsmith', name: 'Sarah Smith', avatar: '/api/placeholder/150/150' }
  ];
};

// Updated function to return separated owned and collaborative projects
export const getUserProjects = (userId: string) => {
  const owned = getProjectsByUserId(userId);
  const collaborative = getCollaborativeProjects(userId);
  return { owned, collaborative };
};

// Mock collaborators for project creation form
export const mockCollaborators = getAllUsers();
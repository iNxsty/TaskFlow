import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import TaskList from './components/TaskList';
import Calendar from './components/Calendar';
import Messages from './components/Messages';
import QuickTasks from './components/QuickTasks';

const AppContent: React.FC = () => {
  const { projects } = useApp();

  return (
    <div className="h-screen bg-gray-900 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              <QuickTasks />
            </div>
            
            {/* Right Sidebar */}
            <div className="space-y-6">
              <TaskList />
              <Calendar />
              <Messages />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
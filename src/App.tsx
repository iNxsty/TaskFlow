import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import ResponsiveLayout from './components/ResponsiveLayout';
import SearchAndFilters from './components/SearchAndFilters';
import ProjectCard from './components/ProjectCard';
import TaskList from './components/TaskList';
import InteractiveCalendar from './components/InteractiveCalendar';
import Messages from './components/Messages';
import QuickTasks from './components/QuickTasks';
import LoadingSkeleton from './components/LoadingSkeleton';

const AppContent: React.FC = () => {
  const { projects, activeView } = useApp();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div className="lg:col-span-2 space-y-6">
            <LoadingSkeleton type="text" className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LoadingSkeleton type="card" count={2} />
            </div>
            <LoadingSkeleton type="card" />
          </div>
          <div className="space-y-6">
            <LoadingSkeleton type="list" count={3} />
            <LoadingSkeleton type="calendar" />
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'calendar':
        return (
          <div className="max-w-6xl mx-auto">
            <SearchAndFilters />
            <div className="mt-6">
              <InteractiveCalendar />
            </div>
          </div>
        );
      
      case 'mytask':
        return (
          <div className="max-w-4xl mx-auto">
            <SearchAndFilters />
            <div className="mt-6">
              <TaskList />
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="max-w-6xl mx-auto">
            <SearchAndFilters />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 space-y-6">
              <SearchAndFilters />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <QuickTasks />
            </div>
            
            <div className="space-y-6">
              <TaskList />
              <InteractiveCalendar />
              <Messages />
            </div>
          </div>
        );
    }
  };

  return (
    <ResponsiveLayout>
      {renderContent()}
    </ResponsiveLayout>
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
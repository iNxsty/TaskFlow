import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNavigation from './MobileNavigation';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Auto-close sidebar on mobile when screen size changes
      if (width < 768) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile 
          ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : isTablet
            ? `${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300`
            : 'w-64'
        }
      `}>
        <Sidebar collapsed={isTablet && !sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with Mobile Menu Button */}
        <div className="relative">
          {(isMobile || isTablet) && (
            <button
              onClick={toggleSidebar}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
          <Header />
        </div>

        {/* Page Content */}
        <main className={`
          flex-1 overflow-auto
          ${isMobile ? 'p-4 pb-20' : 'p-6'}
        `}>
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        {isMobile && <MobileNavigation />}
      </div>
    </div>
  );
};

export default ResponsiveLayout;
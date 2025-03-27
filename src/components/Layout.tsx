
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLanguage } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { translate } = useLanguage();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-mitra-beige to-white">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjMuNCAzLjIgMS4yLjkuOCAxLjMgMS44IDEuMyAzIDAgMS4yLS40IDIuMy0xLjMgMy4xLS45LjktMiAxLjMtMy4yIDEuMy0xLjIgMC0yLjMtLjQtMy4yLTEuMy0uOS0uOC0xLjMtMS45LTEuMy0zLjEgMC0xLjIuNC0yLjIgMS4zLTMgLjktLjggMi0xLjIgMy4yLTEuMnptLTE1IDkuNWMxLjIgMCAyLjMuNCAzLjIgMS4zLjkuOCAxLjMgMS44IDEuMyAzcy0uNCAyLjEtMS4zIDNjLS45LjktMiAxLjMtMy4yIDEuMy0xLjIgMC0yLjMtLjQtMy4yLTEuMy0uOS0uOS0xLjMtMS44LTEuMy0zcy40LTIuMiAxLjMtM2MuOS0uOSAyLTEuMyAzLjItMS4zem0xNSAxMi4zYzEuMiAwIDIuMy40IDMuMiAxLjMuOS44IDEuMyAxLjggMS4zIDNzLS40IDIuMS0xLjMgM2MtLjkuOS0yIDEuMy0zLjIgMS4zLTEuMiAwLTIuMy0uNC0zLjItMS4zLS45LS45LTEuMy0xLjgtMS4zLTNzLjQtMi4yIDEuMy0zYy45LS45IDItMS4zIDMuMi0xLjN6bS0xNS0yNi4xYzEuMiAwIDIuMy40IDMuMiAxLjMuOS44IDEuMyAxLjggMS4zIDNzLS40IDIuMS0xLjMgM2MtLjkuOS0yIDEuMy0zLjIgMS4zLTEuMiAwLTIuMy0uNC0zLjItMS4zLS45LS45LTEuMy0xLjgtMS4zLTNzLjQtMi4yIDEuMy0zYy45LS45IDItMS4zIDMuMi0xLjN6IiBmaWxsPSIjM0U2QjQ4IiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10 pointer-events-none"></div>

      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
      
      <footer className="text-center py-4 text-sm text-muted-foreground border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="container">
          <p>{translate('appName')} &copy; {new Date().getFullYear()} - {translate('tagline')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

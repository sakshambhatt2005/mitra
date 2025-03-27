import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, BarChart2, CloudRain, Info, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { translate } = useLanguage();

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-md shadow-xl 
                    border-r border-border/50 transition-transform duration-300 ease-in-out
                    flex flex-col md:relative md:translate-x-0 md:z-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* User Profile Section */}
        <div className="flex flex-col items-center justify-center p-6 border-b border-border/50 bg-gradient-to-br from-mitra-beige to-white">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-mitra-green to-mitra-lightGreen flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl font-semibold text-white">U</span>
          </div>
          <h2 className="text-xl font-medium mb-1">{translate('helloUser')}</h2>
          <p className="text-sm text-muted-foreground">{translate('welcomeBack')}</p>
        </div>

        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-mitra-green/10 transition-all duration-200 group"
            >
              <Home className="h-5 w-5 text-mitra-green group-hover:text-mitra-green/80" />
              <span className="font-medium">{translate('dashboard')}</span>
            </Link>
            
            <Link
              to="/market-prices"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-mitra-green/10 transition-all duration-200 group"
            >
              <BarChart2 className="h-5 w-5 text-mitra-green group-hover:text-mitra-green/80" />
              <span className="font-medium">{translate('marketPrices')}</span>
            </Link>
            
            <Link
              to="/weather"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-mitra-green/10 transition-all duration-200 group"
            >
              <CloudRain className="h-5 w-5 text-mitra-green group-hover:text-mitra-green/80" />
              <span className="font-medium">{translate('weather')}</span>
            </Link>
            
            <Link
              to="/crop-advisory"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-mitra-green/10 transition-all duration-200 group"
            >
              <Info className="h-5 w-5 text-mitra-green group-hover:text-mitra-green/80" />
              <span className="font-medium">{translate('cropAdvisory')}</span>
            </Link>
            
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-mitra-green/10 transition-all duration-200 group"
            >
              <Settings className="h-5 w-5 text-mitra-green group-hover:text-mitra-green/80" />
              <span className="font-medium">{translate('settings')}</span>
            </Link>
          </div>
        </nav>

        {/* Today's Advice Section */}
        <div className="p-4 mx-3 mb-6 bg-gradient-to-br from-mitra-green/10 to-transparent rounded-xl border border-mitra-green/20">
          <h3 className="font-medium text-mitra-green mb-2">{translate('todaysAdvice')}</h3>
          <p className="text-sm text-muted-foreground">
            {translate('dailyAdvice')}
          </p>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 md:hidden" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </aside>
    </>
  );
};

export default Sidebar;

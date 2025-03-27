import React, { useState } from 'react';
import { Menu, Globe, Download, LogOut } from 'lucide-react';
import { useLanguage, Language, languageLabels } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { language, setLanguage, translate } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/mitra logo.PNG" 
              alt="Mitra Logo" 
              className="h-12 w-12 rounded-xl"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2"
                aria-label={translate('selectLanguage')}
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{languageLabels[language]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {Object.entries(languageLabels).map(([code, label]) => (
                <DropdownMenuItem 
                  key={code}
                  onClick={() => setLanguage(code as Language)}
                  className={language === code ? 'bg-muted font-medium' : ''}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            aria-label={translate('offline')}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{translate('offline')}</span>
          </Button>

          {isAuthenticated && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 text-red-500"
              onClick={handleLogout}
              aria-label={translate('logout')}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{translate('logout')}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

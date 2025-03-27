
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-mitra-beige to-white p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-9xl font-bold">404</div>
          </div>
          <div className="relative z-10 h-32 w-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary text-5xl font-bold">404</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-heading font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild>
          <Link to="/" className="flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

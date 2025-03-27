import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, languageLabels, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Download, 
  LogIn, 
  UserPlus, 
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Feature cards data
const featureCards = [
  {
    title: 'Market Prices',
    description: 'Stay ahead with real-time agricultural market prices from your local mandis. Compare prices across different markets, track price trends, and make informed decisions about when and where to sell your produce. Get daily updates for all major crops and commodities.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&h=400&fit=crop'
  },
  {
    title: 'Weather Forecast',
    description: 'Access detailed 7-day weather forecasts specifically tailored for agriculture. Get insights on rainfall probability, temperature variations, humidity levels, and wind patterns. Includes crop-specific weather alerts and farming activity recommendations based on weather conditions.',
    image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=800&h=400&fit=crop'
  },
  {
    title: 'Crop Advisory',
    description: 'Receive expert guidance throughout your crop\'s lifecycle. Get personalized recommendations for seed selection, irrigation scheduling, pest management, and harvest timing. Our advisory system combines traditional farming wisdom with modern agricultural science.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&h=400&fit=crop'
  },
  {
    title: 'Offline Access',
    description: 'Never miss critical information due to poor connectivity. Download essential data for offline use, including market price history, weather patterns, and crop care guides. Stay informed even in areas with limited internet access, ensuring you have the information you need, when you need it.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&h=400&fit=crop'
  }
];

const Index = () => {
  const { translate, language, setLanguage } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % featureCards.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % featureCards.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + featureCards.length) % featureCards.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mitra-beige to-white">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjMuNCAzLjIgMS4yLjkuOCAxLjMgMS44IDEuMyAzIDAgMS4yLS40IDIuMy0xLjMgMy4xLS45LjktMiAxLjMtMy4yIDEuMy0xLjIgMC0yLjMtLjQtMy4yLTEuMy0uOS0uOC0xLjMtMS45LTEuMy0zLjEgMC0xLjIuNC0yLjIgMS4zLTMgLjktLjggMi0xLjIgMy4yLTEuMnptLTE1IDkuNWMxLjIgMCAyLjMuNCAzLjIgMS4zLjkuOCAxLjMgMS44IDEuMyAzcy0uNCAyLjEtMS4zIDNjLS45LjktMiAxLjMtMy4yIDEuMy0xLjIgMC0yLjMtLjQtMy4yLTEuMy0uOS0uOS0xLjMtMS44LTEuMy0zcy40LTIuMiAxLjMtM2MuOS0uOSAyLTEuMyAzLjItMS4zem0xNSAxMi4zYzEuMiAwIDIuMy40IDMuMiAxLjMuOS44IDEuMyAxLjggMS4zIDNzLS40IDIuMS0xLjMgM2MtLjkuOS0yIDEuMy0zLjIgMS4zLTEuMiAwLTIuMy0uNC0zLjItMS4zLS45LS45LTEuMy0xLjgtMS4zLTNzLjQtMi4yIDEuMy0zYy45LS45IDItMS4zIDMuMi0xLjN6bS0xNS0yNi4xYzEuMiAwIDIuMy40IDMuMiAxLjMuOS44IDEuMyAxLjggMS4zIDNzLS40IDIuMS0xLjMgM2MtLjkuOS0yIDEuMy0zLjIgMS4zLTEuMiAwLTIuMy0uNC0zLjItMS4zLS45LS45LTEuMy0xLjgtMS4zLTNzLjQtMi4yIDEuMy0zYy45LS45IDItMS4zIDMuMi0xLjN6IiBmaWxsPSIjM0U2QjQ4IiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-12 flex flex-col min-h-screen">
        {/* Header */}
        <header className="container px-4 md:px-6 flex items-center justify-between py-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <img 
              src="/mitra logo.PNG" 
              alt="Mitra Logo" 
              className="h-24 w-auto"
            />
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{languageLabels[language]}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
            
            <Link to="/sign-in">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                {translate('login')}
              </Button>
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center">
          {/* Centered header section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-8 tracking-tight">
              <span className="font-serif italic">Mitra</span>
              <span className="text-mitra-green mx-3">—</span>
              <span className="font-light">Your Farming</span>
              <br className="hidden sm:block" />
              <span className="font-medium">Companion</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
              {translate('aboutMitra')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up">
                <Button size="lg" className="w-full sm:w-auto">
                  <UserPlus className="mr-2 h-5 w-5" /> {translate('register')}
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" /> {translate('downloadApp')}
              </Button>
            </div>
          </div>

          {/* Two-column layout for carousel and login */}
          <div className="w-full grid md:grid-cols-2 gap-12 items-start">
            {/* Left column - Feature Cards Carousel */}
            <div className="relative">
              <Card className="max-w-2xl mx-auto transition-all duration-300 hover:border-green-500 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <button 
                      onClick={prevFeature}
                      className="p-3 rounded-full hover:bg-green-100 transition-colors duration-200 transform hover:scale-110 active:scale-95"
                    >
                      <ChevronLeft className="h-6 w-6 text-green-600" />
                    </button>
                    <button 
                      onClick={nextFeature}
                      className="p-3 rounded-full hover:bg-green-100 transition-colors duration-200 transform hover:scale-110 active:scale-95"
                    >
                      <ChevronRight className="h-6 w-6 text-green-600" />
                    </button>
                  </div>

                  <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                    <img
                      src={featureCards[currentFeature].image}
                      alt={featureCards[currentFeature].title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                      {featureCards[currentFeature].title}
                    </h3>
                    <p className="min-h-[100px] text-gray-600">
                      {featureCards[currentFeature].description}
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 mt-6">
                    {featureCards.map((_, index) => (
                      <button
                        key={index}
                        className={`transition-all duration-300 transform hover:scale-110 ${
                          index === currentFeature 
                            ? 'w-8 h-2 bg-gradient-to-r from-green-600 to-green-400 rounded-full' 
                            : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-green-200'
                        }`}
                        onClick={() => setCurrentFeature(index)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Auth */}
            <div className="flex flex-col justify-start">
              <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 mt-12">
          <p className="text-muted-foreground text-sm">
            <span className="font-serif italic">Mitra</span>
            <span className="mx-2">©</span>
            {new Date().getFullYear()}
            <span className="mx-2">—</span>
            <span className="text-gray-600">{translate('tagline')}</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

interface AuthCardProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ isLogin, setIsLogin }) => {
  const { translate } = useLanguage();
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-heading font-bold">{isLogin ? translate('login') : translate('register')}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? translate('homeLoginPrompt') : translate('noAccount')}
          </p>
        </div>
        
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">{translate('email')}</label>
            <input 
              id="email" 
              type="email" 
              className="w-full p-2 border border-border rounded-md" 
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">{translate('password')}</label>
            <input 
              id="password" 
              type="password" 
              className="w-full p-2 border border-border rounded-md" 
              placeholder="••••••••"
            />
          </div>
          
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">{translate('confirmPassword')}</label>
              <input 
                id="confirm-password" 
                type="password" 
                className="w-full p-2 border border-border rounded-md" 
                placeholder="••••••••"
              />
            </div>
          )}
          
          <div className="mt-6">
            <Link to={isLogin ? "/dashboard" : "/verify-phone"}>
              <Button type="button" className="w-full">
                {isLogin ? translate('login') : translate('register')}
              </Button>
            </Link>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            type="button" 
            className="text-sm text-mitra-green hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? translate('noAccount') : translate('alreadyHaveAccount')}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import Layout from '@/components/Layout';
import CropInput from '@/components/CropInput';
import RegionInput from '@/components/RegionInput';
import SeasonInput from '@/components/SeasonInput';
import WeatherCard from '@/components/WeatherCard';
import MarketPriceCard from '@/components/MarketPriceCard';
import CropAdvisoryCard from '@/components/CropAdvisoryCard';
import { generateCropAdvice } from '@/services/ai';
import { testAIIntegration } from '@/services/test-ai';

// Sample mock data for different crops (weather and market prices)
const mockData = {
  rice: {
    weather: {
      temperature: 28,
      humidity: 65,
      rainfall: 2.5,
      forecast: 'partlyCloudyForecast',
    },
    price: {
      current: 2340,
      previous: 2290,
      unit: 'quintal',
      crop: 'rice',
      mandi: 'Azadpur Mandi, Delhi',
    }
  },
  wheat: {
    weather: {
      temperature: 24,
      humidity: 55,
      rainfall: 0,
      forecast: 'clearSkies',
    },
    price: {
      current: 2150,
      previous: 2100,
      unit: 'quintal',
      crop: 'wheat',
      mandi: 'Karnal Mandi, Haryana',
    }
  },
  cotton: {
    weather: {
      temperature: 32,
      humidity: 60,
      rainfall: 1.0,
      forecast: 'warmHumidForecast',
    },
    price: {
      current: 6500,
      previous: 6300,
      unit: 'quintal',
      crop: 'cotton',
      mandi: 'Rajkot Mandi, Gujarat',
    }
  },
  pulses: {
    weather: {
      temperature: 26,
      humidity: 70,
      rainfall: 1.5,
      forecast: 'lightShowersForecast',
    },
    price: {
      current: 5600,
      previous: 5500,
      unit: 'quintal',
      crop: 'pulses',
      mandi: 'Gulbarga Mandi, Karnataka',
    }
  }
};

const Dashboard: React.FC = () => {
  const { translate, language } = useLanguage();
  const navigate = useNavigate();
  
  const [crop, setCrop] = useState('');
  const [region, setRegion] = useState('');
  const [season, setSeason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [currentData, setCurrentData] = useState<any>(null);
  const [advisoryData, setAdvisoryData] = useState<any>(null);

  // Test AI integration on component mount
  useEffect(() => {
    const testAI = async () => {
      const isWorking = await testAIIntegration();
      if (isWorking) {
        console.log('AI Integration test passed');
      } else {
        console.error('AI Integration test failed');
      }
    };
    testAI();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!crop || !region || !season) {
      toast.error("Please select all fields");
      return;
    }
    
    setIsLoading(true);
    console.log('Starting data fetch with:', { crop, region, season, language });
    
    try {
      // Get AI-generated crop advice
      console.log('Calling generateCropAdvice...');
      const advice = await generateCropAdvice(crop, region, season, language);
      console.log('Received AI advice:', advice);
      
      // Get mock weather and price data
      const mockCropData = mockData[crop as keyof typeof mockData] || mockData.rice;
      console.log('Using mock data:', mockCropData);
      
      setCurrentData(mockCropData);
      setAdvisoryData(advice);
      setShowData(true);
      toast.success("Data loaded successfully!");
    } catch (error) {
      console.error('Detailed error in handleSubmit:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      toast.error(`Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const allInputsFilled = crop && region && season;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="text-center mb-8 mt-4">
          <div className="inline-block py-1 px-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-2">
            {translate('welcomeMessage')}
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">{translate('appName')}</h1>
          <p className="text-muted-foreground mt-2">{translate('tagline')}</p>
        </div>

        {/* Form Section */}
        <div className="mb-10 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CropInput value={crop} onChange={setCrop} />
              <RegionInput value={region} onChange={setRegion} />
              <SeasonInput value={season} onChange={setSeason} />
            </div>
            <div className="mt-6 flex justify-center">
              <Button 
                type="submit" 
                className="w-full md:w-auto min-w-[200px]"
                disabled={!allInputsFilled || isLoading}
              >
                {isLoading ? translate('loading') : translate('submitButton')}
              </Button>
            </div>
          </form>
        </div>

        {/* Dashboard Cards */}
        {showData && currentData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            <WeatherCard data={currentData.weather} isLoading={isLoading} />
            <MarketPriceCard data={currentData.price} isLoading={isLoading} />
            <CropAdvisoryCard data={advisoryData} isLoading={isLoading} />
          </div>
        )}

        {/* Information Banner */}
        <div className="mt-10 bg-muted/50 rounded-lg p-6 border border-border">
          <h2 className="font-heading text-lg font-medium mb-2">{translate('recentUpdates')}</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>{translate('mspAnnouncement')}</li>
            <li>{translate('weatherAlert')}</li>
            <li>{translate('newTechnique')}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

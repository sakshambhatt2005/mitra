import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "sonner";
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun, Sun, Cloud, CloudRain, CloudLightning, Droplets, Wind, ThermometerSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWeatherData, formatWeatherData } from '@/services/weather';

interface WeatherData {
  day: string;
  date: Date;
  temp: { max: number; min: number };
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon?: string;
  feels_like?: number;
}

const Weather: React.FC = () => {
  const { translate } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('Delhi');
  const [weatherData, setWeatherData] = useState<{ current: WeatherData, daily: WeatherData[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (city: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getWeatherData(city);
      const formattedData = formatWeatherData(data, city);
      setWeatherData(formattedData);
      toast.success(`${translate('weatherUpdated')} ${translate(city)}`);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      toast.error('Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedLocation);
  }, []);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    fetchWeatherData(location);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="text-center mb-8 mt-4">
          <div className="inline-block py-1 px-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-2">
            {translate('weather')}
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">{translate('weatherForecast')}</h1>
          <p className="text-muted-foreground mt-2">{translate('weatherSubtitle')}</p>
        </div>

        {/* Location selector */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai'].map((city) => (
            <Button 
              key={city}
              variant={selectedLocation === city ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleLocationChange(city)}
            >
              {translate(city)}
            </Button>
          ))}
        </div>

        {error ? (
          <div className="text-center p-4 mb-8 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            {/* Today's Weather */}
            <div className="mb-8">
              {weatherData && (
                <TodayWeatherCard 
                  data={weatherData.current} 
                  location={translate(selectedLocation)} 
                  isLoading={isLoading} 
                />
              )}
            </div>

            {/* Weather Alerts - Moved above weekly forecast */}
            <div className="mb-8 glass-card rounded-xl p-6 bg-yellow-50 border border-yellow-200">
              <div className="flex items-start gap-3">
                <CloudLightning className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="font-heading text-lg font-medium text-yellow-800 mb-1">{translate('weatherAlert')}</h2>
                  <p className="text-yellow-700">
                    {translate('weatherAlertDescription')}
                  </p>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <h2 className="font-heading text-xl font-medium mb-4">{translate('sevenDayForecast')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              {weatherData?.daily.map((day, index) => (
                <ForecastCard key={index} data={day} isLoading={isLoading} />
              ))}
            </div>

            {/* Weather Impact */}
            <div className="bg-muted/50 rounded-lg p-6 border border-border mb-10">
              <h2 className="font-heading text-lg font-medium mb-4">{translate('weatherImpact')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-background p-4 rounded-md">
                  <h3 className="font-medium mb-2">{translate('cropPlanning')}</h3>
                  <p className="text-muted-foreground">{translate('cropPlanningDescription')}</p>
                </div>
                <div className="bg-background p-4 rounded-md">
                  <h3 className="font-medium mb-2">{translate('irrigationTitle')}</h3>
                  <p className="text-muted-foreground">{translate('irrigationDescription')}</p>
                </div>
                <div className="bg-background p-4 rounded-md">
                  <h3 className="font-medium mb-2">{translate('harvestingTitle')}</h3>
                  <p className="text-muted-foreground">{translate('harvestingDescription')}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

interface TodayWeatherCardProps {
  data: WeatherData;
  location: string;
  isLoading?: boolean;
}

const TodayWeatherCard: React.FC<TodayWeatherCardProps> = ({ data, location, isLoading = false }) => {
  const { translate, language } = useLanguage();
  
  const getWeatherIcon = (condition: string, icon?: string) => {
    if (icon) {
      return (
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={translate(condition.toLowerCase())}
          className="w-16 h-16"
        />
      );
    }
    
    // Fallback icons if OpenWeather icon is not available
    switch (condition.toLowerCase()) {
      case 'clear': return <Sun className="h-12 w-12" />;
      case 'clouds': return <CloudSun className="h-12 w-12" />;
      case 'rain': return <CloudRain className="h-12 w-12" />;
      case 'thunderstorm': return <CloudLightning className="h-12 w-12" />;
      default: return <CloudSun className="h-12 w-12" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-muted animate-pulse h-20"></CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="h-6 w-40 bg-muted rounded animate-pulse"></div>
              <div className="h-12 w-24 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-16 w-full bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formattedDate = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(data.date);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-2 pt-6 bg-gradient-to-r from-mitra-blue to-mitra-darkBlue text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-heading">
              {translate('todaysWeather')} {location}
            </CardTitle>
            <p className="text-sm opacity-90">{formattedDate}</p>
          </div>
          {getWeatherIcon(data.condition, data.icon)}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-3xl font-bold">{data.temp.max}{translate('celsius')}</p>
                <p className="text-sm text-muted-foreground">{translate('min')}: {data.temp.min}{translate('celsius')}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">{translate('forecast')}</h3>
            <p className="text-sm text-muted-foreground capitalize">{translate(data.condition.toLowerCase())}</p>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">{translate('weatherDetails')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{translate('humidity')}</p>
                  <p className="font-medium">{data.humidity}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{translate('rainfall')}</p>
                  <p className="font-medium">{data.rainfall} {translate('mm')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{translate('windSpeed')}</p>
                  <p className="font-medium">{data.windSpeed} {translate('kmh')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{translate('feelsLike')}</p>
                  <p className="font-medium">{data.feels_like || data.temp.max}{translate('celsius')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ForecastCardProps {
  data: WeatherData;
  isLoading?: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ data, isLoading = false }) => {
  const { translate, language } = useLanguage();
  
  const getWeatherIcon = (condition: string, icon?: string) => {
    if (icon) {
      return (
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={translate(condition.toLowerCase())}
          className="w-14 h-14 transform transition-transform duration-700 hover:scale-110"
        />
      );
    }
    
    // Fallback icons with animation
    const iconClass = "h-8 w-8 transform transition-transform duration-700 hover:scale-110";
    switch (condition.toLowerCase()) {
      case 'clear': return <Sun className={iconClass} />;
      case 'clouds': return <CloudSun className={iconClass} />;
      case 'rain': return <CloudRain className={iconClass} />;
      case 'thunderstorm': return <CloudLightning className={iconClass} />;
      default: return <CloudSun className={iconClass} />;
    }
  };

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/30 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="h-5 w-24 bg-muted rounded animate-pulse mx-auto"></div>
            <div className="h-12 w-12 bg-muted rounded-full animate-pulse mx-auto"></div>
            <div className="h-6 w-16 bg-muted rounded animate-pulse mx-auto"></div>
            <div className="h-4 w-32 bg-muted rounded animate-pulse mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const dayOfWeek = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'short' }).format(data.date);
  const dateString = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short' }).format(data.date);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/30 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-mitra-green/5 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl opacity-0 group-hover:opacity-50" />
      <CardContent className="relative p-6 text-center">
        <h3 className="font-medium text-lg mb-1 transition-colors duration-300 group-hover:text-primary">{dayOfWeek}</h3>
        <p className="text-sm text-muted-foreground mb-4 transition-opacity duration-300 group-hover:opacity-90">{dateString}</p>
        
        <div className="mb-4 flex justify-center transform transition-transform duration-500 group-hover:scale-105">
          {getWeatherIcon(data.condition, data.icon)}
        </div>
        
        <div className="mb-4 space-y-1">
          <p className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary">{data.temp.max}{translate('celsius')}</p>
          <p className="text-sm text-muted-foreground transition-opacity duration-300 group-hover:opacity-90">{data.temp.min}{translate('celsius')}</p>
        </div>
        
        <div className="flex justify-center gap-4 text-sm text-muted-foreground transition-opacity duration-300 group-hover:opacity-90">
          <div className="flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
            <Droplets className="h-4 w-4 text-mitra-blue" />
            <span>{data.rainfall}{translate('mm')}</span>
          </div>
          <div className="flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
            <Wind className="h-4 w-4 text-mitra-blue" />
            <span>{data.windSpeed}{translate('kmh')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Weather;

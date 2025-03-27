import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CloudSun, Droplets, ThermometerSun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: string;
}

interface WeatherCardProps {
  data: WeatherData;
  isLoading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, isLoading = false }) => {
  const { translate } = useLanguage();

  if (isLoading) {
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-muted animate-pulse h-20"></CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
            <div className="h-10 w-36 bg-muted rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-28 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-2 pt-6 bg-gradient-to-r from-mitra-blue to-mitra-darkBlue text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-heading">
            {translate('weather')}
          </CardTitle>
          <CloudSun className="h-5 w-5 opacity-75" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-muted-foreground text-sm">{translate('todayTemp')}</h3>
          <p className="text-3xl font-bold">{data.temperature}°C</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{translate('humidity')}</p>
              <p className="font-medium">{data.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThermometerSun className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{translate('rainfall')}</p>
              <p className="font-medium">{data.rainfall} mm</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">{translate('forecast')}</p>
          <p className="text-sm">{translate(data.forecast)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;

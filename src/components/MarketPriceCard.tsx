import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PriceData {
  current: number;
  previous: number;
  unit: string;
  crop: string;
  mandi: string;
}

interface MarketPriceCardProps {
  data: PriceData;
  isLoading?: boolean;
}

const cropImages = {
  'rice': '/crops/rice.jpg',
  'wheat': '/crops/wheat.jpg',
  'cotton': '/crops/cotton.jpg',
  'potato': '/crops/potato.jpg',
  'tomato': '/crops/tomato.jpg',
  'onion': '/crops/onion.jpg',
};

const MarketPriceCard: React.FC<MarketPriceCardProps> = ({ data, isLoading = false }) => {
  const { translate } = useLanguage();
  const [imageError, setImageError] = useState(false);
  
  const priceChange = data.current - data.previous;
  const percentChange = ((priceChange / data.previous) * 100).toFixed(1);
  const isIncreasing = priceChange > 0;

  if (isLoading) {
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-muted animate-pulse h-20"></CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
            <div className="h-10 w-36 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-2 pt-6 bg-gradient-to-r from-mitra-yellow to-mitra-brown text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-heading capitalize">
            {translate(data.crop)}
          </CardTitle>
          <BarChart2 className="h-5 w-5 opacity-75" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex gap-4 mb-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
            {!imageError && cropImages[data.crop as keyof typeof cropImages] && (
              <img 
                src={cropImages[data.crop as keyof typeof cropImages]} 
                alt={translate(data.crop)}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </div>
          <div>
            <h3 className="text-muted-foreground text-sm">{translate('currentPrice')}</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">₹{data.current}</p>
              <p className="text-sm text-muted-foreground">/ {data.unit}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-1">
          {isIncreasing ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${isIncreasing ? 'text-green-600' : 'text-red-500'}`}>
            {isIncreasing ? '+' : ''}{percentChange}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">{translate('fromYesterday')}</span>
        </div>
        
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-sm">
            <span className="text-muted-foreground">{translate('nearbyMandis')}:</span> {translate(data.mandi)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPriceCard;

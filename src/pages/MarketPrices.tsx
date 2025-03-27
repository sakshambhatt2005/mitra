import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "sonner";
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MarketPriceCard from '@/components/MarketPriceCard';

// Crop images for each crop
const cropImages = {
  'rice': '/crops/rice.jpg',
  'wheat': '/crops/wheat.jpg',
  'cotton': '/crops/cotton.jpg',
  'potato': '/crops/potato.jpg',
  'tomato': '/crops/tomato.jpg',
  'onion': '/crops/onion.jpg',
};

// Sample data structure for market data with state information
const allMarketData = {
  'andhra-pradesh': [
    {
      crop: 'rice',
      current: 2250,
      previous: 2190,
      unit: 'quintal',
      mandi: 'guntur-mandi',
    },
    {
      crop: 'wheat',
      current: 2100,
      previous: 2150,
      unit: 'quintal',
      mandi: 'vijayawada-mandi',
    },
  ],
  'maharashtra': [
    {
      crop: 'onion',
      current: 1750,
      previous: 1600,
      unit: 'quintal',
      mandi: 'nashik-mandi',
    },
    {
      crop: 'cotton',
      current: 6900,
      previous: 6700,
      unit: 'quintal',
      mandi: 'aurangabad-mandi',
    },
  ],
  'punjab': [
    {
      crop: 'wheat',
      current: 2200,
      previous: 2150,
      unit: 'quintal',
      mandi: 'ludhiana-mandi',
    },
    {
      crop: 'rice',
      current: 2400,
      previous: 2300,
      unit: 'quintal',
      mandi: 'amritsar-mandi',
    },
  ],
  'uttar-pradesh': [
    {
      crop: 'wheat',
      current: 2050,
      previous: 2100,
      unit: 'quintal',
      mandi: 'lucknow-mandi',
    },
    {
      crop: 'potato',
      current: 1400,
      previous: 1450,
      unit: 'quintal',
      mandi: 'agra-mandi',
    }
  ],
  'karnataka': [
    {
      crop: 'tomato',
      current: 1950,
      previous: 1800,
      unit: 'quintal',
      mandi: 'bangalore-mandi',
    },
    {
      crop: 'onion',
      current: 1680,
      previous: 1730,
      unit: 'quintal',
      mandi: 'hubli-mandi',
    }
  ],
  'gujarat': [
    {
      crop: 'cotton',
      current: 6850,
      previous: 6600,
      unit: 'quintal',
      mandi: 'rajkot-mandi',
    },
    {
      crop: 'tomato',
      current: 1780,
      previous: 1850,
      unit: 'quintal',
      mandi: 'ahmedabad-mandi',
    }
  ]
};

const MarketPrices: React.FC = () => {
  const { translate, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [marketData, setMarketData] = useState<any[]>([]);

  // All states for dropdown
  const states = [
    { id: 'andhra-pradesh', name: 'andhra-pradesh' },
    { id: 'maharashtra', name: 'maharashtra' },
    { id: 'punjab', name: 'punjab' },
    { id: 'uttar-pradesh', name: 'uttar-pradesh' },
    { id: 'karnataka', name: 'karnataka' },
    { id: 'gujarat', name: 'gujarat' }
  ];

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error(translate('loginRequired'));
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate, translate]);

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Update market data when state changes
  useEffect(() => {
    if (selectedState) {
      setMarketData(allMarketData[selectedState] || []);
    } else {
      setMarketData([]);
    }
  }, [selectedState]);

  // Filter data by crop if a crop is selected
  const filteredData = selectedCrop 
    ? marketData.filter(item => item.crop === selectedCrop)
    : marketData;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="text-center mb-8 mt-4">
          <div className="inline-block py-1 px-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-2">
            {translate('marketPrices')}
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">{translate('marketPricesTitle')}</h1>
          <p className="text-muted-foreground mt-2">{translate('marketPricesSubtitle')}</p>
        </div>

        {/* State Selection */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="glass-card rounded-xl p-4 flex flex-col space-y-4">
            <label className="text-sm font-medium">{translate('selectState')}</label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder={translate('selectState')} />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {translate(state.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Crop Filters */}
        {selectedState && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <Button 
              variant={selectedCrop === '' ? "default" : "outline"} 
              size="sm" 
              className="capitalize"
              onClick={() => setSelectedCrop('')}
            >
              {translate('allCrops')}
            </Button>
            {[...new Set(marketData.map(item => item.crop))].map(crop => (
              <Button 
                key={crop} 
                variant={selectedCrop === crop ? "default" : "outline"} 
                size="sm" 
                className="capitalize"
                onClick={() => setSelectedCrop(crop)}
              >
                {translate(crop)}
              </Button>
            ))}
          </div>
        )}

        {/* Market Prices Grid */}
        {selectedState ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <MarketPriceCard key={index} data={item} isLoading={isLoading} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">{translate('noStateSelected')}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 mb-10 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">{translate('noStateSelected')}</p>
          </div>
        )}

        {/* Market Trends */}
        <div className="mb-10 glass-card rounded-xl p-6">
          <h2 className="font-heading text-xl font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-mitra-green" />
            {translate('marketTrends')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Major Crops Prices */}
            <div className="bg-background rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="h-5 w-5 text-mitra-yellow" />
                <h3 className="font-medium">{translate('majorCropsPrices')}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span>{translate('rice')}</span>
                  <span className="text-green-600">₹2,400/{translate('perQuintal')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>{translate('wheat')}</span>
                  <span className="text-red-500">₹2,100/{translate('perQuintal')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>{translate('cotton')}</span>
                  <span className="text-green-600">₹6,900/{translate('perQuintal')}</span>
                </div>
              </div>
            </div>

            {/* Regional Price Comparison */}
            <div className="bg-background rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-5 w-5 text-mitra-yellow" />
                <h3 className="font-medium">{translate('regionalPriceComparison')}</h3>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="mb-1">{translate('wheatPricesByRegion')}</div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{translate('punjab')}</span>
                    <span>₹2,200</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{translate('uttar-pradesh')}</span>
                    <span>₹2,050</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{translate('madhya-pradesh')}</span>
                    <span>₹2,150</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Fluctuations */}
            <div className="bg-background rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-mitra-yellow" />
                <h3 className="font-medium">{translate('priceFluctuations')}</h3>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="mb-2">{translate('weeklyChanges')}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-muted-foreground">{translate('cotton')} {translate('pricesUpBy')} 4.5%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-muted-foreground">{translate('onion')} {translate('pricesDownBy')} 2.8%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-muted-foreground">{translate('tomato')} {translate('pricesUpBy')} 8.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section - Modern Know Your Market */}
        <div className="bg-gradient-to-br from-background to-muted/30 rounded-2xl p-8 border border-border/50 mb-10 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-mitra-green">
              {translate('knowYourMarket')}
            </h2>
            <p className="text-base text-muted-foreground/90 mb-8 leading-relaxed">
              {translate('marketInfoDescription')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mandis Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-mitra-green/10 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl opacity-50" />
                <div className="relative bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BarChart2 className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg">{translate('mandis')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {translate('mandisDescription')}
                  </p>
                </div>
              </div>

              {/* Price Fluctuations Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-mitra-yellow/10 to-mitra-green/10 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl opacity-50" />
                <div className="relative bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 h-full transition-all duration-300 hover:shadow-lg hover:shadow-mitra-yellow/5 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-mitra-yellow/10">
                      <TrendingUp className="h-5 w-5 text-mitra-yellow" />
                    </div>
                    <h3 className="font-medium text-lg">{translate('priceFluctuations')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {translate('priceFluctuationsDescription')}
                  </p>
                </div>
              </div>

              {/* MSP Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-mitra-green/10 to-primary/10 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl opacity-50" />
                <div className="relative bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 h-full transition-all duration-300 hover:shadow-lg hover:shadow-mitra-green/5 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-mitra-green/10">
                      <Search className="h-5 w-5 text-mitra-green" />
                    </div>
                    <h3 className="font-medium text-lg">{translate('msp')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {translate('mspDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketPrices;

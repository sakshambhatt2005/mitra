import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Droplets, Bug, Beaker } from 'lucide-react';

interface CropAdvisoryCardProps {
  data: {
    irrigation: string;
    pestControl: string;
    fertilizers: string;
  };
  isLoading?: boolean;
}

const CropAdvisoryCard: React.FC<CropAdvisoryCardProps> = ({ data, isLoading = false }) => {
  const { translate, language } = useLanguage();

  // Process the advice text to replace any remaining English words
  const translateText = (text: string): string => {
    if (language !== 'hi') return text;
    
    const wordsToTranslate = [
      'rice', 'wheat', 'cotton', 'pulses', 'potato', 'tomato', 'onion',
      'kharif', 'rabi', 'zaid'
    ];
    
    return wordsToTranslate.reduce((translatedText, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      return translatedText.replace(regex, translate(word.toLowerCase()));
    }, text);
  };

  const processedData = {
    irrigation: translateText(data.irrigation),
    pestControl: translateText(data.pestControl),
    fertilizers: translateText(data.fertilizers)
  };

  if (isLoading) {
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-muted animate-pulse h-20"></CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-2 pt-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-heading">
            {translate('cropAdvisory')}
          </CardTitle>
          <Info className="h-5 w-5 opacity-75" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Irrigation */}
          <div className="flex items-start gap-3 group">
            <div className="mt-1">
              <Droplets className="h-5 w-5 text-green-600 group-hover:text-green-500 transition-colors" />
            </div>
            <div>
              <h3 className="font-medium text-green-700 group-hover:text-green-600 transition-colors">
                {translate('irrigation')}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {processedData.irrigation}
              </p>
            </div>
          </div>

          {/* Pest Control */}
          <div className="flex items-start gap-3 group">
            <div className="mt-1">
              <Bug className="h-5 w-5 text-green-600 group-hover:text-green-500 transition-colors" />
            </div>
            <div>
              <h3 className="font-medium text-green-700 group-hover:text-green-600 transition-colors">
                {translate('pestControl')}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {processedData.pestControl}
              </p>
            </div>
          </div>

          {/* Fertilizers */}
          <div className="flex items-start gap-3 group">
            <div className="mt-1">
              <Beaker className="h-5 w-5 text-green-600 group-hover:text-green-500 transition-colors" />
            </div>
            <div>
              <h3 className="font-medium text-green-700 group-hover:text-green-600 transition-colors">
                {translate('fertilizers')}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {processedData.fertilizers}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropAdvisoryCard;

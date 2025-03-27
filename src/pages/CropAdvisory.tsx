import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "sonner";
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Leaf, Droplets, Sprout, Bug, Beaker, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CropInput from '@/components/CropInput';
import RegionInput from '@/components/RegionInput';
import SeasonInput from '@/components/SeasonInput';

const CropAdvisory: React.FC = () => {
  const { translate } = useLanguage();
  const [crop, setCrop] = useState('');
  const [region, setRegion] = useState('');
  const [season, setSeason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvisory, setShowAdvisory] = useState(false);

  const getAdvisoryForCrop = (selectedCrop: string) => {
    return {
      irrigation: translate(`${selectedCrop}IrrigationAdvice`),
      pestControl: translate(`${selectedCrop}PestControlAdvice`),
      fertilizers: translate(`${selectedCrop}FertilizerAdvice`),
      bestPractices: translate(`${selectedCrop}BestPracticesAdvice`),
      warnings: translate(`${selectedCrop}Warnings`),
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!crop || !region || !season) {
      toast.error(translate('selectAllFields'));
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowAdvisory(true);
      toast.success(translate('advisoryLoaded'));
    }, 1500);
  };

  const allInputsFilled = crop && region && season;
  const currentAdvisory = crop ? getAdvisoryForCrop(crop) : null;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="text-center mb-8 mt-4">
          <div className="inline-block py-1 px-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-2">
            {translate('cropAdvisory')}
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">{translate('cropAdvisoryTitle')}</h1>
          <p className="text-muted-foreground mt-2">{translate('cropAdvisorySubtitle')}</p>
        </div>

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
                {isLoading ? translate('loading') : translate('getAdvisory')}
              </Button>
            </div>
          </form>
        </div>

        {showAdvisory && currentAdvisory && (
          <div className="mb-10 animate-slide-up">
            <h2 className="font-heading text-xl font-medium mb-4 capitalize">{translate(crop)} {translate('advisory')}</h2>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AdvisoryCard 
                title={translate('irrigation')}
                content={currentAdvisory.irrigation}
                icon={<Droplets className="h-5 w-5" />}
                color="blue"
                isLoading={isLoading}
              />
            
              <AdvisoryCard 
                title={translate('pestControl')}
                content={currentAdvisory.pestControl}
                icon={<Bug className="h-5 w-5" />}
                color="red"
                isLoading={isLoading}
              />
            
              <AdvisoryCard 
                title={translate('fertilizers')}
                content={currentAdvisory.fertilizers}
                icon={<Beaker className="h-5 w-5" />}
                color="green"
                isLoading={isLoading}
              />
            
              <AdvisoryCard 
                title={translate('bestPractices')}
                content={currentAdvisory.bestPractices}
                icon={<Sprout className="h-5 w-5" />}
                color="yellow"
                isLoading={isLoading}
              />
            </div>
          
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-red-700 mb-1">{translate('warnings')}</h3>
                  <p className="text-red-600 text-sm">{currentAdvisory.warnings}</p>
                </div>
              </div>
            </div>
          
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{translate('seasonalCalendar')}</CardTitle>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-md p-4 text-center">
                  <p className="text-muted-foreground">{translate('calendarComingSoon')}</p>
                </div>
              </CardContent>
            </Card>
          
            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <h2 className="font-heading text-lg font-medium mb-4 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-mitra-green" />
                {translate('expertTips')}
              </h2>
              <div className="space-y-4">
                <div className="bg-background p-4 rounded-md">
                  <h3 className="font-medium mb-1">{translate('soilHealth')}</h3>
                  <p className="text-sm text-muted-foreground">{translate('soilHealthTip')}</p>
                </div>
                <div className="bg-background p-4 rounded-md">
                  <h3 className="font-medium mb-1">{translate('waterManagement')}</h3>
                  <p className="text-sm text-muted-foreground">{translate('waterManagementTip')}</p>
                </div>
                <div className="bg-background p-4 rounded-md">
                  <h3 className="font-medium mb-1">{translate('integratedPestManagement')}</h3>
                  <p className="text-sm text-muted-foreground">{translate('pestManagementTip')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showAdvisory && (
          <div className="bg-muted/50 rounded-lg p-6 border border-border">
            <h2 className="font-heading text-lg font-medium mb-2">{translate('howToUse')}</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>{translate('howToUseStep1')}</li>
              <li>{translate('howToUseStep2')}</li>
              <li>{translate('howToUseStep3')}</li>
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

interface AdvisoryCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  color: 'green' | 'blue' | 'red' | 'yellow';
  isLoading?: boolean;
}

const AdvisoryCard: React.FC<AdvisoryCardProps> = ({ title, content, icon, color, isLoading = false }) => {
  const colorGradients = {
    green: 'from-mitra-green to-mitra-lightGreen',
    blue: 'from-mitra-blue to-mitra-darkBlue',
    red: 'from-red-500 to-red-600',
    yellow: 'from-mitra-yellow to-mitra-brown',
  };

  if (isLoading) {
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-muted animate-pulse h-16"></CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-4/6 bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className={`pb-2 pt-4 bg-gradient-to-br ${colorGradients[color]} text-white`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm">{content}</p>
      </CardContent>
    </Card>
  );
};

export default CropAdvisory;

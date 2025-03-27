import React, { useState } from 'react';
import { useLanguage, Language, languageLabels } from '@/contexts/LanguageContext';
import { toast } from "sonner";
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Globe, 
  Bell, 
  Download, 
  Upload, 
  Moon, 
  Sun, 
  Smartphone, 
  Check, 
  MapPin, 
  User,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Settings: React.FC = () => {
  const { language, setLanguage, translate } = useLanguage();
  
  // State for settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [notifications, setNotifications] = useState({
    weather: true,
    priceAlerts: true,
    advisories: true,
    newsUpdates: false
  });
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoLocation, setAutoLocation] = useState(true);
  const [defaultLocation, setDefaultLocation] = useState('Delhi');
  const [dataUsage, setDataUsage] = useState('balanced');
  const [profileName, setProfileName] = useState('Krishna Kumar');
  
  // Handler functions
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    toast.success(`${translate('themeChanged')} ${translate(newTheme)}`);
  };
  
  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => {
      const newValue = !prev[type];
      // Show toast only when enabling
      if (newValue) {
        toast.success(`${translate(type)} ${translate('notificationsEnabled')}`);
      }
      return { ...prev, [type]: newValue };
    });
  };
  
  const handleOfflineModeToggle = () => {
    const newValue = !offlineMode;
    setOfflineMode(newValue);
    
    if (newValue) {
      toast.success(translate('offlineModeEnabled'));
    } else {
      toast.info(translate('offlineModeDisabled'));
    }
  };
  
  const handleClearData = () => {
    toast.success(translate('dataClearedSuccess'));
  };
  
  const handleSaveSettings = () => {
    toast.success(translate('settingsSaved'));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-8 mt-4">
          <div className="inline-block py-1 px-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-2">
            {translate('settings')}
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">{translate('settingsTitle')}</h1>
          <p className="text-muted-foreground mt-2">{translate('settingsSubtitle')}</p>
        </div>

        {/* Profile Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{translate('profile')}</CardTitle>
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xl font-medium text-primary">{profileName.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-medium">{profileName}</h3>
                <p className="text-sm text-muted-foreground">farmer@example.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              {translate('editProfile')}
            </Button>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{translate('languageSettings')}</CardTitle>
              <Globe className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>{translate('languageDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(languageLabels).map(([code, label]) => (
                <Button 
                  key={code}
                  variant={language === code ? "default" : "outline"}
                  onClick={() => setLanguage(code as Language)}
                  className="justify-start"
                >
                  {language === code && <Check className="mr-2 h-4 w-4" />}
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{translate('appearance')}</CardTitle>
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem 
                  value="light" 
                  id="light" 
                  className="peer sr-only" 
                  onClick={() => handleThemeChange('light')}
                />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  {translate('light')}
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="dark" 
                  id="dark" 
                  className="peer sr-only" 
                  onClick={() => handleThemeChange('dark')}
                />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  {translate('dark')}
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="system" 
                  id="system" 
                  className="peer sr-only" 
                  onClick={() => handleThemeChange('system')}
                />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Smartphone className="mb-3 h-6 w-6" />
                  {translate('system')}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{translate('notifications')}</CardTitle>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{translate('weather')}</Label>
                  <p className="text-sm text-muted-foreground">{translate('weatherAlertsDescription')}</p>
                </div>
                <Switch 
                  checked={notifications.weather} 
                  onCheckedChange={() => handleNotificationChange('weather')} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{translate('priceAlerts')}</Label>
                  <p className="text-sm text-muted-foreground">{translate('priceAlertsDescription')}</p>
                </div>
                <Switch 
                  checked={notifications.priceAlerts} 
                  onCheckedChange={() => handleNotificationChange('priceAlerts')} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{translate('advisories')}</Label>
                  <p className="text-sm text-muted-foreground">{translate('advisoriesDescription')}</p>
                </div>
                <Switch 
                  checked={notifications.advisories} 
                  onCheckedChange={() => handleNotificationChange('advisories')} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{translate('newsUpdates')}</Label>
                  <p className="text-sm text-muted-foreground">{translate('newsUpdatesDescription')}</p>
                </div>
                <Switch 
                  checked={notifications.newsUpdates} 
                  onCheckedChange={() => handleNotificationChange('newsUpdates')} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Settings */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{translate('locationSettings')}</CardTitle>
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>{translate('defaultLocationDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{translate('autoDetectLocation')}</Label>
                  <p className="text-sm text-muted-foreground">{translate('autoDetectDescription')}</p>
                </div>
                <Switch 
                  checked={autoLocation} 
                  onCheckedChange={() => setAutoLocation(!autoLocation)} 
                />
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base mb-2 block">{translate('defaultLocation')}</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'].map((city) => (
                    <Button 
                      key={city}
                      variant={defaultLocation === city ? "default" : "outline"}
                      onClick={() => setDefaultLocation(city)}
                      className="justify-start"
                      size="sm"
                    >
                      {defaultLocation === city && <Check className="mr-2 h-4 w-4" />}
                      {translate(city)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Settings */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{translate('dataSettings')}</CardTitle>
              <Download className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>{translate('dataUsageDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{translate('offlineMode')}</Label>
                  <p className="text-sm text-muted-foreground">{translate('offlineModeDescription')}</p>
                </div>
                <Switch 
                  checked={offlineMode} 
                  onCheckedChange={handleOfflineModeToggle} 
                />
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base mb-4 block">{translate('dataUsage')}</Label>
                <RadioGroup value={dataUsage} className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="low" id="low" onClick={() => setDataUsage('low')} className="mt-1" />
                    <div>
                      <Label htmlFor="low" className="text-base">{translate('lowDataUsage')}</Label>
                      <p className="text-sm text-muted-foreground mt-0.5">{translate('lowDataDescription')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="balanced" id="balanced" onClick={() => setDataUsage('balanced')} className="mt-1" />
                    <div>
                      <Label htmlFor="balanced" className="text-base">{translate('balancedDataUsage')}</Label>
                      <p className="text-sm text-muted-foreground mt-0.5">{translate('balancedDataDescription')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="high" id="high" onClick={() => setDataUsage('high')} className="mt-1" />
                    <div>
                      <Label htmlFor="high" className="text-base">{translate('highDataUsage')}</Label>
                      <p className="text-sm text-muted-foreground mt-0.5">{translate('highDataDescription')}</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div>
                <Button variant="outline" onClick={handleClearData} className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  {translate('clearData')}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">{translate('clearDataDescription')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mb-10">
          <Button variant="outline" className="w-full">
            {translate('resetToDefaults')}
          </Button>
          <Button onClick={handleSaveSettings} className="w-full">
            {translate('saveSettings')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;

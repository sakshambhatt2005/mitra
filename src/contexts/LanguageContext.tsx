import React, { createContext, useContext, useState } from 'react';

// Supported languages
export type Language = 'en' | 'hi';

// Language labels
export const languageLabels: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी (Hindi)'
};

// Language Context Type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// State name translations for each language
const stateTranslations: Record<Language, Record<string, string>> = {
  en: {
    'andhra-pradesh': 'Andhra Pradesh',
    'assam': 'Assam',
    'bihar': 'Bihar',
    'gujarat': 'Gujarat',
    'haryana': 'Haryana',
    'karnataka': 'Karnataka',
    'kerala': 'Kerala',
    'madhya-pradesh': 'Madhya Pradesh',
    'maharashtra': 'Maharashtra',
    'odisha': 'Odisha',
    'punjab': 'Punjab',
    'rajasthan': 'Rajasthan',
    'tamil-nadu': 'Tamil Nadu',
    'telangana': 'Telangana',
    'uttar-pradesh': 'Uttar Pradesh',
    'west-bengal': 'West Bengal',
    Delhi: 'Delhi',
    Mumbai: 'Mumbai',
    Bangalore: 'Bangalore',
    Kolkata: 'Kolkata',
    Chennai: 'Chennai',
    'guntur-mandi': 'Guntur Mandi, Andhra Pradesh',
    'vijayawada-mandi': 'Vijayawada Mandi, Andhra Pradesh',
    'nashik-mandi': 'Nashik Mandi, Maharashtra',
    'aurangabad-mandi': 'Aurangabad Mandi, Maharashtra',
    'ludhiana-mandi': 'Ludhiana Mandi, Punjab',
    'amritsar-mandi': 'Amritsar Mandi, Punjab',
    'lucknow-mandi': 'Lucknow Mandi, Uttar Pradesh',
    'agra-mandi': 'Agra Mandi, Uttar Pradesh',
    'hubli-mandi': 'Hubli Mandi, Karnataka',
    'rajkot-mandi': 'Rajkot Mandi, Gujarat',
    'ahmedabad-mandi': 'Ahmedabad Mandi, Gujarat',
  },
  hi: {
    'andhra-pradesh': 'आंध्र प्रदेश',
    'assam': 'असम',
    'bihar': 'बिहार',
    'gujarat': 'गुजरात',
    'haryana': 'हरियाणा',
    'karnataka': 'कर्नाटक',
    'kerala': 'केरल',
    'madhya-pradesh': 'मध्य प्रदेश',
    'maharashtra': 'महाराष्ट्र',
    'odisha': 'ओडिशा',
    'punjab': 'पंजाब',
    'rajasthan': 'राजस्थान',
    'tamil-nadu': 'तमिलनाडु',
    'telangana': 'तेलंगाना',
    'uttar-pradesh': 'उत्तर प्रदेश',
    'west-bengal': 'पश्चिम बंगाल',
    Delhi: 'दिल्ली',
    Mumbai: 'मुंबई',
    Bangalore: 'बैंगलोर',
    Kolkata: 'कोलकाता',
    Chennai: 'चेन्नई',
    'guntur-mandi': 'गुंटूर मंडी, आंध्र प्रदेश',
    'vijayawada-mandi': 'विजयवाड़ा मंडी, आंध्र प्रदेश',
    'nashik-mandi': 'नासिक मंडी, महाराष्ट्र',
    'aurangabad-mandi': 'औरंगाबाद मंडी, महाराष्ट्र',
    'ludhiana-mandi': 'लुधियाना मंडी, पंजाब',
    'amritsar-mandi': 'अमृतसर मंडी, पंजाब',
    'lucknow-mandi': 'लखनऊ मंडी, उत्तर प्रदेश',
    'agra-mandi': 'आगरा मंडी, उत्तर प्रदेश',
    'hubli-mandi': 'हुबली मंडी, कर्नाटक',
    'rajkot-mandi': 'राजकोट मंडी, गुजरात',
    'ahmedabad-mandi': 'अहमदाबाद मंडी, गुजरात',
  }
};

// Translation dictionaries for different languages
export const translations = {
  en: {
    // App and General
    appName: 'Mitra',
    tagline: 'Your Farming Companion',
    loading: 'Loading...',
    offline: 'Offline Mode',
    selectLanguage: 'Select Language',
    
    // Auth and User
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNumber: 'Phone Number',
    forgotPassword: 'Forgot Password?',
    signingIn: 'Signing In...',
    creating: 'Creating Account...',
    noAccount: 'Don\'t have an account?',
    alreadyHaveAccount: 'Already have an account?',
    backToHome: 'Back to Home',
    loginRequired: 'Please login to access this feature',
    helloUser: 'Hello, Farmer',
    welcomeBack: 'Welcome back to your farm dashboard',
    
    // Navigation
    dashboard: 'Dashboard',
    marketPrices: 'Market Prices',
    weather: 'Weather',
    cropAdvisory: 'Crop Advisory',
    settings: 'Settings',
    downloadApp: 'Download App',
    
    // Market Prices
    marketPricesTitle: 'Market Prices',
    marketPricesSubtitle: 'Track crop prices across different markets',
    selectState: 'Select State',
    allCrops: 'All Crops',
    noStateSelected: 'Please select a state to view prices',
    marketTrends: 'Market Trends',
    majorCropsPrices: 'Major Crops Prices',
    regionalPriceComparison: 'Regional Price Comparison',
    priceFluctuations: 'Price Fluctuations',
    currentPrice: 'Current Price',
    fromYesterday: 'from yesterday',
    nearbyMandis: 'Nearby Mandis',
    perQuintal: 'per quintal',
    pricesUpBy: 'prices up by',
    pricesDownBy: 'prices down by',
    wheatPricesByRegion: 'Wheat Prices by Region',
    weeklyChanges: 'Weekly Changes',
    knowYourMarket: 'Know Your Market',
    marketInfoDescription: 'Understanding market dynamics for better decisions',
    mandis: 'Agricultural Markets (Mandis)',
    mandisDescription: 'Local markets where farmers can sell their produce',
    msp: 'Minimum Support Price (MSP)',
    mspDescription: 'Government-assured price for your crops',
    
    // Weather
    weatherForecast: 'Weather Forecast',
    weatherSubtitle: 'Plan your farming activities with accurate weather updates',
    weatherUpdated: 'Weather updated for',
    todaysWeather: 'Today\'s Weather in',
    weatherAlert: 'Weather Alert',
    weatherAlertDescription: 'Heavy rainfall expected in the next 24 hours',
    sevenDayForecast: '7-Day Forecast',
    weatherImpact: 'Weather Impact on Farming',
    todayTemp: 'Today\'s Temperature',
    humidity: 'Humidity',
    rainfall: 'Rainfall',
    forecast: 'Forecast',
    weatherDetails: 'Weather Details',
    min: 'Min',
    celsius: '°C',
    mm: 'mm',
    kmh: 'km/h',
    windSpeed: 'Wind Speed',
    feelsLike: 'Feels Like',
    
    // Crop Advisory
    cropAdvisoryTitle: 'Crop Advisory',
    cropAdvisorySubtitle: 'Get expert advice for your crops',
    selectCrop: 'Select Crop',
    selectSeason: 'Select Season',
    selectRegion: 'Select Region',
    getAdvisory: 'Get Advisory',
    advisory: 'Advisory',
    irrigation: 'Irrigation',
    pestControl: 'Pest Control',
    fertilizers: 'Fertilizers',
    bestPractices: 'Best Practices',
    warnings: 'Warnings',
    seasonalCalendar: 'Seasonal Calendar',
    calendarComingSoon: 'Detailed seasonal calendar coming soon',
    expertTips: 'Expert Tips',
    soilHealth: 'Soil Health',
    soilHealthTip: 'Regular soil testing helps maintain optimal nutrient levels',
    waterManagement: 'Water Management',
    waterManagementTip: 'Efficient irrigation practices save water and improve yield',
    integratedPestManagement: 'Integrated Pest Management',
    pestManagementTip: 'Use natural pest control methods when possible',
    howToUse: 'How to Use',
    howToUseStep1: 'Select your crop from the dropdown menu',
    howToUseStep2: 'Choose the current growing season',
    howToUseStep3: 'Get personalized recommendations',
    selectAllFields: 'Please select all fields to get advisory',
    advisoryLoaded: 'Advisory loaded successfully',
    
    // Crops
    rice: 'Rice',
    wheat: 'Wheat',
    cotton: 'Cotton',
    pulses: 'Pulses',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    onion: 'Onion',
    tomato: 'Tomato',
    potato: 'Potato',
    
    // Seasons
    kharif: 'Kharif (Monsoon)',
    rabi: 'Rabi (Winter)',
    zaid: 'Zaid (Summer)',
    
    // States
    punjab: 'Punjab',
    'uttar-pradesh': 'Uttar Pradesh',
    'madhya-pradesh': 'Madhya Pradesh',
    
    // Cities
    Delhi: 'Delhi',
    Mumbai: 'Mumbai',
    Bangalore: 'Bangalore',
    Chennai: 'Chennai',
    Kolkata: 'Kolkata',
    Hyderabad: 'Hyderabad',
    
    // Daily Advice
    todaysAdvice: 'Today\'s Advice',
    dailyAdvice: 'Consider checking soil moisture levels before irrigation today',
  },
  
  hi: {
    // App and General
    appName: 'मित्र',
    tagline: 'आपका कृषि साथी',
    loading: 'लोड हो रहा है...',
    offline: 'ऑफ़लाइन मोड',
    selectLanguage: 'भाषा चुनें',
    
    // Auth and User
    login: 'लॉग इन',
    register: 'पंजीकरण',
    logout: 'लॉग आउट',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    phoneNumber: 'फ़ोन नंबर',
    forgotPassword: 'पासवर्ड भूल गए?',
    signingIn: 'लॉग इन हो रहा है...',
    creating: 'खाता बनाया जा रहा है...',
    noAccount: 'खाता नहीं है?',
    alreadyHaveAccount: 'पहले से खाता है?',
    backToHome: 'होम पर वापस जाएं',
    loginRequired: 'इस सुविधा का उपयोग करने के लिए कृपया लॉग इन करें',
    helloUser: 'नमस्ते, किसान',
    welcomeBack: 'आपके कृषि डैशबोर्ड पर आपका स्वागत है',
    
    // Navigation
    dashboard: 'डैशबोर्ड',
    marketPrices: 'बाज़ार भाव',
    weather: 'मौसम',
    cropAdvisory: 'फसल सलाह',
    settings: 'सेटिंग्स',
    downloadApp: 'ऐप डाउनलोड करें',
    
    // Market Prices
    marketPricesTitle: 'बाज़ार भाव',
    marketPricesSubtitle: 'विभिन्न बाज़ारों में फसल के दाम देखें',
    selectState: 'राज्य चुनें',
    allCrops: 'सभी फसलें',
    noStateSelected: 'कृपया कीमतें देखने के लिए राज्य चुनें',
    marketTrends: 'बाज़ार के रुझान',
    majorCropsPrices: 'प्रमुख फसलों के दाम',
    regionalPriceComparison: 'क्षेत्रीय मूल्य तुलना',
    priceFluctuations: 'मूल्य उतार-चढ़ाव',
    currentPrice: 'वर्तमान मूल्य',
    fromYesterday: 'कल से',
    nearbyMandis: 'नज़दीकी मंडियां',
    perQuintal: 'प्रति क्विंटल',
    pricesUpBy: 'मूल्य में वृद्धि',
    pricesDownBy: 'मूल्य में कमी',
    wheatPricesByRegion: 'क्षेत्र के अनुसार गेहूं के दाम',
    weeklyChanges: 'साप्ताहिक बदलाव',
    knowYourMarket: 'अपना बाज़ार जानें',
    marketInfoDescription: 'बेहतर निर्णय के लिए बाज़ार की गतिशीलता को समझें',
    mandis: 'कृषि बाज़ार (मंडियां)',
    mandisDescription: 'स्थानीय बाज़ार जहां किसान अपनी उपज बेच सकते हैं',
    msp: 'न्यूनतम समर्थन मूल्य (एमएसपी)',
    mspDescription: 'आपकी फसलों के लिए सरकार द्वारा आश्वासित मूल्य',
    
    // Weather
    weatherForecast: 'मौसम का पूर्वानुमान',
    weatherSubtitle: 'सटीक मौसम अपडेट के साथ अपनी कृषि गतिविधियों की योजना बनाएं',
    weatherUpdated: 'मौसम अपडेट किया गया',
    todaysWeather: 'आज का मौसम',
    weatherAlert: 'मौसम चेतावनी',
    weatherAlertDescription: 'अगले 24 घंटों में भारी वर्षा की संभावना',
    sevenDayForecast: '7 दिन का पूर्वानुमान',
    weatherImpact: 'खेती पर मौसम का प्रभाव',
    todayTemp: 'आज का तापमान',
    humidity: 'नमी',
    rainfall: 'वर्षा',
    forecast: 'पूर्वानुमान',
    weatherDetails: 'मौसम का विवरण',
    min: 'न्यूनतम',
    celsius: '°C',
    mm: 'मिमी',
    kmh: 'किमी/घंटा',
    windSpeed: 'हवा की गति',
    feelsLike: 'महसूस होता है',
    
    // Crop Advisory
    cropAdvisoryTitle: 'फसल सलाह',
    cropAdvisorySubtitle: 'अपनी फसलों के लिए विशेषज्ञ सलाह प्राप्त करें',
    selectCrop: 'फसल चुनें',
    selectSeason: 'मौसम चुनें',
    selectRegion: 'क्षेत्र चुनें',
    getAdvisory: 'सलाह प्राप्त करें',
    advisory: 'सलाह',
    irrigation: 'सिंचाई',
    pestControl: 'कीट नियंत्रण',
    fertilizers: 'उर्वरक',
    bestPractices: 'सर्वोत्तम प्रथाएं',
    warnings: 'चेतावनियां',
    seasonalCalendar: 'मौसमी कैलेंडर',
    calendarComingSoon: 'विस्तृत मौसमी कैलेंडर जल्द आ रहा है',
    expertTips: 'विशेषज्ञ सुझाव',
    soilHealth: 'मिट्टी का स्वास्थ्य',
    soilHealthTip: 'नियमित मिट्टी परीक्षण से पोषक तत्वों का स्तर इष्टतम रहता है',
    waterManagement: 'जल प्रबंधन',
    waterManagementTip: 'कुशल सिंचाई से पानी की बचत और उपज में सुधार होता है',
    integratedPestManagement: 'समेकित कीट प्रबंधन',
    pestManagementTip: 'जब संभव हो प्राकृतिक कीट नियंत्रण विधियों का उपयोग करें',
    howToUse: 'उपयोग कैसे करें',
    howToUseStep1: 'ड्रॉपडाउन मेनू से अपनी फसल चुनें',
    howToUseStep2: 'वर्तमान उगाने का मौसम चुनें',
    howToUseStep3: 'व्यक्तिगत सिफारिशें प्राप्त करें',
    selectAllFields: 'कृपया सलाह प्राप्त करने के लिए सभी फ़ील्ड चुनें',
    advisoryLoaded: 'सलाह सफलतापूर्वक लोड की गई',
    
    // Crops
    rice: 'धान',
    wheat: 'गेहूं',
    cotton: 'कपास',
    pulses: 'दालें',
    vegetables: 'सब्जियां',
    fruits: 'फल',
    onion: 'प्याज',
    tomato: 'टमाटर',
    potato: 'आलू',
    
    // Seasons
    kharif: 'खरीफ (मानसून)',
    rabi: 'रबी (सर्दी)',
    zaid: 'जायद (गर्मी)',
    
    // States
    punjab: 'पंजाब',
    'uttar-pradesh': 'उत्तर प्रदेश',
    'madhya-pradesh': 'मध्य प्रदेश',
    
    // Cities
    Delhi: 'दिल्ली',
    Mumbai: 'मुंबई',
    Bangalore: 'बैंगलोर',
    Chennai: 'चेन्नई',
    Kolkata: 'कोलकाता',
    Hyderabad: 'हैदराबाद',
    
    // Daily Advice
    todaysAdvice: 'आज की सलाह',
    dailyAdvice: 'आज सिंचाई से पहले मिट्टी की नमी की जांच करने पर विचार करें',
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translate = (key: string): string => {
    // First check if it's a state name
    if (stateTranslations[language]?.[key]) {
      return stateTranslations[language][key];
    }
    // Then check regular translations
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
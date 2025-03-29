import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLanguage } from '@/contexts/LanguageContext';

// Initialize the Google Generative AI with the provided API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Get the specific model (using the correct model name)
const model = genAI.getGenerativeModel({ 
  model: "gemini-pro",
  generationConfig: {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  },
});

export interface CropAdvice {
  irrigation: string;
  pestControl: string;
  fertilizers: string;
}

export const generateCropAdvice = async (
  crop: string,
  region: string,
  season: string,
  language: string = 'en'
): Promise<CropAdvice> => {
  try {
    console.log(`Generating advice for ${crop} in ${region} during ${season} season in ${language}`);
    
    // Create a detailed, structured prompt for specific advice
    const prompt = language === 'hi' 
      ? `आप एक कृषि विशेषज्ञ हैं जो ${region} में ${season} मौसम के दौरान ${crop} की खेती के लिए सलाह प्रदान कर रहे हैं।

कृपया तीन विशिष्ट, कार्रवाई योग्य सलाह दें:
1. सिंचाई के बारे में एक पंक्ति (विशिष्ट पानी की मात्रा या समय शामिल करें)
2. कीट नियंत्रण के बारे में एक पंक्ति (विशिष्ट कीटों और उपचारों का उल्लेख करें)
3. उर्वरकों के बारे में एक पंक्ति (विशिष्ट मात्रा और समय शामिल करें)

प्रत्येक पंक्ति ${crop} के लिए विशिष्ट होनी चाहिए, मापने योग्य मीट्रिक्स होने चाहिए, और ${region} की ${season} परिस्थितियों पर विचार करना चाहिए।
अपनी प्रतिक्रिया में लाइन नंबर या लेबल शामिल न करें।
कोई अतिरिक्त टेक्स्ट न जोड़ें।
बस ठीक 3 लाइनों की सलाह दें।`
      : `You are an agricultural expert providing advice for ${crop} cultivation in ${region} during the ${season} season.

Please provide exactly three lines of specific, actionable advice:
1. One line about irrigation (include specific water quantities or timing)
2. One line about pest control (mention specific pests and treatments)
3. One line about fertilizers (include specific quantities and timing)

Each line should be specific to ${crop}, contain measurable metrics, and consider ${region}'s ${season} conditions.
DO NOT include line numbers or labels in your response.
DO NOT add any extra text.
Just provide exactly 3 lines of advice.`;

    console.log('Sending prompt to AI:', prompt);

    // Generate content with safety settings
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
    });

    const response = await result.response;
    const text = response.text();
    
    console.log('Raw AI response:', text);
    
    // Split and clean the response
    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 3); // Ensure we only get 3 lines

    console.log('Processed lines:', lines);

    if (lines.length !== 3) {
      console.error('Invalid number of lines in response:', lines.length);
      throw new Error('Invalid response format from AI');
    }

    const advice = {
      irrigation: lines[0],
      pestControl: lines[1],
      fertilizers: lines[2]
    };

    console.log('Final advice:', advice);
    return advice;

  } catch (error) {
    console.error('Error generating crop advice:', error);
    
    // Return crop-specific fallback advice in the selected language
    return language === 'hi' ? {
      irrigation: `मिट्टी की नमी और मौसम की स्थिति के आधार पर ${crop} को नियमित रूप से पानी दें।`,
      pestControl: `${season} के दौरान विशेष रूप से ${crop} में आम कीटों और बीमारियों की निगरानी करें।`,
      fertilizers: `${crop} की वृद्धि के चरण के लिए उपयुक्त संतुलित उर्वरक लगाएं।`
    } : {
      irrigation: `Water ${crop} regularly based on soil moisture levels and weather conditions.`,
      pestControl: `Monitor ${crop} for common pests and diseases, especially during ${season}.`,
      fertilizers: `Apply balanced fertilizers suitable for ${crop} growth stage.`
    };
  }
}; 
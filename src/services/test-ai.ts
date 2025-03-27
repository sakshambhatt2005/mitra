import { GoogleGenerativeAI } from '@google/generative-ai';

// Test function to verify AI integration
export async function testAIIntegration() {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyA38elxZFKPzTs6tFxVa1tHytMf0Zu6D-Y");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: "Hello, are you working?" }]}]
    });
    
    console.log('AI Response:', result.response.text());
    return true;
  } catch (error) {
    console.error('AI Integration Test Error:', error);
    return false;
  }
} 
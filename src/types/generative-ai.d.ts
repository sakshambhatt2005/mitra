declare module '@google/generative-ai' {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(config: { model: string; generationConfig?: any }): GenerativeModel;
  }

  export class GenerativeModel {
    generateContent(request: {
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
    }): Promise<GenerateContentResult>;
  }

  export interface GenerateContentResult {
    response: {
      text(): string;
    };
  }
} 
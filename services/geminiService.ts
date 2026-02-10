
import { GoogleGenAI, Type } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Analyzes a story to detect harmful content and generate educational insights.
   */
  async analyzeStory(content: string) {
    if (!process.env.API_KEY) {
      console.warn("API Key missing, skipping AI analysis.");
      return null;
    }

    try {
      // Using gemini-3-flash-preview as recommended for basic text tasks
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following story shared for educational purposes. 
        Determine if it contains harmful, toxic, or illegal content (not just 18+ content, but truly harmful content).
        Then, extract educational insights for the readers.
        
        Story: ${content}
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isHarmful: { type: Type.BOOLEAN, description: "True if content is toxic, abusive, or promotes harm." },
              harmReason: { type: Type.STRING, description: "Reason for flagging if harmful." },
              insights: {
                type: Type.OBJECT,
                properties: {
                  keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
                  mistakesToAvoid: { type: Type.ARRAY, items: { type: Type.STRING } },
                  futureAdvice: { type: Type.STRING }
                },
                required: ["keyTakeaways", "mistakesToAvoid", "futureAdvice"]
              }
            },
            required: ["isHarmful", "insights"]
          }
        }
      });

      // Extract text output using the .text property as per guidelines
      const text = response.text;
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error("Gemini analysis failed:", error);
      return null;
    }
  },

  async moderateComment(text: string): Promise<{ isToxic: boolean }> {
    if (!process.env.API_KEY) return { isToxic: false };

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Determine if this comment is toxic, abusive, or harmful: "${text}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isToxic: { type: Type.BOOLEAN }
            },
            required: ["isToxic"]
          }
        }
      });
      // Extract text output using the .text property as per guidelines
      const resultText = response.text;
      return resultText ? JSON.parse(resultText) : { isToxic: false };
    } catch {
      return { isToxic: false };
    }
  }
};

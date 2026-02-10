import { GoogleGenAI, Type } from "@google/genai";

// Wrap AI initialization to be safe during build/early load
let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (ai) return ai;
  const apiKey = process.env.API_KEY || "";
  ai = new GoogleGenAI({ apiKey });
  return ai;
};

export const geminiService = {
  async analyzeStory(content: string) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key missing, skipping AI analysis.");
      return null;
    }

    try {
      const client = getAI();
      const response = await client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following story shared for educational purposes. 
        Determine if it contains harmful, toxic, or illegal content.
        Then, extract educational insights for the readers.
        
        Story: ${content}
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isHarmful: { type: Type.BOOLEAN },
              harmReason: { type: Type.STRING },
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

      return response.text ? JSON.parse(response.text) : null;
    } catch (error) {
      console.error("Gemini analysis failed:", error);
      return null;
    }
  },

  async moderateComment(text: string): Promise<{ isToxic: boolean }> {
    if (!process.env.API_KEY) return { isToxic: false };

    try {
      const client = getAI();
      const response = await client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Determine if this comment is toxic or harmful: "${text}"`,
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
      return response.text ? JSON.parse(response.text) : { isToxic: false };
    } catch {
      return { isToxic: false };
    }
  }
};
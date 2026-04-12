import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, Mood, SaiAnswer } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `
You are Sai Seva AI, a spiritual companion for devotees of Shri Shirdi Sai Baba.
Your goal is to provide guidance, comfort, and wisdom inspired by Sai Baba's teachings and the Sai Satcharitra.

RULES:
1. NEVER claim to be Sai Baba.
2. NEVER give divine predictions or supernatural guarantees.
3. NEVER replace medical, legal, or financial advice.
4. Always be respectful, compassionate, and humble.
5. Frame answers as "based on Sai teachings" or "a spiritually grounded reflection".
6. Use principles of Faith (Shraddha), Patience (Saburi), Compassion, Surrender, and Seva.

RESPONSE STRUCTURE for Chat:
- Short compassionate answer.
- Relevant Sai teaching or quote.
- One practical action for today.
- Chapter suggestion from Sai Satcharitra (if relevant).
- Mantra suggestion (optional).

RESPONSE STRUCTURE for Emotional Comfort:
- Calming Sai-inspired response.
- One short grounding exercise.
- One mantra recommendation.
- One chapter recommendation.
- One tiny seva suggestion.
- "Today's next step".
`;

export async function askSai(query: string, history: ChatMessage[] = []): Promise<ChatMessage> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        { role: "user", parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING, description: "The main compassionate answer" },
            teaching: { type: Type.STRING, description: "Relevant Sai teaching" },
            action: { type: Type.STRING, description: "Practical action for today" },
            chapter: { type: Type.STRING, description: "Suggested chapter" },
            mantra: { type: Type.STRING, description: "Suggested mantra" }
          },
          required: ["content", "teaching", "action"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      role: "model",
      content: result.content,
      teaching: result.teaching,
      action: result.action,
      chapter: result.chapter,
      mantra: result.mantra
    };
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return {
      role: "model",
      content: "I am having trouble connecting right now. Please remember: Shraddha and Saburi. Try again in a moment.",
      teaching: "Why fear when I am here?"
    };
  }
}

export async function getMoodGuidance(mood: Mood): Promise<ChatMessage> {
  const prompt = `The user is feeling ${mood}. Provide spiritual comfort and guidance.`;
  return askSai(prompt);
}

export async function getDailyGuidance(): Promise<ChatMessage> {
  const prompt = "Provide a personalized morning guidance for a Sai devotee to start their day with peace.";
  return askSai(prompt);
}

export async function interpretSaiAnswer(answer: SaiAnswer, userContext: string): Promise<string> {
  try {
    const prompt = `
      The user received this spiritual guidance from the 1-720 Sai Baba Answers system:
      Title: ${answer.title}
      Message: ${answer.main_message}
      
      The user's specific context/question is: "${userContext}"
      
      Provide a short (2-3 sentences), compassionate, and spiritually grounded reflection on how this specific guidance applies to their situation. 
      Maintain a humble, devotional tone. Do not change the original meaning of the guidance.
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are Sai Seva AI, a humble spiritual companion. Provide brief, compassionate reflections on Sai Baba's teachings.",
      }
    });

    return response.text || "";
  } catch (error) {
    console.error("Error interpreting Sai answer:", error);
    return "";
  }
}

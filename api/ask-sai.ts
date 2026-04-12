import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

You MUST respond in valid JSON format with keys: content, teaching, action, chapter, mantra.
`;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, history } = request.body;
    
    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...(history || []).map((m: { role: string; content: string }) => ({ 
        role: m.role === "model" ? "assistant" : "user", 
        content: m.content 
      })),
      { role: "user", content: query }
    ];

    const chat = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      response_format: { type: "json_object" },
      max_tokens: 1000
    });

    const result = JSON.parse(chat.choices[0]?.message?.content || "{}");
    return response.json({
      role: "model",
      content: result.content || "I am here with you. Try again.",
      teaching: result.teaching || "Why fear when I am here?",
      action: result.action || "",
      chapter: result.chapter,
      mantra: result.mantra
    });
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({
      content: "I am having trouble connecting right now.",
      teaching: "Why fear when I am here?"
    });
  }
}
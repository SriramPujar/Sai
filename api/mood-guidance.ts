import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_INSTRUCTION = `
You are Sai Seva AI, a spiritual companion for devotees of Shri Shirdi Sai Baba.
Provide spiritual comfort and guidance.
Respond in JSON format with keys: content, teaching, action, chapter, mantra.
`;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mood } = request.body;
    const prompt = `The user is feeling ${mood}. Provide spiritual comfort and guidance.`;
    
    const chat = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
      max_tokens: 1000
    });

    const result = JSON.parse(chat.choices[0]?.message?.content || "{}");
    return response.json({
      role: "model",
      content: result.content || "",
      teaching: result.teaching || "",
      action: result.action || "",
      chapter: result.chapter,
      mantra: result.mantra
    });
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ content: "", teaching: "Why fear when I am here?" });
  }
}
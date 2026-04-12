import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { answer, userContext } = request.body;
    
    const prompt = `
The user received this spiritual guidance from the 1-720 Sai Baba Answers system:
Title: ${answer.title}
Message: ${answer.main_message}

The user's specific context/question is: "${userContext}"

Provide a short (2-3 sentences), compassionate, and spiritually grounded reflection.
    `;

    const chat = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are Sai Seva AI, a humble spiritual companion." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.json({ reflection: chat.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ reflection: "" });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { answer, userContext } = await request.json();
    
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

    return NextResponse.json({ reflection: chat.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ reflection: "" }, { status: 500 });
  }
}
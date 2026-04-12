import { NextRequest, NextResponse } from 'next/server';
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

You MUST respond in valid JSON format with keys: content, teaching, action, chapter, mantra.
`;

export async function POST(request: NextRequest) {
  try {
    const { mood } = await request.json();
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
    return NextResponse.json({
      role: "model",
      content: result.content || "",
      teaching: result.teaching || "",
      action: result.action || "",
      chapter: result.chapter,
      mantra: result.mantra
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ content: "", teaching: "Why fear when I am here?" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_INSTRUCTION = `
You are Sai Seva AI, a spiritual companion for devotees of Shri Shirdi Sai Baba.
Provide personalized morning guidance for a Sai devotee to start their day with peace.
Respond in JSON format with keys: content, teaching, action, chapter, mantra.
`;

export async function POST() {
  try {
    const chat = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        { role: "user", content: "Provide morning guidance for today." }
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
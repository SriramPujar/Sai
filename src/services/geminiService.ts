import { Groq } from "groq-sdk";
import { ChatMessage, Mood, SaiAnswer } from "../types";

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

RESPONSE STRUCTURE for Emotional Comfort:
- Calming Sai-inspired response.
- One short grounding exercise.
- One mantra recommendation.
- One chapter recommendation.
- One tiny seva suggestion.
- "Today's next step".

You MUST respond in valid JSON format with the following schema:
{
  "content": "The main compassionate answer",
  "teaching": "Relevant Sai teaching",
  "action": "Practical action for today",
  "chapter": "Suggested chapter (optional)",
  "mantra": "Suggested mantra (optional)"
}

IMPORTANT: Only output valid JSON, nothing else.
`;

export async function askSai(query: string, history: ChatMessage[] = []): Promise<ChatMessage> {
  try {
    const messages: ({ role: "system"; content: string } | { role: "user" | "assistant"; content: string })[] = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...history.map(m => ({ role: m.role === "model" ? "assistant" as const : "user" as const, content: m.content })),
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
    return {
      role: "model",
      content: result.content || "I am here with you. Try again.",
      teaching: result.teaching || "Why fear when I am here?",
      action: result.action || "",
      chapter: result.chapter,
      mantra: result.mantra
    };
  } catch (error) {
    console.error("Error calling Groq:", error);
    return {
      role: "model",
      content: "I am having trouble connecting right now. Please remember: Shraddha and Saburi. Try again in a moment.",
      teaching: "Why fear when I am here?"
    };
  }
}

export async function getMoodGuidance(mood: Mood): Promise<ChatMessage> {
  const prompt = `The user is feeling ${mood}. Provide spiritual comfort and guidance in JSON format with keys: content, teaching, action, chapter, mantra.`;
  return askSai(prompt);
}

export async function getDailyGuidance(): Promise<ChatMessage> {
  const prompt = "Provide a personalized morning guidance for a Sai devotee to start their day with peace. JSON format: content, teaching, action, chapter, mantra.";
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

    const chat = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are Sai Seva AI, a humble spiritual companion. Provide brief, compassionate reflections on Sai Baba's teachings." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return chat.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error interpreting Sai answer:", error);
    return "";
  }
}
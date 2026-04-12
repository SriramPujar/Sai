import { ChatMessage, Mood, SaiAnswer } from "../types";

const API_BASE = '';

export async function askSai(query: string, history: ChatMessage[] = []): Promise<ChatMessage> {
  try {
    const response = await fetch(`${API_BASE}/api/ask-sai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, history })
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling API:", error);
    return {
      role: "model",
      content: "I am having trouble connecting right now. Please remember: Shraddha and Saburi. Try again in a moment.",
      teaching: "Why fear when I am here?"
    };
  }
}

export async function getMoodGuidance(mood: Mood): Promise<ChatMessage> {
  try {
    const response = await fetch(`${API_BASE}/api/mood-guidance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood })
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { role: "model", content: "", teaching: "Why fear when I am here?" };
  }
}

export async function getDailyGuidance(): Promise<ChatMessage> {
  try {
    const response = await fetch(`${API_BASE}/api/daily-guidance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { role: "model", content: "", teaching: "Why fear when I am here?" };
  }
}

export async function interpretSaiAnswer(answer: SaiAnswer, userContext: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/api/interpret-answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer, userContext })
    });
    const result = await response.json();
    return result.reflection;
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
}
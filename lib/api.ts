// API layer — calls the School of Athens Railway proxy server
// The SoA server expects OpenAI format: {messages: [{role, content}]}

import { ChatMessage } from "./store";
import { buildSystemPrompt, CHARACTERS } from "./characters";

const API_BASE = "https://school-of-athens-proxy.up.railway.app";

interface ChatResponse {
  content: string;
}

interface ChatError {
  error: string;
}

// Send a message and get AI response
export async function sendChatMessage(
  characterId: string,
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  const character = CHARACTERS[characterId];
  if (!character) throw new Error(`Unknown character: ${characterId}`);

  const systemPrompt = buildSystemPrompt(character);

  // Build messages array in OpenAI format (system + history + user message)
  const messages: { role: string; content: string }[] = [
    { role: "system", content: systemPrompt },
  ];

  // Add conversation history
  for (const msg of history) {
    messages.push({ role: msg.role, content: msg.content });
  }

  // Add the new user message
  messages.push({ role: "user", content: userMessage });

  const response = await fetch(`${API_BASE}/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages,
      temperature: 0.85,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    try {
      const errorData: ChatError = await response.json();
      throw new Error(errorData.error || `Server error (${response.status})`);
    } catch (e) {
      if (e instanceof Error && e.message !== `Server error (${response.status})`) {
        throw e;
      }
      throw new Error(`Server error (${response.status})`);
    }
  }

  const data: ChatResponse = await response.json();

  if (!data.content) {
    throw new Error("Empty response from server");
  }

  return data.content;
}

// Health check
export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

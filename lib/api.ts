// API layer — calls the School of Athens Railway proxy server
// The SoA server expects OpenAI-format messages (system + history + user in one array)

import { ChatMessage } from "./store";
import { buildSystemPrompt, CHARACTERS } from "./characters";

const API_BASE = "https://attractive-learning-production-e561.up.railway.app";

interface ChatResponse {
  content: string;
}

interface ChatError {
  error: string;
}

export async function sendChatMessage(
  characterId: string,
  userMessage: string,
  history: ChatMessage[],
  subscriptionKey?: string
): Promise<string> {
  const character = CHARACTERS[characterId];
  if (!character) throw new Error(`Unknown character: ${characterId}`);

  const systemPrompt = buildSystemPrompt(character);

  // Build OpenAI-format messages array: system + history + user
  const messages: { role: string; content: string }[] = [
    { role: "system", content: systemPrompt },
  ];

  for (const msg of history) {
    messages.push({ role: msg.role, content: msg.content });
  }

  messages.push({ role: "user", content: userMessage });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (subscriptionKey) {
    headers["Authorization"] = `Bearer ${subscriptionKey}`;
  }

  const response = await fetch(`${API_BASE}/v1/chat`, {
    method: "POST",
    headers,
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

export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

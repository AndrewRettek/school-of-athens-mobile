// Zustand store with AsyncStorage persistence

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// A single chat message
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

// Per-character chat history
export interface ChatHistory {
  messages: ChatMessage[];
}

interface AppState {
  // Chat histories keyed by character id
  chatHistories: Record<string, ChatHistory>;
  addMessage: (characterId: string, message: ChatMessage) => void;
  clearChat: (characterId: string) => void;
  getLastMessage: (characterId: string) => ChatMessage | null;
}

// Max messages per character to keep storage manageable
const MAX_MESSAGES = 200;

// Generate a simple unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export { generateId };

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      chatHistories: {},

      addMessage: (characterId: string, message: ChatMessage) =>
        set((state) => {
          const history = state.chatHistories[characterId] || { messages: [] };
          const updated = [...history.messages, message];
          const trimmed =
            updated.length > MAX_MESSAGES
              ? updated.slice(updated.length - MAX_MESSAGES)
              : updated;
          return {
            chatHistories: {
              ...state.chatHistories,
              [characterId]: { messages: trimmed },
            },
          };
        }),

      clearChat: (characterId: string) =>
        set((state) => ({
          chatHistories: {
            ...state.chatHistories,
            [characterId]: { messages: [] },
          },
        })),

      getLastMessage: (characterId: string) => {
        const history = get().chatHistories[characterId];
        if (!history || history.messages.length === 0) return null;
        return history.messages[history.messages.length - 1];
      },
    }),
    {
      name: "school-of-athens-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

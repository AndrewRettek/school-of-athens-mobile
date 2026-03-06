// Chat screen — messages, input, typing indicator

import { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../../lib/theme";
import { CHARACTERS } from "../../lib/characters";
import { useAppStore, generateId, ChatMessage } from "../../lib/store";
import { sendChatMessage } from "../../lib/api";
import ChatHeader from "../../components/ChatHeader";
import ChatBubble from "../../components/ChatBubble";
import TypingIndicator from "../../components/TypingIndicator";
import MessageInput from "../../components/MessageInput";

export default function ChatScreen() {
  const { characterId } = useLocalSearchParams<{ characterId: string }>();
  const character = CHARACTERS[characterId!];

  const messages =
    useAppStore((s) => s.chatHistories[characterId!]?.messages) || [];
  const addMessage = useAppStore((s) => s.addMessage);
  const clearChat = useAppStore((s) => s.clearChat);

  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, isTyping]);

  const handleSend = useCallback(
    async (text: string) => {
      // Add player message
      const playerMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text,
        timestamp: Date.now(),
      };
      addMessage(characterId!, playerMsg);

      // Show typing indicator and call API
      setIsTyping(true);

      try {
        // Get current history including the new player message
        const currentHistory = [
          ...(useAppStore.getState().chatHistories[characterId!]?.messages || []),
        ];

        const response = await sendChatMessage(
          characterId!,
          text,
          // Send all messages except the latest user message — it's included separately
          currentHistory.slice(0, -1)
        );

        // Add AI response
        const aiMsg: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: response,
          timestamp: Date.now(),
        };
        addMessage(characterId!, aiMsg);
      } catch (error) {
        const errMsg =
          error instanceof Error ? error.message : "Something went wrong";
        Alert.alert("Error", errMsg);
      } finally {
        setIsTyping(false);
      }
    },
    [characterId, addMessage]
  );

  const handleReset = useCallback(() => {
    clearChat(characterId!);
  }, [characterId, clearChat]);

  if (!character) return null;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ChatHeader
        character={character}
        isTyping={isTyping}
        onReset={handleReset}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Message list */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble message={item} characterId={characterId!} />
          )}
          contentContainerStyle={styles.messageList}
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
          }
        />

        {/* Input bar */}
        <SafeAreaView edges={["bottom"]} style={styles.inputSafe}>
          <MessageInput onSend={handleSend} disabled={isTyping} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  messageList: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  inputSafe: {
    backgroundColor: Colors.inputBar,
  },
});

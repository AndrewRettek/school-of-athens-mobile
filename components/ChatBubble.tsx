// Chat message bubble — player (right, gold) or philosopher (left, dark)

import { View, Text, Image, StyleSheet } from "react-native";
import { Colors, Fonts } from "../lib/theme";
import { ChatMessage } from "../lib/store";
import { AVATARS } from "../lib/characters";

interface Props {
  message: ChatMessage;
  characterId: string;
}

export default function ChatBubble({ message, characterId }: Props) {
  const isPlayer = message.role === "user";

  const timeStr = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <View
      style={[styles.row, isPlayer ? styles.rowRight : styles.rowLeft]}
    >
      {/* Philosopher avatar on the left for NPC messages */}
      {!isPlayer && (
        <Image source={AVATARS[characterId]} style={styles.avatar} />
      )}
      <View style={styles.bubbleWrapper}>
        <View
          style={[
            styles.bubble,
            isPlayer ? styles.bubblePlayer : styles.bubbleNpc,
          ]}
        >
          <Text
            style={[
              styles.text,
              isPlayer ? styles.textPlayer : styles.textNpc,
            ]}
          >
            {message.content}
          </Text>
        </View>
        <Text
          style={[
            styles.timestamp,
            isPlayer ? styles.timestampRight : styles.timestampLeft,
          ]}
        >
          {timeStr}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  rowLeft: {
    justifyContent: "flex-start",
  },
  rowRight: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 4,
  },
  bubbleWrapper: {
    maxWidth: "75%",
  },
  bubble: {
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  bubblePlayer: {
    backgroundColor: Colors.bubblePlayer,
    borderBottomRightRadius: 4,
  },
  bubbleNpc: {
    backgroundColor: Colors.bubbleNpc,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    lineHeight: 21,
  },
  textPlayer: {
    color: Colors.textPlayer,
  },
  textNpc: {
    color: Colors.textNpc,
  },
  timestamp: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.timestamp,
    marginTop: 3,
  },
  timestampLeft: {
    textAlign: "left",
    marginLeft: 4,
  },
  timestampRight: {
    textAlign: "right",
    marginRight: 4,
  },
});

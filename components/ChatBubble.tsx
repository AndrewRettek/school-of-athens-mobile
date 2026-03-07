// Chat message bubble — player (right, bronze) or philosopher (left, dark marble)

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
    <View style={[styles.row, isPlayer ? styles.rowRight : styles.rowLeft]}>
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
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowLeft: {
    justifyContent: "flex-start",
  },
  rowRight: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
  },
  bubbleWrapper: {
    maxWidth: "75%",
  },
  bubble: {
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  bubblePlayer: {
    backgroundColor: Colors.bubblePlayer,
    borderBottomRightRadius: 4,
  },
  bubbleNpc: {
    backgroundColor: Colors.bubbleNpc,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 22,
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
    marginTop: 4,
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

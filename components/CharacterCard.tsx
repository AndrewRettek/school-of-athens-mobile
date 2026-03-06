// Tappable philosopher card with avatar, name, last message preview

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Fonts } from "../lib/theme";
import { Character, AVATARS } from "../lib/characters";
import { useAppStore } from "../lib/store";

interface Props {
  character: Character;
  onPress: () => void;
}

export default function CharacterCard({ character, onPress }: Props) {
  const lastMessage = useAppStore((s) => s.getLastMessage(character.id));

  const preview = lastMessage
    ? lastMessage.role === "user"
      ? `You: ${lastMessage.content}`
      : lastMessage.content
    : "Tap to start chatting";

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: character.accentColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={AVATARS[character.id]} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.preview} numberOfLines={1}>
          {preview}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    color: Colors.cardText,
    marginBottom: 3,
  },
  preview: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.cardPreview,
  },
});

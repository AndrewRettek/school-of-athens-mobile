// Tappable philosopher card with avatar, name, epithet, last message preview

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
    : "Tap to begin a dialogue";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarRing}>
        <Image source={AVATARS[character.id]} style={styles.avatar} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.epithet}>{character.epithet}</Text>
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    padding: 16,
    marginBottom: 12,
  },
  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: Colors.gold,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: Colors.cardText,
    marginBottom: 2,
  },
  epithet: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.gold,
    fontStyle: "italic",
    marginBottom: 4,
  },
  preview: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.cardPreview,
  },
});

// Chat screen header — back button, avatar, name, status, reset button

import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors, Fonts } from "../lib/theme";
import { Character, AVATARS } from "../lib/characters";

interface Props {
  character: Character;
  isTyping: boolean;
  onReset: () => void;
}

export default function ChatHeader({ character, isTyping, onReset }: Props) {
  const handleReset = () => {
    Alert.alert(
      "Clear Chat",
      `Delete all messages with ${character.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: onReset },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={28} color={Colors.white} />
      </TouchableOpacity>

      <Image source={AVATARS[character.id]} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text
          style={[
            styles.status,
            isTyping && { color: character.accentColor },
          ]}
        >
          {isTyping ? "Typing..." : "Online"}
        </Text>
      </View>

      <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
        <Ionicons name="trash-outline" size={22} color={Colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.header,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backBtn: {
    padding: 4,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginLeft: 4,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    color: Colors.white,
  },
  status: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
  },
  resetBtn: {
    padding: 8,
  },
});

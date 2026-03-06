// Settings screen — app info, clear all chats

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../lib/theme";
import { useAppStore } from "../lib/store";
import { CHARACTER_LIST } from "../lib/characters";

export default function SettingsScreen() {
  const clearChat = useAppStore((s) => s.clearChat);

  const handleClearAll = () => {
    Alert.alert("Clear All Chats", "Delete all conversation history?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: () => {
          CHARACTER_LIST.forEach((c) => clearChat(c.id));
          Alert.alert("Done", "All conversations cleared.");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Data</Text>

        <TouchableOpacity style={styles.dangerButton} onPress={handleClearAll}>
          <Ionicons name="trash-outline" size={20} color="#e74c3c" />
          <Text style={styles.dangerButtonText}>Clear All Conversations</Text>
        </TouchableOpacity>

        {/* App info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>School of Athens Mobile v1.0.0</Text>
          <Text style={styles.appInfoText}>
            Powered by DeepSeek via Railway
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: Colors.white,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.white,
    marginBottom: 16,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 10,
  },
  dangerButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: "#e74c3c",
  },
  appInfo: {
    marginTop: 40,
    alignItems: "center",
  },
  appInfoText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 4,
  },
});

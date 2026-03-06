// Settings screen — subscription key management

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../lib/theme";
import { useAppStore } from "../lib/store";

export default function SettingsScreen() {
  const subscriptionKey = useAppStore((s) => s.subscriptionKey);
  const setSubscriptionKey = useAppStore((s) => s.setSubscriptionKey);
  const clearSubscriptionKey = useAppStore((s) => s.clearSubscriptionKey);

  const [newKey, setNewKey] = useState("");

  const maskedKey = subscriptionKey
    ? subscriptionKey.slice(0, 4) + "..." + subscriptionKey.slice(-4)
    : "Not set";

  const handleSave = () => {
    const trimmed = newKey.trim();
    if (!trimmed) return;
    setSubscriptionKey(trimmed);
    setNewKey("");
    Alert.alert("Saved", "Subscription key updated.");
  };

  const handleClear = () => {
    Alert.alert("Clear Key", "Remove your subscription key?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          clearSubscriptionKey();
          Alert.alert("Cleared", "Subscription key removed.");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Subscription Key</Text>
        <Text style={styles.label}>Current key</Text>
        <Text style={styles.value}>{maskedKey}</Text>

        <Text style={[styles.label, { marginTop: 16 }]}>Enter new key</Text>
        <TextInput
          style={styles.input}
          value={newKey}
          onChangeText={setNewKey}
          placeholder="Paste subscription key..."
          placeholderTextColor={Colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, !newKey.trim() && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={!newKey.trim()}
          >
            <Text style={styles.buttonText}>Save Key</Text>
          </TouchableOpacity>

          {subscriptionKey ? (
            <TouchableOpacity
              style={[styles.button, styles.buttonDanger]}
              onPress={handleClear}
            >
              <Text style={styles.buttonText}>Clear Key</Text>
            </TouchableOpacity>
          ) : null}
        </View>

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
  label: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 6,
  },
  value: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.white,
  },
  input: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.white,
    backgroundColor: Colors.card,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonDanger: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: "#1a1510",
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

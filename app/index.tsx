// Home screen — philosopher selection

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "../lib/theme";
import { CHARACTER_LIST } from "../lib/characters";
import CharacterCard from "../components/CharacterCard";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.titleAccent}>🏛️</Text>
          <Text style={styles.title}>School of Athens</Text>
          <Text style={styles.titleAccent}>🏛️</Text>
        </View>
        <Text style={styles.subtitle}>Converse with the great minds of Athens</Text>
        <View style={styles.goldLine} />
      </View>

      <FlatList
        data={CHARACTER_LIST}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => router.push(`/chat/${item.id}`)}
          />
        )}
      />

      <TouchableOpacity
        style={styles.settingsBtn}
        onPress={() => router.push("/settings")}
      >
        <Ionicons name="settings-outline" size={22} color={Colors.textMuted} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  titleBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titleAccent: {
    fontSize: 22,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.gold,
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 6,
    fontStyle: "italic",
  },
  goldLine: {
    width: 120,
    height: 2,
    backgroundColor: Colors.goldBorder,
    marginTop: 14,
    borderRadius: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  settingsBtn: {
    position: "absolute",
    top: 58,
    right: 20,
    padding: 4,
  },
});

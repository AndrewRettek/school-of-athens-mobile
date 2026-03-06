// Home screen — philosopher list (no age gate needed)

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>School of Athens</Text>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={24} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Philosopher list */}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    color: Colors.white,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

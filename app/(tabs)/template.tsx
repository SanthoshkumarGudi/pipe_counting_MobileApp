// app/(tabs)/template.tsx

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { api } from "@/services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

interface Template {
  _id?: string;
  name: string;
  image: string;
  comingSoon: boolean;
}

export default function TemplateScreen() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filtered, setFiltered] = useState<Template[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await SecureStore.getItemAsync("authToken");

      const response = await api.get("/templates", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      setTemplates(data);
      setFiltered(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load templates. Pull down to retry.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTemplates();
    }, [fetchTemplates])
  );

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(templates);
      return;
    }

    const lowerSearch = search.toLowerCase();

    const results = templates.filter((t) =>
      t.name.toLowerCase().includes(lowerSearch)
    );

    setFiltered(results);
  }, [search, templates]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTemplates();
  };

  const renderItem = ({ item }: { item: Template }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (!item.comingSoon) {
          router.push({
            pathname: "/image-select",
            params: {
              templateName: item.name,
              templateImage: item.image,
            },
          });
        }
      }}
      activeOpacity={item.comingSoon ? 1 : 0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />

        {item.comingSoon && (
          <View style={styles.comingSoonOverlay}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        )}
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Templates</Text>

        <TextInput
          placeholder="Search templates..."
          placeholderTextColor={theme.gray}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          autoCapitalize="none"
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={{ marginTop: 100 }}
        />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item._id || item.name}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.empty}>
              {search ? "No matching templates" : "No templates available"}
            </Text>
          }
        />
      )}

      <Text style={styles.footer}>
        Metal Products • More categories coming soon
      </Text>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    header: {
      paddingLeft: 30,
      paddingTop: 45,
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },

    title: {
      fontSize: 26,
      fontWeight: "700",
      marginBottom: 5,
      color: theme.text,
    },

    searchInput: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 12,
      fontSize: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
    },

    list: { padding: 8 },

    row: { justifyContent: "space-between" },

    card: {
      width: cardWidth,
      margin: 8,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: theme.card,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },

    imageContainer: {
      position: "relative",
      backgroundColor: theme.card,
    },

    cardImage: {
      width: "100%",
      height: cardWidth * 1.1,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },

    comingSoonOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.55)",
      justifyContent: "center",
      alignItems: "center",
    },

    comingSoonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },

    cardInfo: {
      padding: 12,
      alignItems: "center",
    },

    cardTitle: {
      fontSize: 15,
      fontWeight: "600",
      textAlign: "center",
      color: theme.text,
    },

    empty: {
      textAlign: "center",
      marginTop: 80,
      fontSize: 16,
      color: theme.gray,
    },

    error: {
      textAlign: "center",
      marginTop: 80,
      fontSize: 16,
      color: theme.error,
      paddingHorizontal: 40,
    },

    footer: {
      textAlign: "center",
      padding: 16,
      color: theme.gray,
      fontSize: 14,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.card,
    },
  });
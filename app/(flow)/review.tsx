// app/review.tsx

import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ReviewScreen() {
  const { imageUri, count } = useLocalSearchParams<{
    imageUri: string;
    count: string;
  }>();

  const [adjustCount, setAdjustCount] = useState(Number(count));

  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);

  const handleAdd = () => {
    setAdjustCount((prev) => prev + 1);
  };

  const handleRemove = () => {
    setAdjustCount((prev) => prev - 1);
  };

  const goBack = () => router.back();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={goBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={theme.text} />
          </Pressable>
          <Text style={styles.title}>Review</Text>
          <View style={{ width: 40 }} />
        </View>
        {/* Result */}
        <Text style={styles.resultText}>Result : {adjustCount}</Text>

        {/* Image */}
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.mainImage}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.noImageText}>No image available</Text>
          )}
        </View>

        {/* Correction */}
        <View style={styles.correctionContainer}>
          <Text style={styles.correctionLabel}>Correction</Text>

          <View style={styles.countControls}>
            <Pressable style={styles.countButtonSmall} onPress={handleAdd}>
              <Text style={styles.countButtonTextSmall}>ADD COUNT</Text>
              <Text style={styles.plusMinus}>+</Text>
            </Pressable>

            <Pressable
              style={[styles.countButtonSmall, styles.removeButton]}
              onPress={handleRemove}
            >
              <Text style={styles.countButtonTextSmall}>REMOVE COUNT</Text>
              <Text style={styles.plusMinus}>-</Text>
            </Pressable>
          </View>
        </View>

        {/* Bottom bar */}
        <View style={styles.bottomBar}>
          <Pressable style={styles.bottomItem}>
            <Ionicons name="sparkles-outline" size={24} color={theme.gray} />
            <Text style={styles.bottomLabel}>Correction</Text>
          </Pressable>

          <Pressable style={styles.bottomItem}>
            <Ionicons name="grid-outline" size={24} color={theme.gray} />
            <Text style={styles.bottomLabel}>Tool</Text>
          </Pressable>

          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </Pressable>

          <Pressable style={styles.bottomItem}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={theme.gray}
            />
            <Text style={styles.bottomLabel}>Form</Text>
          </Pressable>

          <Pressable style={styles.bottomItem} onPress={() => router.push("/")}>
            <Ionicons name="camera-outline" size={24} color={theme.gray} />
            <Text style={styles.bottomLabel}>New Photo</Text>
          </Pressable>
        </View>

        {/* Success banner */}
        <View style={styles.successBanner}>
          <Text style={styles.successText}>Process Success</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },

    container: {
      flex: 1,
      paddingHorizontal: 16,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8,
      marginBottom: 12,
    },

    backButton: {
      padding: 8,
    },

    title: {
      fontSize: 22,
      fontWeight: "600",
      color: theme.text,
    },

    resultText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.primary,
      textAlign: "center",
      marginBottom: 16,
    },

    imageContainer: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 12,
      overflow: "hidden",
      marginBottom: 16,
    },

    mainImage: {
      width: "100%",
      height: "100%",
    },

    noImageText: {
      textAlign: "center",
      padding: 40,
      color: theme.gray,
      fontSize: 16,
    },

    correctionContainer: {
      alignItems: "center",
      marginBottom: 16,
    },

    correctionLabel: {
      fontSize: 16,
      color: theme.gray,
      marginBottom: 8,
    },

    countControls: {
      flexDirection: "row",
      gap: 16,
    },

    countButtonSmall: {
      backgroundColor: theme.primary + "33",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    removeButton: {
      backgroundColor: "#ff6b6b33",
    },

    countButtonTextSmall: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.text,
    },

    plusMinus: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },

    bottomBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 8,
      backgroundColor: theme.card,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },

    bottomItem: {
      alignItems: "center",
      flex: 1,
    },

    bottomLabel: {
      fontSize: 11,
      color: theme.gray,
      marginTop: 4,
      textAlign: "center",
    },

    saveButton: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 30,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },

    saveButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },

    successBanner: {
      backgroundColor: isDark
        ? "rgba(46,204,113,0.25)"
        : "rgba(46,204,113,0.12)",
      paddingVertical: 12,
      marginTop: 8,
      alignItems: "center",
      borderRadius: 8,
    },

    successText: {
      color: theme.accent,
      fontSize: 16,
      fontWeight: "600",
    },
  });
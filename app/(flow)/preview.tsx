// app/preview.tsx

import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function PreviewScreen() {
  const { imageUri, templateName = "Template" } = useLocalSearchParams<{
    imageUri: string;
    templateName?: string;
  }>();

  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);

  const goToProcessing = () => {
    router.push({
      pathname: "/processing",
      params: { imageUri, templateName },
    });
  };

  const goBack = () => router.back();
  const goToImageSelect = () => router.push("/image-select");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={goBack} hitSlop={16} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={theme.text} />
          </Pressable>

          <Text style={styles.title}>Prepare</Text>

          <View style={{ width: 40 }} />
        </View>

        {/* Photo */}
        <View style={styles.photoContainer}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.photo}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>No photo selected</Text>
            </View>
          )}
        </View>

        {/* Reselect */}
        <Pressable style={styles.reselectButton} onPress={goToImageSelect}>
          <Text style={styles.reselectText}>Re-select photo</Text>
        </Pressable>

        {/* Bottom bar */}
        <View style={styles.bottomBar}>
          <Pressable style={styles.bottomIconButton}>
            <Ionicons name="grid-outline" size={26} color={theme.gray} />
            <Text style={styles.bottomLabel}>Tools</Text>
          </Pressable>

          <Pressable style={styles.bottomIconButton}>
            <Ionicons
              name="document-text-outline"
              size={26}
              color={theme.gray}
            />
            <Text style={styles.bottomLabel}>Form</Text>
          </Pressable>

          {/* COUNT button */}
          <Pressable style={styles.countButton} onPress={goToProcessing}>
            <Text style={styles.countButtonText}>COUNT</Text>
          </Pressable>

          <Pressable style={styles.bottomIconButton}>
            <Ionicons
              name="ellipsis-horizontal"
              size={26}
              color={theme.gray}
            />
            <Text style={styles.bottomLabel}>More</Text>
          </Pressable>

          <View style={{ width: 60 }} />
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
      paddingHorizontal: 20,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8,
      marginBottom: 24,
    },

    backButton: {
      padding: 8,
    },

    title: {
      fontSize: 26,
      fontWeight: "700",
      color: theme.primary,
      letterSpacing: -0.2,
    },

    photoContainer: {
      flex: 1,
      justifyContent: "center",
      marginBottom: 20,
    },

    photo: {
      width: "100%",
      height: "100%",
      borderRadius: 20,
      backgroundColor: theme.card,
    },

    noImageContainer: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.card,
      borderRadius: 20,
    },

    noImageText: {
      fontSize: 18,
      color: theme.gray,
      fontWeight: "500",
    },

    reselectButton: {
      alignSelf: "flex-start",
      paddingVertical: 12,
      paddingHorizontal: 8,
      marginBottom: 32,
    },

    reselectText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "700",
    },

    bottomBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.card,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: isDark ? 0.4 : 0.08,
      shadowRadius: 6,
      elevation: 8,
    },

    bottomIconButton: {
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      paddingVertical: 8,
    },

    bottomLabel: {
      fontSize: 11,
      color: theme.gray,
      marginTop: 4,
      fontWeight: "500",
    },

    countButton: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 10,
      transform: [{ scale: 1.08 }],
    },

    countButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      letterSpacing: 0.4,
    },
  });
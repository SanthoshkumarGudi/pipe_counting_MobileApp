// app/processing.tsx

import { View, Text, Image, ActivityIndicator, Pressable, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { api } from "@/services/api";
import { useTheme } from "../context/ThemeContext";

export default function ProcessingScreen() {
  const params = useLocalSearchParams();

  const imageUri = params.imageUri as string;
  const templateName = (params.templateName as string) || "Template";

  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);

  useEffect(() => {
    const countPipes = async () => {
      try {
        const formData = new FormData();

        formData.append("image", {
          uri: imageUri,
          name: "photo.jpg",
          type: "image/jpeg",
        } as any);

        formData.append("templateName", templateName);

        const response = await api.post("/count", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const realCount = Number(response.data.count) || 0;

        router.push({
          pathname: "/(flow)/review",
          params: {
            imageUri,
            templateName,
            count: realCount.toString(),
          },
        });
      } catch (err: any) {
        console.error("Counting error:", err);

        let message = "Unable to process the image right now.";

        if (err.response) {
          message = err.response.data?.error || "Server error";
        } else if (err.request) {
          message = "No response from server. Check your connection.";
        }

        Alert.alert("Counting Failed", message, [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    };

    const minimumDelayTimer = setTimeout(() => {
      countPipes();
    }, 2000);

    return () => clearTimeout(minimumDelayTimer);
  }, [imageUri, templateName]);

  return (
    <View style={styles.container}>
      {/* Back button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={theme.text} />
      </Pressable>

      <Text style={styles.title}>Processing...</Text>

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.photo}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.noImagePlaceholder}>
          <Text style={styles.noImageText}>No photo available</Text>
        </View>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Current Counting Template</Text>
        <Text style={styles.templateName}>{templateName}</Text>

        <Text style={styles.infoText}>
          Speed & Accuracy depend on the template used.{"\n"}
          Contact us if the results are not accurate.
        </Text>
      </View>

      <ActivityIndicator
        size="large"
        color={theme.primary}
        style={styles.spinner}
      />
    </View>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      padding: 20,
    },

    backButton: {
      position: "absolute",
      top: 50,
      left: 20,
      zIndex: 10,
    },

    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.primary,
      marginTop: 80,
      marginBottom: 30,
    },

    photo: {
      width: "90%",
      height: "45%",
      borderRadius: 16,
      marginBottom: 30,
      backgroundColor: theme.card,
    },

    noImagePlaceholder: {
      width: "90%",
      height: "45%",
      borderRadius: 16,
      backgroundColor: theme.card,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },

    noImageText: {
      fontSize: 16,
      color: theme.gray,
    },

    infoBox: {
      backgroundColor: isDark
        ? "rgba(30,144,255,0.18)"
        : "rgba(0,191,255,0.08)",
      padding: 16,
      borderRadius: 12,
      width: "90%",
      marginBottom: 40,
      alignItems: "center",
    },

    infoTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 8,
    },

    templateName: {
      color: theme.primary,
      fontWeight: "600",
      marginBottom: 6,
    },

    infoText: {
      fontSize: 14,
      color: theme.gray,
      textAlign: "center",
      lineHeight: 20,
    },

    spinner: {
      marginTop: 20,
    },
  });
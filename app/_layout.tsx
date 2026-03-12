import { Stack } from "expo-router";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
      </Stack>
    </ThemeProvider>
  );
}
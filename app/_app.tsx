// app/_app.tsx
import { ThemeProvider } from './context/ThemeContext'; 
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AppRoot() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        {/* Add all your other root-level routes here if needed */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
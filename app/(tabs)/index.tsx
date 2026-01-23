// app/index.tsx  → Opening / Auth Entry Screen (only shown when NOT logged in)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Your logo (update path if needed)
const logo = require('../../assets/images/prixgen.png');

export default function OpeningScreen() {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          // User is already logged in → skip straight to main app (tabs)
          router.replace('/(tabs)/template'); // or '/(tabs)/home' if that's your main tab
        }
      } catch (err) {
        console.log('Auth check error:', err);
      } finally {
        setIsChecking(false); // done checking → show buttons only if needed
      }
    };

    checkAuth();
  }, []);

  // While checking token → show loading (prevents flash of buttons)
  if (isChecking) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  // Only reach here if NO token → show unauthenticated screen (Figure 1)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <LinearGradient
        colors={['#4a90e2', '#50c9c3', '#f6a623']} // matches your current + PDF vibe
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo */}
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          {/* App Name */}
          <Text style={styles.appName}>LECCA</Text>

          {/* Buttons – only shown when not logged in */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace('/(tabs)/template')}
          >
            <Text style={styles.buttonText}>CONTINUE AS GUEST</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

// Keep your existing styles (they already look good for the PDF)
const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: { width: 180, height: 180, marginBottom: 20 },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 4,
    marginBottom: 80,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  button: {
    width: '80%',
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
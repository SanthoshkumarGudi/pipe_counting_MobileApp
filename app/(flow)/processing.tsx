// app/processing.tsx
import { View, Text, Image, ActivityIndicator, Pressable, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { api } from '@/services/api';  // ← same api instance as login.tsx

export default function ProcessingScreen() {
  const params = useLocalSearchParams();

  const imageUri = params.imageUri as string;
  const templateName = params.templateName as string || 'Template';

  useEffect(() => {
    const countPipes = async () => {
      try {
        // Prepare multipart form data (image + templateName)
        const formData = new FormData();
        formData.append('image', {
          uri: imageUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as any);

        formData.append('templateName', templateName);

        // Use your api instance (same as login)
        const response = await api.post('/count', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        

        // Get the real count from backend response
        const realCount = Number(response.data.count) || 0;
console.log('Navigating to review with count:', realCount);
        // Navigate to review with real data
        router.push({
          pathname: '/review',
          params: {
            imageUri,
            templateName,
            count: realCount.toString(),
          },
        });
      } catch (err: any) {
        console.error('Counting error:', err);

        let message = 'Unable to process the image right now.';
        if (err.response) {
          message = err.response.data?.error || 'Server error';
        } else if (err.request) {
          message = 'No response from server. Check your connection.';
        }

        Alert.alert('Counting Failed', message, [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    };

    // Minimum 2-second delay so user sees "Processing..." UI
    const minimumDelayTimer = setTimeout(() => {
      countPipes();
    }, 2000);

    // Cleanup timer on unmount
    return () => clearTimeout(minimumDelayTimer);
  }, [imageUri, templateName]);

  return (
    <View style={styles.container}>
      {/* Back button – allows user to cancel processing */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </Pressable>

      <Text style={styles.title}>Processing...</Text>

      {/* Show the photo being processed */}
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

      {/* Helpful message from your design doc */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Current Counting Template</Text>
        <Text>{templateName}</Text>
        <Text></Text>
        <Text style={styles.infoText}>
          Speed & Accuracy depend on the template used.{'\n'}
          Contact us if the results are not accurate.
        </Text>
      </View>

      {/* Loading indicator */}
      <ActivityIndicator size="large" color="#00BFFF" style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginTop: 80,
    marginBottom: 30,
  },
  photo: {
    width: '90%',
    height: '45%',
    borderRadius: 16,
    marginBottom: 30,
    backgroundColor: '#f8f8f8',
  },
  noImagePlaceholder: {
    width: '90%',
    height: '45%',
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
  },
  infoBox: {
    backgroundColor: 'rgba(0, 191, 255, 0.08)',
    padding: 16,
    borderRadius: 12,
    width: '90%',
    marginBottom: 40,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  spinner: {
    marginTop: 20,
  },
});
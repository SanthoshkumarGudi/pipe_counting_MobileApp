// app/image-select.tsx
import { View, Text, Pressable, Alert, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ImageSelect() {
  const params = useLocalSearchParams();
  const templateName = params.templateName as string || 'Template';

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
          Alert.alert('Permissions needed', 'Please allow camera and gallery access in settings.');
        }
      }
    })();
  }, []);

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      mediaTypes: ['images'],          // ← fixed: array instead of deprecated enum
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      router.push({
        pathname: '/(flow)/preview',
        params: { imageUri: result.assets[0].uri, templateName },
      });
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      router.push({
        pathname: '/preview',
        params: { imageUri: result.assets[0].uri, templateName },
      });
    }
  };

  const useSample = () => {
    // Replace with your bundled asset or remote URL
    const sampleUri = 'https://example.com/sample-pipe-image.jpg'; // or require('../../assets/sample.jpg')
    router.push({
      pathname: '/preview',
      params: { imageUri: sampleUri, templateName },
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </Pressable>

      <Text style={styles.title}>{templateName}</Text>

      <Pressable style={styles.btn} onPress={pickFromGallery}>
        <Text style={styles.btnText}>USE EXISTING PHOTO</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={takePhoto}>
        <Text style={styles.btnText}>TAKE NEW PHOTO</Text>
      </Pressable>

      <Pressable style={[styles.btn, styles.sampleBtn]} onPress={useSample}>
        <Text style={styles.btnText}>COUNT FROM SAMPLE PHOTO</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  back: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  title: { fontSize: 26, fontWeight: '700', color: '#00BFFF', marginBottom: 60, textAlign: 'center' },
  btn: {
    backgroundColor: '#00BFFF',
    paddingVertical: 18,
    borderRadius: 30,
    marginVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sampleBtn: { backgroundColor: '#4CAF50' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
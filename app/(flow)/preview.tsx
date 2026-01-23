// app/preview.tsx
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PreviewScreen() {
  const params = useLocalSearchParams();

  // We get these two things from previous screen
  const imageUri = params.imageUri as string;
  const templateName = params.templateName as string || 'Template';

  const goToProcessing = () => {
    router.push({
      pathname: '/processing',
      params: { imageUri, templateName },
    });
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>Prepare</Text>

      {/* Big photo */}
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.photo}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.noImageText}>No photo selected</Text>
      )}

      {/* COUNT button */}
      <Pressable style={styles.countButton} onPress={goToProcessing}>
        <Text style={styles.countButtonText}>COUNT</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  photo: {
    width: '100%',
    height: '60%',           // ← you can change this value
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 40,
  },
  noImageText: {
    height: '60%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#999',
    marginBottom: 40,
  },
  countButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  countButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
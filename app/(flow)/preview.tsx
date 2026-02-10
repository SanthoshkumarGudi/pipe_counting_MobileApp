// app/preview.tsx
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function PreviewScreen() {
  const { imageUri, templateName = 'Template' } = useLocalSearchParams<{
    imageUri: string;
    templateName?: string;
  }>();

  const goToProcessing = () => {
    router.push({
      pathname: '/processing',
      params: { imageUri, templateName },
    });
  };

  const goBack = () => router.back();
  const goToImageSelect = () => router.push('/image-select');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header / Back + Title */}
        <View style={styles.header}>
          <Pressable onPress={goBack} hitSlop={16} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#222" />
          </Pressable>

          <Text style={styles.title}>Prepare</Text>

          {/* invisible spacer for centering */}
          <View style={{ width: 40 }} />
        </View>

        {/* Main content - photo */}
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

        {/* Re-select photo */}
        <Pressable style={styles.reselectButton} onPress={goToImageSelect}>
          <Text style={styles.reselectText}>Re-select photo</Text>
        </Pressable>

        {/* Bottom action area */}
       {/* // ... rest of your component above remains similar ... */}

<View style={styles.bottomBar}>
  <Pressable style={styles.bottomIconButton} onPress={() => { /* open tools */ }}>
    <Ionicons name="grid-outline" size={26} color="#555" />
    <Text style={styles.bottomLabel}>Tools</Text>
  </Pressable>

  <Pressable style={styles.bottomIconButton} onPress={() => { /* open form */ }}>
    <Ionicons name="document-text-outline" size={26} color="#555" />
    <Text style={styles.bottomLabel}>Form</Text>
  </Pressable>

  {/* Big COUNT button in center */}
  <Pressable style={styles.countButton} onPress={goToProcessing}>
    <Text style={styles.countButtonText}>COUNT</Text>
  </Pressable>

  <Pressable style={styles.bottomIconButton} onPress={() => { /* more options */ }}>
    <Ionicons name="ellipsis-horizontal" size={26} color="#555" />
    <Text style={styles.bottomLabel}>More</Text>
  </Pressable>

  {/* Optional: if you want to keep a "hidden" fifth spot for balance */}
  <View style={{ width: 60 }} /> 
</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#00BFFF',
    letterSpacing: -0.2,
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  noImageContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#94a3b8',
    fontWeight: '500',
  },
  reselectButton: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  reselectText: {
     color: 'black',
    fontSize: 16,
    fontWeight: '700',
  
  },
  bottomActions: {
    paddingBottom: 24,
    gap: 16,
    alignItems:'center'
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  secondaryButtonText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    // Optional: subtle shadow upward
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },

  bottomIconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,           // fixed width helps even spacing
    paddingVertical: 8,
  },

  bottomLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },

  countButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    // makes it stand out more
    transform: [{ scale: 1.08 }], // slight grow effect (optional)
  },

  countButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  
  },
});
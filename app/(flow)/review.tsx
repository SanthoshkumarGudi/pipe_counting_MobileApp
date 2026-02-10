// app/review.tsx
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ReviewScreen() {

  const { imageUri, count } = useLocalSearchParams<{
    imageUri: string;
    count:string;
  }>();
  // const count = 120;

  const handleAdd = () => {
//TODO ADD Logic
    console.log('Add count');
  };

  const handleRemove = () => {
  //TODO Remove Logic
    console.log('Remove count');
  };

  const goBack = () => router.back();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={goBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#333" />
          </Pressable>
          <Text style={styles.title}>Review</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.resultText}>Result : {count}</Text>
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
        <View style={styles.correctionContainer}>
          <Text style={styles.correctionLabel}>Correction</Text>
          <View style={styles.countControls}>
            <Pressable style={styles.countButtonSmall} onPress={handleAdd}>
              <Text style={styles.countButtonTextSmall}>ADD COUNT</Text>
              <Text style={styles.plusMinus}>+</Text>
            </Pressable>
            <Pressable style={[styles.countButtonSmall, styles.removeButton]} onPress={handleRemove}>
              <Text style={styles.countButtonTextSmall}>REMOVE COUNT</Text>
              <Text style={styles.plusMinus}>-</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottomBar}>
          <Pressable style={styles.bottomItem}>
            <Ionicons name="sparkles-outline" size={24} color="#555" />
            <Text style={styles.bottomLabel}>Correction</Text>
          </Pressable>
          <Pressable style={styles.bottomItem}>
            <Ionicons name="grid-outline" size={24} color="#555" />
            <Text style={styles.bottomLabel}>Tool</Text>
          </Pressable>
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </Pressable>
          <Pressable style={styles.bottomItem}>
            <Ionicons name="document-text-outline" size={24} color="#555" />
            <Text style={styles.bottomLabel}>Form</Text>
          </Pressable>
          <Pressable 
          style={styles.bottomItem}
          onPress={()=>router.push('/')}
          >
            <Ionicons name="camera-outline" size={24} color="#555" />
            <Text style={styles.bottomLabel}>New Photo</Text>
          </Pressable>
        </View>
        <View style={styles.successBanner}>
          <Text style={styles.successText}>Process Success</Text>
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00BFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  noImageText: {
    textAlign: 'center',
    padding: 40,
    color: '#999',
    fontSize: 16,
  },
  correctionContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  correctionLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  countControls: {
    flexDirection: 'row',
    gap: 16,
  },
  countButtonSmall: {
    backgroundColor: '#ADD8E6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  removeButton: {
    backgroundColor: '#FFB6C1',
  },
  countButtonTextSmall: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  plusMinus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bottomItem: {
    alignItems: 'center',
    flex: 1,
  },
  bottomLabel: {
    fontSize: 11,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successBanner: {
    backgroundColor: '#E0F7FA',
    paddingVertical: 12,
    marginTop: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  successText: {
    color: '#00838F',
    fontSize: 16,
    fontWeight: '600',
  },
});
// app/image-select.tsx
import { View, Text, Pressable, Alert, StyleSheet, Platform, Image } from 'react-native';
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
      quality: 0.9,
    });

    // result returns an object
    // ex:
    // {
    //   canceled: false,
    //   assets: [
    //     {
    //       uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/...",
    //       width: 3024,
    //       height: 4032,
    //       type: "image",
    //       fileName: "IMG_1234.jpg"
    //     }

    //   ]
    // }


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
      quality: 0.9,
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

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Template Home</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Template Card */}
      <View style={styles.templateCard}>
        <Image
          source={{ uri: 'https://placekitten.com/400/400' }}
          style={styles.templateImage}
        />
        <Text style={styles.templateName}>{templateName}</Text>

        <Pressable
          style={styles.changeBtn}
          onPress={() => router.push('/(tabs)/template')}
        >
          <Text style={styles.changeBtnText}>CHANGE COUNTING TEMPLATE</Text>
        </Pressable>
      </View>

      {/* Action Cards */}
      <View style={styles.row}>
        <Pressable style={styles.actionCard} onPress={pickFromGallery}>
          <Ionicons name="images-outline" size={40} color="#3aa8e3" />
          <Text style={styles.actionText}>USE EXISTING PHOTO</Text>
        </Pressable>

        <Pressable style={styles.actionCard} onPress={takePhoto}>
          <Ionicons name="camera-outline" size={40} color="#3aa8e3" />
          <Text style={styles.actionText}>TAKE NEW PHOTO</Text>
        </Pressable>
      </View>

      {/* Sample */}
      <Pressable style={styles.sampleCard} onPress={useSample}>
        <Text style={styles.sampleText}>COUNT FROM SAMPLE PHOTO</Text>
        <Image
          source={{ uri: 'https://placekitten.com/300/300' }}
          style={styles.sampleImage}
        />
      </Pressable>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  /* Template Card */
  templateCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  templateImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  templateName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center'
  },
  changeBtn: {
    backgroundColor: '#2ea8df',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  changeBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  /* Action cards */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  actionText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#3aa8e3',
    textAlign: 'center',
  },

  /* Sample */
  sampleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0bb27a',
    borderRadius: 16,
    padding: 16,
  },
  sampleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    width: '60%',
  },
  sampleImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
});

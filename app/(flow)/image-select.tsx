// app/image-select.tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ImageSelect() {
  const params = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>
        Selected Template: {params.templateName || 'Unknown'}
      </Text>
    </View>
  );
}
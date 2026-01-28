// app/review.tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ReviewScreen() {
  const params = useLocalSearchParams();
  const count = params.count || 'unknown';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 32 }}>Review Screen</Text>
      <Text style={{ fontSize: 24, marginTop: 20 }}>
        Detected count: {count}
      </Text>
    </View>
  );
}
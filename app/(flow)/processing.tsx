import { View, Text } from 'react-native';

export default function ProcessingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Processing...</Text>
      <Text>Counting items</Text>
    </View>
  );
}